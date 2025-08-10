import styles from "./headpage.module.scss";
import { Outlet } from "react-router";
import { DataProvider } from "~context/DataContext";
import { ObjectProvider } from "~context/ObjectContext";
import { ThemeProvider } from "~context/ThemeContext";
import { Background } from "./Background";

export const HeadPage = () => {
	return (
		<DataProvider>
			<ThemeProvider>
				<ObjectProvider>
					<Background>
						<Outlet />
					</Background>
				</ObjectProvider>
			</ThemeProvider>
		</DataProvider>
	);
};
