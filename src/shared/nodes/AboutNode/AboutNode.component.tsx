import { useTranslation } from "react-i18next";
import { getHardwareCode } from "../initialNodes";
import styles from "./aboutNode.module.scss";
import type { AboutNodeProps } from "./aboutNode.props";

export const AboutNode = ({ id, data }: AboutNodeProps) => {
	const { t } = useTranslation();

	return (
		<article className={styles["about-node"]} aria-labelledby={`${id}-title`}>
			<span className={styles["about-node__code"]}>{getHardwareCode(id)}</span>

			<header className={styles["about-node__header"]}>
				<span className={styles["about-node__status"]} aria-hidden="true" />
				<span className={styles["about-node__title"]} id={`${id}-title`}>
					{t(data.labelKey ?? "about.label")}
				</span>
			</header>

			<div className={styles["about-node__body"]}>
				<p>{t(data.bodyKey ?? "about.body")}</p>
			</div>
		</article>
	);
};
