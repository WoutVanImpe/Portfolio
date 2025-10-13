import styles from "./app.module.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createHashRouter, RouterProvider } from "react-router";
import { HeadPage } from "~app/page/HeadPage";
import { HOME_ROUTE, NO_ROUTE, PROJECT_ROUTE } from "~shared/routes/routes";
import "../../shared/i18n/config";

const queryClient = new QueryClient();

export const App = () => {
	const router = createHashRouter([
		{
			path: "/",
			element: <HeadPage />,
			children: [
				{ path: HOME_ROUTE.path, element: HOME_ROUTE.element },
				{ path: PROJECT_ROUTE.path, element: PROJECT_ROUTE.element },
				{ path: NO_ROUTE.path, element: NO_ROUTE.element },
			],
		},
	]);
	return (
		<div className={styles[""]}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</div>
	);
};

export default App;
