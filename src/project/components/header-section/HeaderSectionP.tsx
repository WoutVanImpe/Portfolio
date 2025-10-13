import styles from "./headerSectionP.module.scss";

export const HeaderSectionP = () => {
	return (
		<div className={styles["s-header"]}>
			<div className={styles["s-header__postcard-container"]}></div>
			<div className={styles["s-header__text-container"]}>
				<div className={styles["s-header__intro-container"]}></div>
				<div className={styles["s-header__live-container"]}></div>
			</div>
			<div className={styles["s-header__back-button"]}></div>
		</div>
	);
};
