import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Page } from "~app/page/Page";

const queryClient = new QueryClient();

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Page />
		</QueryClientProvider>
	);
};

export default App;
