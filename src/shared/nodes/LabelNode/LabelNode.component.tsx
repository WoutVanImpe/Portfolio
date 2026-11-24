import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { localize } from "@/i18n/localize";
import { Handler, type PortLabel } from "@shared/Handler";
import type { LabelNodeProps } from "./labelNode.props";
import styles from "./labelNode.module.scss";

export const LabelNode = ({ id, data }: LabelNodeProps) => {
	const { t, i18n } = useTranslation();
	const handles = data.handles ?? [];
	const targets = handles.filter((handle) => handle.type === "target");
	const sources = handles.filter((handle) => handle.type === "source");
	const connectedHandles = data.connectedHandles ?? [];
	const isConnected = data.isConnected ?? false;
	const label = data.labelKey
		? t(data.labelKey)
		: data.localizedLabel
			? localize(data.localizedLabel, i18n.language)
			: data.label;
	const hardwareCode =
		data.kind === "project"
			? "PRJ-01"
			: data.kind === "filter"
				? "FLT-01"
				: data.kind === "modifier"
					? "FX-01"
					: data.kind === "theme"
						? "SYS-01"
						: data.kind === "language"
							? "SYS-02"
							: "SYS-00";
	const showFlowArrow = data.kind === "modifier" && targets.length > 0 && sources.length > 0;

	const targetLabel: PortLabel =
		data.kind === "filter"
			? "FILTER"
			: data.kind === "theme"
				? "THEME"
				: data.kind === "language"
					? "LANG"
					: "IN";
	const sourceLabel: PortLabel = "OUT";

	return (
		<div className={clsx(styles["label-node"])}>
			<div className={styles["label-node__header"]}>
				<span
					className={styles["label-node__status"]}
					data-active={isConnected ? "true" : undefined}
					data-filtered={data.isFilteredOut ? "true" : undefined}
					aria-hidden="true"
				/>
				<span className={styles["label-node__title"]}>{label}</span>
				<span className={styles["label-node__code"]}>{hardwareCode}</span>
			</div>

			<div className={styles["label-node__jack-strip"]}>
				{targets.map((handle, index) => (
					<Handler
						key={`target-${index}`}
						type="target"
						position={handle.position}
						id={`${id}-${index}`}
						portLabel={targetLabel}
						connected={connectedHandles.includes(`${id}-${index}-target`)}
						handleColors={data.handleColors}
					/>
				))}

				{showFlowArrow ? (
					<span className={styles["label-node__flow-arrow"]} aria-hidden="true">
						──▶
					</span>
				) : null}

				{sources.map((handle, index) => (
					<Handler
						key={`source-${index}`}
						type="source"
						position={handle.position}
						id={`${id}-${index}`}
						portLabel={sourceLabel}
						connected={connectedHandles.includes(`${id}-${index}-source`)}
						handleColors={data.handleColors}
					/>
				))}
			</div>
		</div>
	);
};
