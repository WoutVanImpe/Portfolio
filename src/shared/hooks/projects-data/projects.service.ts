import type ProjectType from "./project.types";
import file from "../../data/projects.json";

class ProjectService {
	async getProjects(): Promise<ProjectType[]> {
		return file as ProjectType[];
	}
}

export const projectService = new ProjectService();
