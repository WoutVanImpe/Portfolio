import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import { useGetProjects } from "~shared/hooks/projects-data/useGetProjects.hooks";

type ProjectContextType = {
	projects: ProjectType[] | undefined;
	lamp: boolean;
	setLamp: (mode: boolean) => void;
};

const ProjectContext = createContext<ProjectContextType>({
	projects: undefined,
	lamp: false,
	setLamp: () => {},
});

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
	const { data } = useGetProjects();
	const [projects, setProjects] = useState<ProjectType[] | undefined>(undefined);
	const [lamp, setLamp] = useState<boolean>(false);

	useEffect(() => {
		setProjects(data);
	}, [data]);

	const value = useMemo(
		() => ({
			projects: projects ?? undefined,
			lamp,
			setLamp,
		}),
		[projects, lamp]
	);

	return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjects = () => useContext(ProjectContext);
