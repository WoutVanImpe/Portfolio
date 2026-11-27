import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type CSSProperties,
	type FC,
	type MouseEvent as ReactMouseEvent,
} from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import {
	NodeChangeset,
	ReactFlow,
	ViewportPortal,
	getNodesBounds,
	getViewportForBounds,
	useEdgesState,
	useNodesState,
	type Connection,
	type CoordinateExtent,
	type OnBeforeDelete,
	type OnNodesChange,
	type ReactFlowInstance,
	type Viewport,
} from "@xyflow/react";
import { useTheme } from "@context/Theme";
import { LoadingScreen } from "@shared/LoadingScreen";
import { normalizeLanguage } from "@/i18n/localize";
import { getProject, projectMatchesCategory } from "@shared/data/projects";
import {
	getActiveCategoryFilter,
	getControlStates,
	getDisplayStates,
	handleConnect,
	createNodes,
	edgeTypes,
	fillFrameBlanks,
	getCableColorVar,
	getRackLayout,
	initialEdges,
	initialNodes,
	MIN_LOADER_VISIBLE_MS,
	naturalWidth,
	packNodes,
	isValidConnection as isValidGraphConnection,
	nodeTypes,
	withActiveLanguageEdge,
	withActiveThemeEdge,
	type BlankPanelRect,
	type DisplayView,
	type FrameRect,
	type ModifierValue,
	type PortfolioEdge,
	type PortfolioNode,
	type RackLayout,
} from "@shared/nodes";
import styles from "./home.page.module.scss";
import type { HomePageProps } from "./home.page.props";

const CASE_CHEEK_SIZE = 34;
const CASE_RAIL_SIZE = 22;
const frameStyle = {
	"--case-cheek-size": `${CASE_CHEEK_SIZE}px`,
	"--case-rail-size": `${CASE_RAIL_SIZE}px`,
} as CSSProperties;

