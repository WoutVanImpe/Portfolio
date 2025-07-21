import { forwardRef } from "react";
import styles from "./projects.module.scss";
import type ProjectType from "~shared/hooks/projects-data/project.types";

interface ProjectListProps {
	projects: ProjectType[];
}

export const Projects = forwardRef<HTMLDivElement, ProjectListProps>(({ projects }, ref) => {
	return (
		<div ref={ref}>
			<h1>Projects</h1>
		</div>
	);
});
