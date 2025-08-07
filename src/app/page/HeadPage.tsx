import { Outlet } from "react-router";
import { DataProvider } from "~context/DataContext";
import { LampProvider } from "~context/LampContext";
import { ThemeProvider } from "~context/ThemeContext";

export const HeadPage = () => {
	return (
		<DataProvider>
			<ThemeProvider>
				<LampProvider>
					<Outlet />
				</LampProvider>
			</ThemeProvider>
		</DataProvider>
	);
};
