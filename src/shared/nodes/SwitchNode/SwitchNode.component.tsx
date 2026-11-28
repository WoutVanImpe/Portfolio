import { useEffect, useRef, useState, type FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Icon } from "@shared/Icon";
import { Handler } from "@shared/Handler";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getHardwareCode } from "../initialNodes";
import { PRESS_DURATION_MS } from "../timing";
import type { SwitchNodeProps as SNP } from "./switchNode.props";
import styles from "./switchNode.module.scss";

type SwitchButton = "previous" | "next";

export const SwitchNode: FC<SNP> = ({ id, data }) => {
	const { t } = useTranslation();
	const [pressedKey, setPressedKey] = useState<SwitchButton | null>(null);
	const pressTimerRef = useRef<number | null>(null);
	const mediaTargetId = `${id}-target`;
	const control = data.kind === "control" ? data : undefined;
	const canSwitch = (control?.project?.media.length ?? 0) > 1;
	const previousLabel = t("control.previous");
	const nextLabel = t("control.next");
	const connectedHandles = data.connectedHandles ?? [];
	const isConnected = data.isConnected ?? false;

	useEffect(
		() => () => {
			if (pressTimerRef.current !== null) window.clearTimeout(pressTimerRef.current);
		},
		[],
	);

	const handlePress = (key: SwitchButton, action?: () => void) => () => {
		setPressedKey(key);
		if (pressTimerRef.current !== null) window.clearTimeout(pressTimerRef.current);
		pressTimerRef.current = window.setTimeout(() => setPressedKey(null), PRESS_DURATION_MS);
		action?.();
	};

	return (
		<div className={clsx(styles["switch-node"])}>
			<span className={styles["switch-node__code"]}>{getHardwareCode(id)}</span>

			<div className={styles["switch-node__header"]}>
				<span className={styles["switch-node__status"]} data-active={isConnected ? "true" : undefined} aria-hidden="true" />
				<span className={styles["switch-node__title"]}>{t("node.switch")}</span>
			</div>

			<div className={styles["switch-node__body"]}>
				<span className={styles["switch-node__key-housing"]}>
					<button
						className={clsx(styles["switch-node__keycap"])}
						type="button"
						disabled={!canSwitch}
						data-pressed={pressedKey === "previous" ? "true" : undefined}
						aria-label={previousLabel}
						title={previousLabel}
						onClick={handlePress("previous", () => control?.onPrevious?.())}
					>
						<Icon icon={ArrowLeft} size={20} className={styles["switch-node__icon"]} />
					</button>
				</span>
				<span className={styles["switch-node__key-housing"]}>
					<button
						className={clsx(styles["switch-node__keycap"])}
						type="button"
						disabled={!canSwitch}
						data-pressed={pressedKey === "next" ? "true" : undefined}
						aria-label={nextLabel}
						title={nextLabel}
						onClick={handlePress("next", () => control?.onNext?.())}
					>
						<Icon icon={ArrowRight} size={20} className={styles["switch-node__icon"]} />
					</button>
				</span>
			</div>

			<div className={styles["switch-node__jack-strip"]}>
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
