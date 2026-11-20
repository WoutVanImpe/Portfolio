import { useCallback, type FC } from "react";
import { Background, Controls, ReactFlow, useEdgesState, useNodesState, type Connection } from "@xyflow/react";
import { useTheme } from "@context/Theme";
import { handleConnect, initialNodes, nodeTypes, withActiveThemeEdge, type PortfolioEdge, type PortfolioNode } from "@shared/nodes";
import styles from "./home.page.module.scss";
import type { HomePageProps } from "./home.page.props";

export const HomePage: FC<HomePageProps> = () => {
	const { theme, setTheme } = useTheme();
	const [nodes, , onNodesChange] = useNodesState<PortfolioNode>(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState<PortfolioEdge>(withActiveThemeEdge([], initialNodes, theme));

	const onConnect = useCallback((connection: Connection) => handleConnect({ nodes, setEdges, applyTheme: setTheme }, connection), [nodes, setEdges, setTheme]);

	return (
		<main className={styles["home-page"]}>
			<ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes} nodesDraggable nodesConnectable fitView proOptions={{ hideAttribution: true }}>
				<Controls showFitView={false} showInteractive={false} showZoom={false} />
				<Background color="var(--pattern-dot)" />
			</ReactFlow>
		</main>
	);
};
