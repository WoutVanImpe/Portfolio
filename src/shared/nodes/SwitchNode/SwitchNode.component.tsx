import type { FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Icon } from "@shared/Icon";
import { Handler } from "@shared/Handler";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { SwitchNodeProps as SNP } from "./switchNode.props";
import styles from "./switchNode.module.scss";

export const SwitchNode: FC<SNP> = ({ data }) => {
	const { t } = useTranslation();
	const control = data.kind === "control" ? data : undefined;
	const canSwitch = (control?.project?.media.length ?? 0) > 1;
	const previousLabel = t("control.previous");
	const nextLabel = t("control.next");
	const connectedHandles = data.connectedHandles ?? [];

	return (
		<div className={clsx(styles["switch-node"])} data-active={control?.project ? "true" : undefined}>
			<Handler
				type="target"
				position="top"
				id="switch-node"
				offsetTop={5}
				offsetLeft={5}
				connected={connectedHandles.includes("switch-node-target")}
				portLabel="IN"
			/>
			<span className={styles["switch-node__led"]} aria-hidden="true" />
			<button
				className={clsx(styles["switch-node__button"])}
				type="button"
				disabled={!canSwitch}
				aria-label={previousLabel}
				title={previousLabel}
				onClick={() => control?.onPrevious?.()}
			>
				<Icon icon={ArrowLeft} />
			</button>
			<button
				className={clsx(styles["switch-node__button"])}
				type="button"
				disabled={!canSwitch}
				aria-label={nextLabel}
				title={nextLabel}
				onClick={() => control?.onNext?.()}
			>
				<Icon icon={ArrowRight} />
			</button>
		</div>
	);
};
