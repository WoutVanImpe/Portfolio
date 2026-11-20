import type { FC } from "react";
import clsx from "clsx";
import type { SwitchNodeProps as SNP } from "./switchNode.props";
import styles from "./switchNode.module.scss";
import { Icon } from "@shared/Icon";
import { Handler } from "@shared/Handler";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const SwitchNode: FC<SNP> = () => {
	return (
		<div className={clsx(styles["switch-node"])}>
			<Handler type="target" position="top" id="switch-node" offsetTop={5} offsetLeft={5} />
			<button className={clsx(styles["switch-node__button"])}>
				<Icon icon={ArrowLeft} />
			</button>
			<button className={clsx(styles["switch-node__button"])}>
				<Icon icon={ArrowRight} />
			</button>
		</div>
	);
};
