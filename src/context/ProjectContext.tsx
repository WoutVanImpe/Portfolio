import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import { useGetProjects } from "~shared/hooks/projects-data/useGetProjects.hooks";

type ProjectContextType = {
	projects: ProjectType[] | undefined;
	lamp: boolean;
	setLamp: (mode: boolean) => void;
	darkmode: boolean;
	setDarkmode: (mode: boolean) => void;
	backgroundColor: "#fff" | "#1b1a1aff";
	setBackgroundColor: (mode: "#fff" | "#1b1a1aff") => void;
};

const ProjectContext = createContext<ProjectContextType>({
	projects: undefined,
	lamp: false,
	setLamp: () => {},
	darkmode: false,
	setDarkmode: () => {},
	backgroundColor: "#fff",
	setBackgroundColor: () => {},
});

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
	const { data } = useGetProjects();
	const [projects, setProjects] = useState<ProjectType[] | undefined>(undefined);
	const [lamp, setLamp] = useState<boolean>(false);
	const [darkmode, setDarkmode] = useState<boolean>(false);
	const [backgroundColor, setBackgroundColor] = useState<"#fff" | "#1b1a1aff">("#fff");

	useEffect(() => {
		setProjects(data);
	}, [data]);

	useEffect(() => {
		setBackgroundColor(darkmode ? "#1b1a1aff" : "#fff");
	}, [darkmode]);

	const value = useMemo(
		() => ({
			projects: projects ?? undefined,
			lamp,
			setLamp,
			darkmode,
			setDarkmode,
			backgroundColor,
			setBackgroundColor,
		}),
		[projects, lamp, darkmode, backgroundColor]
	);

	return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjects = () => useContext(ProjectContext);
