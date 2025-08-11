import styles from "./headerSection.module.scss";

export const HeaderSection = () => {
	return (
		<div className={styles["s-header"]}>
			<div className={styles["s-header__greet"]}></div>
			<div className={styles["s-header__fill"]}></div>
		</div>
	);
};
