import type { FC } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Handler } from "@shared/Handler";
import { getHardwareCode } from "../initialNodes";
import type { ModifierNodeData, ModifierValue } from "../node.types";
import styles from "./effectRack.module.scss";

const modifierValues: ModifierValue[] = ["grayscale", "blur", "contrast"];

interface EffectRackProps {
	id: string;
	data: ModifierNodeData;
}

export const EffectRack: FC<EffectRackProps> = ({ id, data }) => {
	const { t } = useTranslation();
	const handles = data.handles ?? [];
	const targets = handles.filter((handle) => handle.type === "target");
	const sources = handles.filter((handle) => handle.type === "source");
	const connectedHandles = data.connectedHandles ?? [];
	const activeModifiers = data.activeModifiers ?? [];

	return (
		<div className={styles["effect-rack"]}>
			<span className={styles["effect-rack__code"]}>{getHardwareCode(id)}</span>

			<div className={styles["effect-rack__header"]}>
				<span
					className={styles["effect-rack__status"]}
					data-active={data.isConnected ? "true" : undefined}
					aria-hidden="true"
				/>
				<span className={styles["effect-rack__title"]}>{t("node.displayFilter")}</span>
			</div>

			<div className={styles["effect-rack__body"]}>
				{modifierValues.map((value) => {
					const leverId = `${id}-${value}-lever`;
					const label = t(`effect.${value}`);

					return (
						<div className={styles["effect-filter"]} key={value}>
							<span className={styles["effect-filter__name"]}>{label}</span>
							<div className={styles["lever-switch"]}>
								<div className={styles["switch"]}>
									<input
										id={leverId}
										className={styles["lever"]}
										type="checkbox"
										checked={activeModifiers.includes(value)}
										onChange={() => data.onToggleModifier?.(value)}
										aria-label={label}
									/>
									<label className={clsx(styles["led"], styles["led--left"])} htmlFor={leverId}>
										<span>{t("common.on")}</span>
									</label>
									<label className={clsx(styles["led"], styles["led--right"])} htmlFor={leverId}>
										<span>{t("common.off")}</span>
									</label>
									<div className={styles["lever-parts"]} aria-hidden="true">
										<div className={styles["lever-shaft"]} />
										<div className={styles["lever-ball"]} />
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles["effect-rack__jack-strip"]}>
				{targets.map((handle, index) => (
					<Handler
						key={`target-${index}`}
						type="target"
						position={handle.position}
						id={`${id}-${index}`}
						portLabel="IN"
						connected={connectedHandles.includes(`${id}-${index}-target`)}
						handleColors={data.handleColors}
					/>
				))}
				{sources.map((handle, index) => (
					<Handler
						key={`source-${index}`}
						type="source"
						position={handle.position}
						id={`${id}-${index}`}
						portLabel="OUT"
						connected={connectedHandles.includes(`${id}-${index}-source`)}
						handleColors={data.handleColors}
					/>
				))}
			</div>
		</div>
	);
};
