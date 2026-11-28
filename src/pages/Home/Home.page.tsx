import { type FC } from "react";
import clsx from "clsx";
import { ReactFlow, ViewportPortal } from "@xyflow/react";
import { LoadingScreen } from "@shared/LoadingScreen";
import { edgeTypes, nodeTypes } from "@shared/nodes";
import { CASE_CHEEK_SIZE, CASE_RAIL_SIZE, frameStyle } from "./home.constants";
import styles from "./home.page.module.scss";
import type { HomePageProps } from "./home.page.props";
import { useHomeRack } from "./useHomeRack";

export const HomePage: FC<HomePageProps> = () => {
	const rack = useHomeRack();

	return (
		<main className={clsx(styles["home-page"], rack.isZoomedIn && styles["home-page--zoomed"])} style={frameStyle}>
			<svg className={styles["home-page__filters"]} aria-hidden="true" focusable="false">
				<defs>
					<filter id="portfolio-rgb-split" colorInterpolationFilters="sRGB" x="-10%" y="-10%" width="120%" height="120%">
						<feOffset in="SourceGraphic" dx="3" dy="0" result="redShift" />
						<feColorMatrix
							in="redShift"
							type="matrix"
							values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
							result="red"
						/>
						<feOffset in="SourceGraphic" dx="-3" dy="0" result="cyanShift" />
						<feColorMatrix
							in="cyanShift"
							type="matrix"
							values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
							result="cyan"
						/>
						<feBlend in="red" in2="cyan" mode="screen" />
					</filter>

					<filter id="portfolio-pixelate" colorInterpolationFilters="sRGB">
						<feFlood x="3" y="3" width="2" height="2" floodColor="white" result="sample" />
						<feComposite in="sample" in2="sample" x="0" y="0" width="10" height="10" operator="over" result="cell" />
						<feTile in="cell" result="tiles" />
						<feComposite in="SourceGraphic" in2="tiles" operator="in" result="sampled" />
						<feMorphology in="sampled" operator="dilate" radius="4" />
					</filter>
				</defs>
			</svg>

			<div className={styles["home-page__measure"]} ref={rack.measureRef} aria-hidden="true" />

			<div className={styles["home-page__canvas"]} ref={rack.flowWrapRef}>
				<ReactFlow
					className={styles["home-page__flow"]}
					nodes={rack.renderNodes}
					edges={rack.renderEdges}
					onNodesChange={rack.handleNodesChange}
					onEdgesChange={rack.onEdgesChange}
					onConnect={rack.onConnect}
					onEdgeDoubleClick={rack.onEdgeDoubleClick}
					onBeforeDelete={rack.onBeforeDelete}
					onInit={rack.handleInit}
					onMoveStart={rack.handleMoveStart}
					onMoveEnd={rack.handleMoveEnd}
					isValidConnection={rack.isValidConnection}
					nodeTypes={nodeTypes}
					edgeTypes={edgeTypes}
					nodesDraggable={false}
					nodesConnectable
					deleteKeyCode={null}
					panOnDrag={rack.isZoomedIn}
					autoPanOnConnect={false}
					autoPanOnNodeDrag={false}
					panOnScroll={false}
					zoomOnScroll
					zoomOnPinch
					zoomOnDoubleClick={false}
					preventScrolling
					defaultViewport={{ x: CASE_CHEEK_SIZE, y: CASE_RAIL_SIZE, zoom: 1 }}
					minZoom={rack.zoomFloor}
					maxZoom={3}
					translateExtent={rack.translateExtent}
				>
					<ViewportPortal>
						<div
							className={styles["rack-backdrop"]}
							style={{
								left: rack.frameRect?.x ?? -4000,
								top: rack.frameRect?.y ?? -4000,
								width: rack.frameRect?.width ?? 8000,
								height: rack.frameRect?.height ?? 8000,
							}}
							aria-hidden="true"
						/>
						{rack.blankPanels.map((panel) => (
							<div
								key={panel.id}
								className={styles["blank-panel"]}
								style={{ left: panel.x, top: panel.y, width: panel.width, height: panel.height }}
								aria-hidden="true"
							/>
						))}
					</ViewportPortal>

					<div className={styles["home-page__frame"]} aria-hidden="true">
						<div className={clsx(styles["home-page__cheek"], styles["home-page__cheek--left"])} />
						<div className={clsx(styles["home-page__cheek"], styles["home-page__cheek--right"])} />
					</div>
				</ReactFlow>
			</div>

			{rack.loaderVisible && <LoadingScreen />}
		</main>
	);
};
