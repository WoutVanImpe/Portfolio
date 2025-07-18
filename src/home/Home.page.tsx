import { ProjectCard } from "~shared/components/project-card/ProjectCard";
import styles from "./home.module.scss";
import testImg from "../assets/testimg.jpg"; // pas aan indien nodig
import { useGetProjects } from "~shared/hooks/useGetProjects.hooks";
import type ProjectType from "~shared/hooks/project.types";

export const Home = () => {
	const { data } = useGetProjects();

	return (
		<div className={styles["p-home"]}>
			<header className={styles["p-home__header"]}>
				{data?.map((project: ProjectType) => (
					<ProjectCard key={project.title} title={project.title} image={testImg} tags={project.tags} />
				))}
			</header>
		</div>
	);
};
