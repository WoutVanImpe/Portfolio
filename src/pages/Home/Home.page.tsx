import { useCallback, useMemo, useState, type FC } from "react";
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
import {
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

	const displayStates = useMemo(() => getDisplayStates(nodes, edges), [nodes, edges]);
	const controlStates = useMemo(() => getControlStates(nodes, edges), [nodes, edges]);
	const primaryDisplay = getPrimaryDisplayState(nodes, edges);
	const primaryDisplayNode = nodes.find((node) => node.data.kind === "display" && node.data.variant === "media");
	const primaryDisplayId = primaryDisplayNode?.data.kind === "display" ? primaryDisplayNode.data.displayId : undefined;

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
				if (node.data.kind === "display") {
					const state = displayStates[node.data.displayId];

					return {
						...node,
						data: {
							...node.data,
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
							...node.data,
							project,
							mediaIndex,
							onPrevious: () => stepMedia(displayId, -1),
							onNext: () => stepMedia(displayId, 1),
						},
					};
				}

				return node;
			}),
		[nodes, displayStates, controlStates, mediaIndexes, primaryDisplayId, primaryDisplay?.project, stepMedia],
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
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onBeforeDelete={onBeforeDelete}
				isValidConnection={isValidConnectionCallback}
				nodeTypes={nodeTypes}
				nodesDraggable
				nodesConnectable
				fitView
				proOptions={{ hideAttribution: true }}
			>
				<Controls showFitView={false} showInteractive={false} showZoom={false} />
				<Background color="var(--pattern-dot)" />
			</ReactFlow>
		</main>
	);
};
