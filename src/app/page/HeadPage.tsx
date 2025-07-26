import { Outlet } from "react-router";
import { ProjectProvider } from "../../context/ProjectContext";

export const HeadPage = () => {
	return (
		<ProjectProvider>
			<Outlet />
		</ProjectProvider>
	);
};
