import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createHashRouter, RouterProvider } from "react-router";
import { Page } from "~app/page/Page";
import { NO_ROUTE, PROJECT_ROUTE } from "~shared/routes/routes";

const queryClient = new QueryClient();

export const App = () => {
	const router = createHashRouter([
		{
			path: "/",
			element: <Page />,
			children: [
				{ path: PROJECT_ROUTE.path, element: PROJECT_ROUTE.element },
				{ path: NO_ROUTE.path, element: NO_ROUTE.element },
			],
		},
	]);
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
};

export default App;
