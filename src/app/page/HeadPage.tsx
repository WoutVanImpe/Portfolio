import { Outlet } from "react-router";
import { DataProvider } from "~context/DataContext";
import { ObjectProvider } from "~context/ObjectContext";
import { ThemeProvider } from "~context/ThemeContext";

export const HeadPage = () => {
	return (
		<DataProvider>
			<ThemeProvider>
				<ObjectProvider>
					<Outlet />
				</ObjectProvider>
			</ThemeProvider>
		</DataProvider>
	);
};
