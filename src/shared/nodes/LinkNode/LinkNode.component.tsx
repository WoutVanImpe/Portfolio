import { useEffect, useRef, useState, type FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Handler } from "@shared/Handler";
import { getHardwareCode } from "../initialNodes";
import type { LinkNodeProps as LNP } from "./linkNode.props";
import styles from "./linkNode.module.scss";

const PRESS_DURATION_MS = 400;

export const LinkNode: FC<LNP> = ({ id, data }) => {
	const { t } = useTranslation();
	const [pressed, setPressed] = useState(false);
	const pressTimerRef = useRef<number | null>(null);
	const mediaTargetId = `${id}-target`;
	const control = data.kind === "control" ? data : undefined;
	const project = control?.project;
	const label = t("control.open");
	const connectedHandles = data.connectedHandles ?? [];
	const isConnected = data.isConnected ?? false;

	useEffect(
		() => () => {
			if (pressTimerRef.current !== null) window.clearTimeout(pressTimerRef.current);
		},
		[],
	);

	const handleClick = () => {
		setPressed(true);
		if (pressTimerRef.current !== null) window.clearTimeout(pressTimerRef.current);
		pressTimerRef.current = window.setTimeout(() => setPressed(false), PRESS_DURATION_MS);
		if (project) window.open(project.liveUrl, "_blank", "noopener,noreferrer");
	};

	return (
		<div className={clsx(styles["link-node"])}>
			<span className={styles["link-node__code"]}>{getHardwareCode(id)}</span>

			<div className={styles["link-node__header"]}>
				<span className={styles["link-node__status"]} data-active={isConnected ? "true" : undefined} aria-hidden="true" />
				<span className={styles["link-node__title"]}>{t("node.link")}</span>
			</div>

			<div className={styles["link-node__body"]}>
				<span className={styles["link-node__key-housing"]}>
					<button
						className={clsx(styles["link-node__keycap"])}
						type="button"
						disabled={!isConnected || !project}
						data-pressed={pressed ? "true" : undefined}
						aria-label={label}
						title={label}
						onClick={handleClick}
					>
						<span className={styles["link-node__keycap-text"]}>OPEN LIVE</span>
					</button>
				</span>
			</div>

			<div className={styles["link-node__jack-strip"]}>
				<Handler
					type="target"
					position="bottom"
					id={id}
					portLabel="IN"
					connected={connectedHandles.includes(mediaTargetId)}
					handleColors={data.handleColors}
				/>
			</div>
		</div>
	);
};
