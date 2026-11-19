import type { FC } from "react";
import styles from "./home.page.module.scss";
import type { HomePageProps } from "./home.page.props";

export const HomePage: FC<HomePageProps> = ({ title = "Portfolio" }) => {
	return (
		<main className={styles["home-page"]}>
			<p className={styles["home-page__eyebrow"]}>{title}</p>
			<h1 className={styles["home-page__title"]}>A fresh start.</h1>
			<p className={styles["home-page__intro"]}>This is the blank canvas for the next project.</p>
		</main>
	);
};
