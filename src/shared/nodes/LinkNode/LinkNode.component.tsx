import type { FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Handler } from "@shared/Handler";
import type { LinkNodeProps as LNP } from "./linkNode.props";
import styles from "./linkNode.module.scss";

export const LinkNode: FC<LNP> = ({ id, data }) => {
	const { t } = useTranslation();
	const mediaTargetId = `${id}-target`;
	const control = data.kind === "control" ? data : undefined;
	const project = control?.project;
	const label = t("control.open");
	const connectedHandles = data.connectedHandles ?? [];
	const isConnected = data.isConnected ?? false;

	return (
		<div className={clsx(styles["link-node"])}>
			<div className={styles["link-node__header"]}>
				<span className={styles["link-node__status"]} data-active={isConnected ? "true" : undefined} aria-hidden="true" />
				<span className={styles["link-node__title"]}>{t("node.link")}</span>
				<span className={styles["link-node__code"]}>LNK-01</span>
			</div>

			<div className={styles["link-node__body"]}>
				<span className={styles["link-node__key-housing"]}>
					<button
						className={clsx(styles["link-node__keycap"])}
						type="button"
						disabled={!isConnected || !project}
						aria-label={label}
						title={label}
						onClick={() => {
							if (project) window.open(project.liveUrl, "_blank", "noopener,noreferrer");
						}}
					>
						<span className={styles["link-node__keycap-text"]}>OPEN LIVE</span>
					</button>
				</span>
			</div>

			<div className={styles["link-node__jack-strip"]}>
				<Handler
					type="target"
					position="left"
					id={id}
					portLabel="IN"
					connected={connectedHandles.includes(mediaTargetId)}
					handleColors={data.handleColors}
				/>
			</div>
		</div>
	);
};
