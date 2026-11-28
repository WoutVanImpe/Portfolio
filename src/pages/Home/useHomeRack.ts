import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { useTranslation } from "react-i18next";
import {
	NodeChangeset,
	getNodesBounds,
	getViewportForBounds,
	useEdgesState,
	useNodesState,
	type Connection,
	type CoordinateExtent,
	type OnBeforeDelete,
	type OnMove,
	type OnNodesChange,
	type ReactFlowInstance,
	type Viewport,
} from "@xyflow/react";
import { useTheme } from "@context/Theme";
import { normalizeLanguage } from "@/i18n/localize";
import {
	createNodes,
	fillFrameBlanks,
	getActiveCategoryFilter,
	getControlStates,
	getDisplayStates,
	getRackLayout,
	handleConnect,
	initialEdges,
	initialNodes,
	isValidConnection as isValidGraphConnection,
	MIN_LOADER_VISIBLE_MS,
	naturalWidth,
	packNodes,
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
import { ABOUT_MIN_VIEWPORT_SIZE, CASE_CHEEK_SIZE, CASE_RAIL_SIZE } from "./home.constants";
import {
	buildRenderEdges,
	buildRenderNodes,
	getDisplayProjectSignature,
	getFilteredOutNodeIds,
	getHandleColorMap,
} from "./home.nodeView";
import styles from "./home.page.module.scss";

export const useHomeRack = () => {
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
	const awaitNaturalRef = useRef(true);
	const [flowInstance, setFlowInstance] = useState<ReactFlowInstance<PortfolioNode, PortfolioEdge> | null>(null);
	const [fitViewport, setFitViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 1 });
	const [zoomFloor, setZoomFloor] = useState(0.35);
	const [isZoomedIn, setIsZoomedIn] = useState(false);
	const [nodes, setNodes, onNodesChange] = useNodesState<PortfolioNode>(createNodes(layout));
	const nodesRef = useRef(nodes);
	nodesRef.current = nodes;
	const aboutNodeRef = useRef<PortfolioNode | undefined>(nodes.find((node) => node.data.kind === "about"));
	const showAboutNode = viewportWidth >= ABOUT_MIN_VIEWPORT_SIZE && viewportHeight >= ABOUT_MIN_VIEWPORT_SIZE;
	const hasAboutNode = nodes.some((node) => node.data.kind === "about");
	const innerSizeRef = useRef({ width: viewportWidth, height: viewportHeight });
	innerSizeRef.current = { width: viewportWidth, height: viewportHeight };

	useEffect(() => {
		if (showAboutNode === hasAboutNode) return;

		setNodes((current) => {
			const aboutNode = current.find((node) => node.data.kind === "about");
			if (showAboutNode) return aboutNodeRef.current ? [aboutNodeRef.current, ...current] : current;
			if (!aboutNode) return current;
			aboutNodeRef.current = aboutNode;
			return current.filter((node) => node.id !== aboutNode.id);
		});
		setLayoutTick((tick) => tick + 1);
	}, [hasAboutNode, setNodes, showAboutNode]);

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
	const sizeSignature = `${layout}|${viewportWidth}|${viewportHeight}|${naturalSignature}|${overrideSignature}`;

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
	const filteredOutNodeIds = useMemo(() => getFilteredOutNodeIds(nodes, activeCategory), [nodes, activeCategory]);
	const visibleEdges = useMemo(() => edges.filter((edge) => !filteredOutNodeIds.has(edge.source) && !filteredOutNodeIds.has(edge.target)), [edges, filteredOutNodeIds]);

	const { connectedHandles: connectedHandleList, handleColors: handleColorMap, connectedNodeIds } = useMemo(
		() => getHandleColorMap(visibleEdges),
		[visibleEdges],
	);

	const displayStates = useMemo(() => getDisplayStates(nodes, edges), [nodes, edges]);
	const controlStates = useMemo(() => getControlStates(nodes, edges), [nodes, edges]);
	const displayProjectSignature = useMemo(() => getDisplayProjectSignature(displayStates), [displayStates]);

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
			buildRenderNodes({
				nodes,
				widthOverrides,
				displayStates,
				controlStates,
				mediaIndexes,
				displayViews,
				stepMedia,
				setDisplayView,
				toggleModifier,
				connectedHandleList,
				handleColorMap,
				connectedNodeIds,
				filteredOutNodeIds,
			}),
		[nodes, widthOverrides, displayStates, controlStates, mediaIndexes, displayViews, stepMedia, setDisplayView, toggleModifier, connectedHandleList, handleColorMap, connectedNodeIds, filteredOutNodeIds],
	);

	const renderEdges = useMemo(
		() => buildRenderEdges(edges, filteredOutNodeIds),
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

	const isValidConnection = useCallback(
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

	const handleMoveStart = useCallback(() => {
		flowWrapRef.current?.classList.add(styles["home-page__canvas--moving"]);
	}, []);

	const handleMoveEnd = useCallback<OnMove>(
		(_event, viewport) => {
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
		},
		[fitReady, fitViewport, flowInstance],
	);

	return {
		measureRef,
		flowWrapRef,
		loaderVisible,
		isZoomedIn,
		zoomFloor,
		blankPanels,
		frameRect,
		translateExtent,
		renderNodes,
		renderEdges,
		handleNodesChange,
		onEdgesChange,
		onConnect,
		onEdgeDoubleClick,
		onBeforeDelete,
		handleInit,
		handleMoveStart,
		handleMoveEnd,
		isValidConnection,
	};
};
