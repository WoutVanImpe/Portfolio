import { useTranslation } from "react-i18next";
import clsx from "clsx";
import type { CSSProperties } from "react";
import { localize } from "@/i18n/localize";
import { Handler } from "@shared/Handler";
import type { LabelNodeProps } from "./labelNode.props";
import styles from "./labelNode.module.scss";

const groupColors: Record<string, string> = {
	theme: "var(--node-theme)",
	language: "var(--node-language)",
	filter: "var(--node-filter)",
	effect: "var(--node-effect)",
};

export const LabelNode = ({ id, data }: LabelNodeProps) => {
	const { t, i18n } = useTranslation();
	const handles = data.handles ?? [];
	const targets = handles.filter((handle) => handle.type === "target");
	const sources = handles.filter((handle) => handle.type === "source");
	const themeValue = data.kind === "theme" ? data.value : undefined;
	const label = data.labelKey
		? t(data.labelKey)
		: data.localizedLabel
			? localize(data.localizedLabel, i18n.language)
			: data.label;
	const nodeGroup =
		data.kind === "theme"
			? "theme"
			: data.kind === "language"
				? "language"
				: data.kind === "filter"
					? "filter"
					: data.kind === "modifier"
						? "effect"
						: undefined;
	const groupColor = nodeGroup ? groupColors[nodeGroup] : undefined;
	const groupStyle: CSSProperties | undefined = groupColor
		? {
				backgroundColor: groupColor,
				borderColor: groupColor,
				color: "var(--text-on-accent)",
			}
		: undefined;

	return (
		<div className={clsx(styles["label-node"])} data-node-group={nodeGroup} style={groupStyle}>
			{targets.map((handle, index) => (
				<Handler
					key={`target-${index}`}
					type="target"
					position={handle.position}
					id={`${id}-${index}`}
					offsetTop={handle.offsetTop}
					offsetLeft={handle.offsetLeft}
				/>
			))}

			{themeValue ? (
				<span className={styles["theme-swatch"]} data-theme-preview={themeValue} role="img" aria-label={label} />
			) : (
				<span>{label}</span>
			)}

			{sources.map((handle, index) => (
				<Handler
					key={`source-${index}`}
					type="source"
					position={handle.position}
					id={`${id}-${index}`}
					offsetTop={handle.offsetTop}
					offsetLeft={handle.offsetLeft}
				/>
			))}
		</div>
	);
};
