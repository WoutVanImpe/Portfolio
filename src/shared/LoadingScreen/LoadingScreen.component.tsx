import { type FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import styles from "./loadingScreen.module.scss";

export const LoadingScreen: FC = () => {
	const { t } = useTranslation();

	return (
		<div className={styles["loading-screen"]} role="status" aria-label={t("display.loading")}>
			<div className={styles["loading-node"]}>
				<div className={styles["loading-node__header"]}>
					<span className={styles["loading-node__status"]} data-status="loading" aria-hidden="true" />
					<span className={styles["loading-node__title"]}>{t("display.loading")}</span>
					<span className={styles["loading-node__code"]}>LD-01</span>
				</div>

				<div className={styles["loading-node__body"]}>
					<div className={styles["loading-node__screen"]} aria-hidden="true">
						<div className={styles["loader"]}>
							<div className={styles["loader-cell"]} />
							<div className={clsx(styles["loader-cell"], styles["loader-cell--d-1"])} />
							<div className={clsx(styles["loader-cell"], styles["loader-cell--d-2"])} />
							<div className={clsx(styles["loader-cell"], styles["loader-cell--d-1"])} />
							<div className={clsx(styles["loader-cell"], styles["loader-cell--d-2"])} />
							<div className={clsx(styles["loader-cell"], styles["loader-cell--d-2"])} />
							<div className={clsx(styles["loader-cell"], styles["loader-cell--d-3"])} />
							<div className={clsx(styles["loader-cell"], styles["loader-cell--d-3"])} />
							<div className={clsx(styles["loader-cell"], styles["loader-cell--d-4"])} />
						</div>
					</div>
				</div>

				<div className={styles["loading-node__footer"]} aria-hidden="true">
					<div className={styles["loading-node__port"]}>
						<span className={styles["loading-node__jack"]} />
						<span>PWR</span>
					</div>
					<div className={styles["loading-node__port"]}>
						<span className={styles["loading-node__jack"]} />
						<span>CLK</span>
					</div>
					<div className={styles["loading-node__port"]}>
						<span className={styles["loading-node__jack"]} />
						<span>OUT</span>
					</div>
				</div>
			</div>
		</div>
	);
};
