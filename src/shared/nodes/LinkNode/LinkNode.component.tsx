import type { FC } from "react";
import clsx from "clsx";
import type { LinkNodeProps as LNP } from "./linkNode.props";
import styles from "./linkNode.module.scss";
import { Icon } from "@shared/Icon";
import { Handler } from "@shared/Handler";
import { Search } from "lucide-react";

export const LinkNode: FC<LNP> = () => {
	return (
		<div className={clsx(styles["link-node"])}>
			<Handler type="target" position="left" id="link-node" offsetTop={5} offsetLeft={5} />
			<button className={clsx(styles["link-node__button"])}>
				<Icon icon={Search} />
			</button>
		</div>
	);
};