export const HomePage: FC<HomePageProps> = () => {
	const { theme, setTheme } = useTheme();
	const { i18n } = useTranslation();
	const language = normalizeLanguage(i18n.resolvedLanguage);
	const [layout, setLayout] = useState<RackLayout>(() => getRackLayout(window.innerWidth, window.innerHeight));
	const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
	const [viewportHeight, setViewportHeight] = useState(() => window.innerHeight);
	const [layoutTick, setLayoutTick] = useState(0);
	const [fitReady, setFitReady] = useState(false);
	const [isReorganizing, setIsReorganizing] = useState(true);
	const [measurementTick, setMeasurementTick] = useState(0);
	const measureRef = useRef<HTMLDivElement>(null);
	const flowWrapRef = useRef<HTMLDivElement>(null);
	const packedRef = useRef("");
	const naturalWidthsRef = useRef(new Map<string, number>());
	const capturedLanguageRef = useRef("");
	const awaitNaturalRef = useRef(true);
	const [flowInstance, setFlowInstance] = useState<ReactFlowInstance<PortfolioNode, PortfolioEdge> | null>(null);
	const [fitViewport, setFitViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 1 });
	const [zoomFloor, setZoomFloor] = useState(0.35);
	const [isZoomedIn, setIsZoomedIn] = useState(false);
	const [nodes, setNodes, onNodesChange] = useNodesState<PortfolioNode>(createNodes(layout));
	const nodesRef = useRef(nodes);
	nodesRef.current = nodes;
	const innerSizeRef = useRef({ width: viewportWidth, height: viewportHeight });
	innerSizeRef.current = { width: viewportWidth, height: viewportHeight };
	const [edges, setEdges, onEdgesChange] = useEdgesState<PortfolioEdge>(withActiveLanguageEdge(withActiveThemeEdge(initialEdges, initialNodes, theme), initialNodes, language));
	const [mediaIndexes, setMediaIndexes] = useState<Record<string, number>>({});
	const [displayViews, setDisplayViews] = useState<Record<string, DisplayView>>({});
	const [widthOverrides, setWidthOverrides] = useState<Record<string, number>>({});
	const [blankPanels, setBlankPanels] = useState<BlankPanelRect[]>([]);

	const isRackBusy = isReorganizing || !fitReady;
	const [loaderVisible, setLoaderVisible] = useState(true);
	const loaderStartedAtRef = useRef<number | null>(null);
	const hideLoaderTimerRef = useRef<number | null>(null);

	useEffect(() => {
		if (isRackBusy) {
			if (hideLoaderTimerRef.current !== null) {
				window.clearTimeout(hideLoaderTimerRef.current);
				hideLoaderTimerRef.current = null;
			}

			if (loaderStartedAtRef.current === null) loaderStartedAtRef.current = performance.now();
			setLoaderVisible(true);
			return;
		}

		if (loaderStartedAtRef.current === null) return;

		const remaining = Math.max(0, MIN_LOADER_VISIBLE_MS - (performance.now() - loaderStartedAtRef.current));
		const timer = window.setTimeout(() => {
			setLoaderVisible(false);
			loaderStartedAtRef.current = null;
			hideLoaderTimerRef.current = null;
		}, remaining);
		hideLoaderTimerRef.current = timer;

		return () => {
			if (hideLoaderTimerRef.current === timer) {
				window.clearTimeout(timer);
				hideLoaderTimerRef.current = null;
			}
		};
	}, [isRackBusy]);

	const handleNodesChange = useCallback<OnNodesChange<PortfolioNode>>(
		(changes) => {
			const filtered = new NodeChangeset<PortfolioNode>();
			for (const change of changes) {
				if (change.type !== "select") filtered.add(change);
			}
			onNodesChange(filtered);
		},
		[onNodesChange],
	);

	useEffect(() => {
		const element = measureRef.current;
		if (!element) return;

		const observer = new ResizeObserver(([entry]) => {
			const width = Math.round(entry.contentRect.width);
			const height = Math.round(entry.contentRect.height);
			setIsReorganizing(true);
			const next = getRackLayout(width, height);
			setLayout((current) => (current === next ? current : next));
			setViewportWidth((current) => (current === width ? current : width));
			setViewportHeight((current) => (current === height ? current : height));
		});

		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	const computedOverrides = useMemo(() => new Map(Object.entries(widthOverrides)), [widthOverrides]);

	useEffect(() => {
		if (capturedLanguageRef.current === language) return;

		capturedLanguageRef.current = language;
		naturalWidthsRef.current.clear();
		awaitNaturalRef.current = true;
		setWidthOverrides({});
		setMeasurementTick((tick) => tick + 1);
	}, [language]);

	useEffect(() => {
		if (!awaitNaturalRef.current) return;
		if (!nodes.length || nodes.some((node) => !node.measured?.width || !node.measured?.height)) return;

		let innerFrame = 0;
		const outerFrame = requestAnimationFrame(() => {
			innerFrame = requestAnimationFrame(() => {
				naturalWidthsRef.current = new Map(nodes.map((node) => [node.id, node.measured!.width!]));
				awaitNaturalRef.current = false;
				setMeasurementTick((tick) => tick + 1);
			});
		});

		return () => {
			cancelAnimationFrame(outerFrame);
			cancelAnimationFrame(innerFrame);
		};
	}, [nodes, measurementTick]);

	const naturalSignature = [...naturalWidthsRef.current.entries()].map(([id, width]) => `${id}:${width}`).sort().join("|");
	const overrideSignature = [...computedOverrides.entries()].map(([id, width]) => `${id}:${width}`).sort().join("|");
	const sizeSignature = `${layout}|${language}|${viewportWidth}|${viewportHeight}|${naturalSignature}|${overrideSignature}`;

	useEffect(() => {
		if (awaitNaturalRef.current) return;
		if (!nodes.length || nodes.some((node) => !node.measured?.width || !node.measured?.height)) return;
		if (packedRef.current === sizeSignature) return;
		packedRef.current = sizeSignature;

		const { positions, widths } = packNodes(nodes, layout, naturalWidthsRef.current, viewportWidth, viewportHeight);
		setWidthOverrides(Object.fromEntries(widths));
		setNodes((current) => {
			let changed = false;
			const next = current.map((node) => {
				const position = positions.get(node.id);
				if (!position) return node;
				if (node.position.x === position.x && node.position.y === position.y) return node;

				changed = true;
				return { ...node, position };
			});

			return changed ? next : current;
		});
		setLayoutTick((tick) => tick + 1);
	}, [layout, nodes, setNodes, sizeSignature, viewportHeight, viewportWidth]);

	useEffect(() => {
		if (!flowInstance) return;

		setFitReady(false);
		setIsReorganizing(true);
		setZoomFloor(0.35);
		setIsZoomedIn(false);
		setBlankPanels([]);
		const frame = requestAnimationFrame(() => {
			const bounds = getNodesBounds(nodesRef.current);
			if (!bounds.width || !bounds.height) return;

			const { width, height } = innerSizeRef.current;
			const baseViewport = getViewportForBounds(bounds, width, height, 0.35, 2.5, 0);
			const viewport: Viewport = {
				x: baseViewport.x + CASE_CHEEK_SIZE,
				y: baseViewport.y + CASE_RAIL_SIZE,
				zoom: baseViewport.zoom,
			};

			void flowInstance.setViewport(viewport).then(() => {
				setFitViewport(viewport);
				setZoomFloor(viewport.zoom);
				setFitReady(true);
			});
		});
		return () => cancelAnimationFrame(frame);
	}, [flowInstance, layoutTick]);

	// Fit is calculated for the inner case opening; blanks and pan bounds must cover the full visible canvas.
	const frameRect = useMemo<FrameRect | null>(() => {
		if (!fitReady || !viewportWidth || !viewportHeight) return null;

		const zoom = Math.max(0.01, fitViewport.zoom);
		return {
			x: -fitViewport.x / zoom,
			y: -fitViewport.y / zoom,
			width: window.innerWidth / zoom,
			height: window.innerHeight / zoom,
		};
	}, [fitReady, fitViewport, viewportHeight, viewportWidth]);

	const translateExtent = useMemo<CoordinateExtent | undefined>(() => {
		if (!frameRect) return undefined;

		return [
			[frameRect.x, frameRect.y],
			[frameRect.x + frameRect.width, frameRect.y + frameRect.height],
		];
	}, [frameRect]);

	useEffect(() => {
		if (!frameRect || layoutTick === 0 || !nodes.length) return;

		const frame = requestAnimationFrame(() => {
			const positions = new Map(nodes.map((node) => [node.id, node.position]));
			const widths = new Map(
				nodes.map((node) => [node.id, computedOverrides.get(node.id) ?? node.measured?.width ?? naturalWidth(node)]),
			);

			setBlankPanels(fillFrameBlanks(nodes, positions, widths, frameRect));
			setIsReorganizing(false);
		});

		return () => cancelAnimationFrame(frame);
	}, [computedOverrides, frameRect, layoutTick, nodes]);

	const activeCategory = useMemo(() => getActiveCategoryFilter(nodes, edges), [nodes, edges]);
	const filteredOutNodeIds = useMemo(
		() =>
			new Set(
				nodes
					.filter((node) => {
						if (node.data.kind !== "project" || !activeCategory) return false;
						const project = getProject(node.data.projectId);
						return project ? !projectMatchesCategory(project, activeCategory) : false;
					})
					.map((node) => node.id),
			),
		[nodes, activeCategory],
	);
	const visibleEdges = useMemo(() => edges.filter((edge) => !filteredOutNodeIds.has(edge.source) && !filteredOutNodeIds.has(edge.target)), [edges, filteredOutNodeIds]);

	const connectedHandleList = useMemo(() => Array.from(new Set(visibleEdges.flatMap((edge) => [edge.sourceHandle, edge.targetHandle].filter((value): value is string => Boolean(value))))), [visibleEdges]);
	const handleColorMap = useMemo(() => {
		const colors: Record<string, string> = {};

		for (const edge of visibleEdges) {
			const color = edge.data?.color
				? getCableColorVar(edge.data.color)
				: edge.data?.kind === "theme" && edge.data?.active
					? "var(--accent)"
					: "var(--cable-color)";

			for (const handle of [edge.sourceHandle, edge.targetHandle]) {
				if (handle) colors[handle] = color;
			}
		}

		return colors;
	}, [visibleEdges]);
	const connectedNodeIds = useMemo(() => new Set(visibleEdges.flatMap((edge) => [edge.source, edge.target])), [visibleEdges]);

	const displayStates = useMemo(() => getDisplayStates(nodes, edges), [nodes, edges]);
	const controlStates = useMemo(() => getControlStates(nodes, edges), [nodes, edges]);
	const displayProjectSignature = useMemo(
		() =>
			Object.entries(displayStates)
				.map(([displayId, state]) => `${displayId}:${state?.project?.id ?? "none"}`)
				.sort()
				.join("|"),
		[displayStates],
	);

	useEffect(() => {
		setMediaIndexes((current) => {
			const next: Record<string, number> = {};
			let changed = false;

			for (const [displayId, index] of Object.entries(current)) {
				next[displayId] = 0;
				if (index !== 0) changed = true;
			}

			return changed ? next : current;
		});
	}, [displayProjectSignature]);

	const stepMedia = useCallback(
		(displayId: string | undefined, delta: number) => {
			const count = displayId ? (displayStates[displayId]?.project?.media.length ?? 0) : 0;
			if (!displayId || count === 0) return;

			setMediaIndexes((current) => {
				const index = current[displayId] ?? 0;
				const next = (((index + delta) % count) + count) % count;

				return { ...current, [displayId]: next };
			});
		},
		[displayStates],
	);

	const setDisplayView = useCallback((displayId: string, view: DisplayView) => {
		setDisplayViews((current) => ({ ...current, [displayId]: view }));
	}, []);

	const toggleModifier = useCallback(
		(nodeId: string, value: ModifierValue) => {
			setNodes((current) =>
				current.map((node) => {
					if (node.id !== nodeId || node.data.kind !== "modifier") return node;

					const active = node.data.activeModifiers ?? [];
					const next = active.includes(value) ? active.filter((item) => item !== value) : [...active, value];

					return { ...node, data: { ...node.data, activeModifiers: next } };
				}),
			);
		},
		[setNodes],
	);

	const renderNodes = useMemo(
		() =>
			nodes.map((node) => {
				const width = widthOverrides[node.id] ?? naturalWidth(node);
				const styledNode = { ...node, style: { ...node.style, width, minWidth: width } };
				const connectedData = {
					...styledNode.data,
					connectedHandles: connectedHandleList,
					handleColors: handleColorMap,
					isConnected: connectedNodeIds.has(node.id),
					isFilteredOut: filteredOutNodeIds.has(node.id),
				};

				if (node.data.kind === "display") {
					const displayId = node.data.displayId;
					const state = displayStates[displayId];
					const mediaCount = state?.project?.media.length ?? 0;
					const mediaIndex = mediaCount > 0 ? Math.min(mediaIndexes[displayId] ?? 0, mediaCount - 1) : 0;

					return {
						...styledNode,
						data: {
							...connectedData,
							project: state?.project,
							status: state?.status,
							filter: state?.filter,
							mediaIndex,
							view: displayViews[displayId] ?? "media",
							onViewChange: (view: DisplayView) => setDisplayView(displayId, view),
						},
					};
				}

				if (node.data.kind === "control") {
					const state = controlStates[node.id];
					const displayId = state?.displayId;
					const project = state?.project;
					const mediaCount = project?.media.length ?? 0;
					const mediaIndex = displayId && mediaCount > 0 ? Math.min(mediaIndexes[displayId] ?? 0, mediaCount - 1) : 0;

					return {
						...styledNode,
						data: {
							...connectedData,
							project,
							mediaIndex,
							onPrevious: () => stepMedia(displayId, -1),
							onNext: () => stepMedia(displayId, 1),
						},
					};
				}

				if (node.data.kind === "modifier") {
					return {
						...styledNode,
						data: {
							...connectedData,
							onToggleModifier: (value: ModifierValue) => toggleModifier(node.id, value),
						},
					};
				}

				return { ...styledNode, data: connectedData };
			}),
		[nodes, widthOverrides, displayStates, controlStates, mediaIndexes, displayViews, stepMedia, setDisplayView, toggleModifier, connectedHandleList, handleColorMap, connectedNodeIds, filteredOutNodeIds],
	);

	const renderEdges = useMemo(
		() =>
			edges.map((edge) => ({
				...edge,
				hidden: edge.hidden || filteredOutNodeIds.has(edge.source) || filteredOutNodeIds.has(edge.target),
				type: "curved",
			})),
		[edges, filteredOutNodeIds],
	);

	const handleInit = useCallback((instance: ReactFlowInstance<PortfolioNode, PortfolioEdge>) => {
		setFlowInstance(instance);
		setFitViewport(instance.getViewport());
	}, []);

	const onConnect = useCallback(
		(connection: Connection) =>
			handleConnect(
				{
					nodes,
					setEdges,
					applyTheme: setTheme,
					applyLanguage: (value) => void i18n.changeLanguage(value),
				},
				connection,
			),
		[nodes, setEdges, setTheme, i18n],
	);

	const isValidConnectionCallback = useCallback(
		(connection: Connection | PortfolioEdge) =>
			!filteredOutNodeIds.has(connection.source) && !filteredOutNodeIds.has(connection.target) && isValidGraphConnection(connection, nodes, edges),
		[filteredOutNodeIds, nodes, edges],
	);

	const onEdgeDoubleClick = useCallback(
		(_event: ReactMouseEvent, edge: PortfolioEdge) => {
			if (edge.data?.kind === "theme" || edge.data?.kind === "language") return;

			setEdges((current) => current.filter((item) => item.id !== edge.id));
		},
		[setEdges],
	);

	const onBeforeDelete = useCallback<OnBeforeDelete<PortfolioNode, PortfolioEdge>>(
		async ({ nodes: deletedNodes, edges: deletedEdges }) => ({
			nodes: deletedNodes,
			edges: deletedEdges.filter((edge) => edge.data?.kind !== "theme" && edge.data?.kind !== "language"),
		}),
		[],
	);

	return (
		<main className={clsx(styles["home-page"], isZoomedIn && styles["home-page--zoomed"])} style={frameStyle}>
			<div className={styles["home-page__measure"]} ref={measureRef} aria-hidden="true" />

			<div className={styles["home-page__canvas"]} ref={flowWrapRef}>
				<ReactFlow
					className={styles["home-page__flow"]}
					nodes={renderNodes}
					edges={renderEdges}
					onNodesChange={handleNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onEdgeDoubleClick={onEdgeDoubleClick}
					onBeforeDelete={onBeforeDelete}
					onInit={handleInit}
					onMoveStart={() => flowWrapRef.current?.classList.add(styles["home-page__canvas--moving"])}
					onMoveEnd={(_event, viewport) => {
						flowWrapRef.current?.classList.remove(styles["home-page__canvas--moving"]);
						if (!fitReady) return;

						const zoomed = viewport.zoom > fitViewport.zoom + 0.001;
						setIsZoomedIn(zoomed);

						if (
							!zoomed &&
							flowInstance &&
							(Math.abs(viewport.x - fitViewport.x) > 0.5 || Math.abs(viewport.y - fitViewport.y) > 0.5)
						) {
							void flowInstance.setViewport(fitViewport);
						}
					}}
					isValidConnection={isValidConnectionCallback}
					nodeTypes={nodeTypes}
					edgeTypes={edgeTypes}
					nodesDraggable={false}
					nodesConnectable
					deleteKeyCode={null}
					panOnDrag={isZoomedIn}
					autoPanOnConnect={false}
					autoPanOnNodeDrag={false}
					panOnScroll={false}
					zoomOnScroll
					zoomOnPinch
					zoomOnDoubleClick={false}
					preventScrolling
					defaultViewport={{ x: CASE_CHEEK_SIZE, y: CASE_RAIL_SIZE, zoom: 1 }}
					minZoom={zoomFloor}
					maxZoom={3}
					translateExtent={translateExtent}
				>
					<ViewportPortal>
						<div
							className={styles["rack-backdrop"]}
							style={{
								left: frameRect?.x ?? -4000,
								top: frameRect?.y ?? -4000,
								width: frameRect?.width ?? 8000,
								height: frameRect?.height ?? 8000,
							}}
							aria-hidden="true"
						/>
						{blankPanels.map((panel) => (
							<div
								key={panel.id}
								className={styles["blank-panel"]}
								style={{ left: panel.x, top: panel.y, width: panel.width, height: panel.height }}
								aria-hidden="true"
							/>
						))}
					</ViewportPortal>
				</ReactFlow>
			</div>

			<div className={styles["home-page__frame"]} aria-hidden="true">
				<div className={clsx(styles["home-page__cheek"], styles["home-page__cheek--left"])} />
				<div className={clsx(styles["home-page__cheek"], styles["home-page__cheek--right"])} />
			</div>

			{loaderVisible && <LoadingScreen />}
		</main>
	);
};
