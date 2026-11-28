import { type FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./screenBlock.module.scss";

export const ScreenBlock: FC = () => {
	const { t } = useTranslation();

	return (
		<main className={styles["screen-block"]}>
			<section
				className={styles["screen-block__panel"]}
				aria-labelledby="screen-block-title"
				aria-describedby="screen-block-message"
			>
				<header className={styles["screen-block__header"]}>
					<span className={styles["screen-block__status"]} aria-hidden="true" />
					<span className={styles["screen-block__label"]}>Display</span>
					<span className={styles["screen-block__code"]}>SC-01</span>
				</header>

				<div className={styles["screen-block__body"]}>
					<div className={styles["screen-block__screen"]}>
						<h1 className={styles["screen-block__title"]} id="screen-block-title">
							{t("screenBlock.title")}
						</h1>
						<p className={styles["screen-block__message"]} id="screen-block-message">
							{t("screenBlock.message")}
						</p>
					</div>
				</div>
			</section>
		</main>
	);
};
