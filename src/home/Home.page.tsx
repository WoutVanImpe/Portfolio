import styles from "./home.module.scss";
import { useGetProjects } from "~shared/hooks/projects-data/useGetProjects.hooks";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import { FloatingCard } from "./components/FloatingCard";

export const Home = () => {
	const { data } = useGetProjects();
	const dimensions = useWindowDimensions();

	return (
		<div className={styles["p-home"]}>
			<div className={styles["p-home__header"]}>
				<div className={styles["p-home__header__constrainBox"]}></div>

				{data?.map((project: ProjectType, index: number) => (
					<FloatingCard key={project.title + index} project={project} startX={dimensions.width + index * 300} containerWidth={dimensions.width} containerHeight={dimensions.height} />
				))}
			</div>
			<div className={styles["p-home__header"]}>
				<div className={styles["p-home__header__constrainBox"]}></div>
			</div>
		</div>
	);
};
