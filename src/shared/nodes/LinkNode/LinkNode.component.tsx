import type { FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Icon } from "@shared/Icon";
import { Handler } from "@shared/Handler";
import { Search } from "lucide-react";
import type { LinkNodeProps as LNP } from "./linkNode.props";
import styles from "./linkNode.module.scss";

export const LinkNode: FC<LNP> = ({ data }) => {
	const { t } = useTranslation();
	const control = data.kind === "control" ? data : undefined;
	const project = control?.project;
	const label = t("control.open");

	return (
		<div className={clsx(styles["link-node"])}>
			<Handler type="target" position="left" id="link-node" offsetTop={5} offsetLeft={5} />
			<button
				className={clsx(styles["link-node__button"])}
				type="button"
				disabled={!project}
				aria-label={label}
				title={label}
				onClick={() => {
					if (project) window.open(project.liveUrl, "_blank", "noopener,noreferrer");
				}}
			>
				<Icon icon={Search} />
			</button>
		</div>
	);
};
