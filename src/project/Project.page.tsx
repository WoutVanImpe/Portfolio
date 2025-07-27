import { useParams } from "react-router";
import styles from "./project.module.scss";
import { useProjects } from "~context/ProjectContext";
import { PageTitle } from "~shared/hooks/page-title/PageTitle";
import { ProjectContent } from "./components/project-content/ProjectContent";

export const Project = () => {
	const { id } = useParams<{ id: string }>();
	const { projects } = useProjects();

	if (projects) {
		if (id) {
			const project = projects.find((p) => p.id === parseInt(id));
			return (
				<>
					<PageTitle title={`Wout Van Impe | ${project?.title}`} />
					<ProjectContent {...project} />
				</>
			);
		}
	}

	return <div></div>;
};
