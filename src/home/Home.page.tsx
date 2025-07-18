import { ProjectCard } from "~shared/components/project-card/ProjectCard";
import styles from "./home.module.scss";

export const Home = () => {
	return (
		<div className={styles["p-home"]}>
			<header className={styles["p-home__header"]}>
				<ProjectCard />
			</header>
		</div>
	);
};
