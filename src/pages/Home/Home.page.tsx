import type { FC } from "react";
import styles from "./home.page.module.scss";
import type { HomePageProps } from "./home.page.props";
import { Background, Controls, ReactFlow } from "@xyflow/react";

export const HomePage: FC<HomePageProps> = () => {
	return (
		<main className={styles["home-page"]}>
			<ReactFlow proOptions={{ hideAttribution: true }}>
				<Controls />
				<Background />
			</ReactFlow>
		</main>
	);
};
