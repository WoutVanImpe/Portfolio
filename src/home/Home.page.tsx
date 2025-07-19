import styles from "./home.module.scss";
import { useGetProjects } from "~shared/hooks/projects-data/useGetProjects.hooks";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import { FloatingCardToLeft, FloatingCardToRight } from "./components/FloatingCard";

export const Home = () => {
	const { data } = useGetProjects();
	const projectList: ProjectType[] = [];
	const dimensions = useWindowDimensions();

	if (data) {
		while (projectList.length <= dimensions.width / 253) data.forEach((project) => projectList.push(project));
	}

	return (
		<div className={styles["p-home"]}>
			<div className={styles["p-home__header"]}>
				{projectList.map((project: ProjectType, index: number) => {
					if (index % 2) {
						return <FloatingCardToLeft key={project.title + index} project={project} index={index} containerWidth={dimensions.width} containerHeight={dimensions.height} />;
					} else {
						return <FloatingCardToRight key={project.title + index} project={project} index={index} containerWidth={dimensions.width} containerHeight={dimensions.height} />;
					}
				})}
				<div className={styles["p-home__header__welcome"]}>
					<div className={styles["p-home__header__welcome__textblock"]}>
						<h1>Welkom</h1>
					</div>
				</div>
			</div>
		</div>
	);
};
