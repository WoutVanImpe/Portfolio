import { useCallback, useMemo, useState, type FC, type MouseEvent as ReactMouseEvent } from "react";
import { useTranslation } from "react-i18next";
import {
	Background,
	Controls,
	ReactFlow,
	useEdgesState,
	useNodesState,
	type Connection,
	type OnBeforeDelete,
} from "@xyflow/react";
import { useTheme } from "@context/Theme";
import { normalizeLanguage } from "@/i18n/localize";
import { getProject } from "@shared/data/projects";
import {
	getActiveCategoryFilter,
	getControlStates,
	getDisplayStates,
	getPrimaryDisplayState,
	handleConnect,
	initialEdges,
	initialNodes,
	isValidConnection as isValidGraphConnection,
	nodeTypes,
	withActiveLanguageEdge,
	withActiveThemeEdge,
	type PortfolioEdge,
	type PortfolioNode,
} from "@shared/nodes";
import styles from "./home.page.module.scss";
import type { HomePageProps } from "./home.page.props";

export const HomePage: FC<HomePageProps> = () => {
	const { theme, setTheme } = useTheme();
	const { i18n } = useTranslation();
	const language = normalizeLanguage(i18n.resolvedLanguage);
	const [nodes, , onNodesChange] = useNodesState<PortfolioNode>(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState<PortfolioEdge>(
		withActiveLanguageEdge(withActiveThemeEdge(initialEdges, initialNodes, theme), initialNodes, language),
	);
	const [mediaIndexes, setMediaIndexes] = useState<Record<string, number>>({});

	const connectedHandleList = useMemo(
		() =>
			Array.from(
				new Set(
					edges.flatMap((edge) =>
						[edge.sourceHandle, edge.targetHandle].filter((value): value is string => Boolean(value)),
					),
				),
			),
		[edges],
	);

	const activeCategory = useMemo(() => getActiveCategoryFilter(nodes, edges), [nodes, edges]);
	const displayStates = useMemo(() => getDisplayStates(nodes, edges), [nodes, edges]);
	const controlStates = useMemo(() => getControlStates(nodes, edges), [nodes, edges]);
	const primaryDisplay = getPrimaryDisplayState(nodes, edges);
	const primaryDisplayNode = nodes.find((node) => node.data.kind === "display" && node.data.variant === "media");
	const primaryDisplayId = primaryDisplayNode?.data.kind === "display" ? primaryDisplayNode.data.displayId : undefined;

	const hiddenNodeIds = useMemo(
		() =>
			new Set(
				nodes
					.filter(
						(node) =>
							node.data.kind === "project" &&
							Boolean(activeCategory) &&
							getProject(node.data.projectId)?.category !== activeCategory,
					)
					.map((node) => node.id),
			),
		[nodes, activeCategory],
	);

	const stepMedia = useCallback(
		(displayId: string | undefined, delta: number) => {
			const count = displayId ? (displayStates[displayId]?.project?.media.length ?? 0) : 0;
			if (!displayId || count === 0) return;

			setMediaIndexes((current) => {
				const index = current[displayId] ?? 0;
				const next = ((index + delta) % count + count) % count;

				return { ...current, [displayId]: next };
			});
		},
		[displayStates],
	);

	const renderNodes = useMemo(
		() =>
			nodes.map((node) => {
				if (hiddenNodeIds.has(node.id)) return { ...node, hidden: true };

				const connectedData = { ...node.data, connectedHandles: connectedHandleList };

				if (node.data.kind === "display") {
					const state = displayStates[node.data.displayId];

					return {
						...node,
						data: {
							...connectedData,
							project: state?.project,
							status: state?.status,
							filter: state?.filter,
							mediaIndex: mediaIndexes[node.data.displayId] ?? 0,
						},
					};
				}

				if (node.data.kind === "control") {
					const state = controlStates[node.id];
					const displayId = state?.displayId ?? primaryDisplayId;
					const project = state?.project ?? primaryDisplay?.project;
					const mediaIndex = displayId ? (mediaIndexes[displayId] ?? 0) : 0;

					return {
						...node,
						data: {
							...connectedData,
							project,
							mediaIndex,
							onPrevious: () => stepMedia(displayId, -1),
							onNext: () => stepMedia(displayId, 1),
						},
					};
				}

				return { ...node, data: connectedData };
			}),
		[nodes, hiddenNodeIds, displayStates, controlStates, mediaIndexes, primaryDisplayId, primaryDisplay?.project, stepMedia, connectedHandleList],
	);

	const renderEdges = useMemo(
		() =>
			edges.map((edge) =>
				hiddenNodeIds.has(edge.source) || hiddenNodeIds.has(edge.target) ? { ...edge, hidden: true } : edge,
			),
		[edges, hiddenNodeIds],
	);

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
		(connection: Connection | PortfolioEdge) => isValidGraphConnection(connection, nodes, edges),
		[nodes, edges],
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
		<main className={styles["home-page"]}>
			<ReactFlow
				nodes={renderNodes}
				edges={renderEdges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onEdgeDoubleClick={onEdgeDoubleClick}
				onBeforeDelete={onBeforeDelete}
				isValidConnection={isValidConnectionCallback}
				nodeTypes={nodeTypes}
				nodesDraggable
				nodesConnectable
				defaultViewport={{ x: 80, y: 40, zoom: 1 }}
				proOptions={{ hideAttribution: true }}
			>
				<Controls showFitView={false} showInteractive={false} showZoom={false} />
				<Background color="var(--pattern-dot)" />
			</ReactFlow>
		</main>
	);
};
