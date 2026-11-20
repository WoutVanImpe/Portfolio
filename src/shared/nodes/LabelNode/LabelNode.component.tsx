import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Handler } from "@shared/Handler";
import type { LabelNodeProps } from "./labelNode.props";
import styles from "./labelNode.module.scss";

export const LabelNode: FC<LabelNodeProps> = ({ id, data }) => {
	const { t } = useTranslation();
	const handles = data.handles ?? [];
	const targets = handles.filter((handle) => handle.type === "target");
	const sources = handles.filter((handle) => handle.type === "source");
	const themeValue = data.kind === "theme" ? data.value : undefined;
	const label = data.labelKey ? t(data.labelKey) : data.label;

	return (
		<div className={styles["label-node"]}>
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
