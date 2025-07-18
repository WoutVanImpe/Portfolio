import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HOME_ROUTE, CONTACT_ROUTE, PROJECTS_ROUTE } from "~shared/routes/routes";
import { createHashRouter, RouterProvider } from "react-router";
import App from "~app/App/App";

const queryClient = new QueryClient();

export const Root = () => {
	const router = createHashRouter([
		{
			path: "/",
			element: <App />,
			children: [
				{ path: HOME_ROUTE.path, element: HOME_ROUTE.element },
				{ path: CONTACT_ROUTE.path, element: CONTACT_ROUTE.element },
				{ path: PROJECTS_ROUTE.path, element: PROJECTS_ROUTE.element },
				{ path: "*", element: <h1>404: Page not found</h1> },
			],
		},
	]);

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
};
