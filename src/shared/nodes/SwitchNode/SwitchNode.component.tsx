import type { FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Icon } from "@shared/Icon";
import { Handler } from "@shared/Handler";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { SwitchNodeProps as SNP } from "./switchNode.props";
import styles from "./switchNode.module.scss";

export const SwitchNode: FC<SNP> = ({ id, data }) => {
	const { t } = useTranslation();
	const mediaTargetId = `${id}-target`;
	const control = data.kind === "control" ? data : undefined;
	const canSwitch = (control?.project?.media.length ?? 0) > 1;
	const previousLabel = t("control.previous");
	const nextLabel = t("control.next");
	const connectedHandles = data.connectedHandles ?? [];
	const isConnected = data.isConnected ?? false;

	return (
		<div className={clsx(styles["switch-node"])}>
			<div className={styles["switch-node__header"]}>
				<span className={styles["switch-node__status"]} data-active={isConnected ? "true" : undefined} aria-hidden="true" />
				<span className={styles["switch-node__title"]}>{t("node.switch")}</span>
				<span className={styles["switch-node__code"]}>SW-01</span>
			</div>

			<div className={styles["switch-node__body"]}>
				<span className={styles["switch-node__key-housing"]}>
					<button
						className={clsx(styles["switch-node__keycap"])}
						type="button"
						disabled={!canSwitch}
						aria-label={previousLabel}
						title={previousLabel}
						onClick={() => control?.onPrevious?.()}
					>
						<Icon icon={ArrowLeft} size={25} className={styles["switch-node__icon"]} />
					</button>
				</span>
				<span className={styles["switch-node__key-housing"]}>
					<button
						className={clsx(styles["switch-node__keycap"])}
						type="button"
						disabled={!canSwitch}
						aria-label={nextLabel}
						title={nextLabel}
						onClick={() => control?.onNext?.()}
					>
						<Icon icon={ArrowRight} size={25} className={styles["switch-node__icon"]} />
					</button>
				</span>
			</div>

			<div className={styles["switch-node__jack-strip"]}>
				<Handler
					type="target"
					position="top"
					id={id}
					portLabel="IN"
					connected={connectedHandles.includes(mediaTargetId)}
					handleColors={data.handleColors}
				/>
			</div>
		</div>
	);
};
