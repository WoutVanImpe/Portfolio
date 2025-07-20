import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styles from "./app.module.scss";
import { Home } from "~home/Home.page";

const queryClient = new QueryClient();

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<div className={styles["app"]}>
				<Home />
			</div>
		</QueryClientProvider>
	);
};

export default App;
