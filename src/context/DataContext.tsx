import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import { useGetProjects } from "~shared/hooks/projects-data/useGetProjects.hooks";

type DataContextType = {
    projects: ProjectType[] | undefined;
};

const DataContext = createContext<DataContextType>({
    projects: undefined,
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
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

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
