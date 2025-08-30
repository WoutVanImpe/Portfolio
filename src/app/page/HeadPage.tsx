import styles from "./headpage.module.scss";
import { Outlet } from "react-router";
import { DataProvider } from "~context/DataContext";
import { ObjectProvider } from "~context/ObjectContext";
import { ThemeProvider } from "~context/ThemeContext";
import { Background } from "./Background";
import { TipsProvider } from "~context/TipsContext";

export const HeadPage = () => {
	return (
		<DataProvider>
			<ThemeProvider>
				<TipsProvider>
					<ObjectProvider>
						<Background>
							<Outlet />
						</Background>
					</ObjectProvider>
				</TipsProvider>
			</ThemeProvider>
		</DataProvider>
	);
};
