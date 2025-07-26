import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import { useGetProjects } from "~shared/hooks/projects-data/useGetProjects.hooks";

type ProjectContextType = {
	projects: ProjectType[] | undefined;
};

const ProjectContext = createContext<ProjectContextType>({
	projects: undefined,
});

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
	const { data } = useGetProjects();
	const [projects, setProjects] = useState<ProjectType[] | undefined>(undefined);

	useEffect(() => {
		setProjects(data);
	}, [data]);

	const value = useMemo(
		() => ({
			projects: projects ?? undefined,
		}),
		[projects]
	);

	return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjects = () => useContext(ProjectContext);
