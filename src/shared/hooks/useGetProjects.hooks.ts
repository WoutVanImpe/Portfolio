import { useQuery } from "@tanstack/react-query";
import type ProjectType from "./project.types";
import { projectService } from "./projects.service";

export const useGetProjects = () => {
	return useQuery<ProjectType[], Error>({
		queryKey: ["project"],
		queryFn: projectService.getProjects,
	});
};
