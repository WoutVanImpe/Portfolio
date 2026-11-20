import type { FC } from "react";
import clsx from "clsx";
import type { DisplayNodeProps as DNP } from "./displayNode.props";
import styles from "./displayNode.module.scss";
import image from "@assets/test-image.jpeg";
import { Handler } from "@shared/Handler";

export const DisplayNode: FC<DNP> = ({ data }) => {
	return (
		<div className={clsx(styles["display-node"])}>
			<Handler type="target" position="left" id="display-node" offsetTop={10} />
			<img src={image} alt={data.label} />
			<Handler type="source" position="right" id="display-node-1" offsetTop={90} />
			<Handler type="source" position="bottom" id="display-node-2" offsetLeft={90} />
		</div>
	);
};
