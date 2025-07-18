import { Outlet } from "react-router";
import styles from "./app.module.scss";

export const App = () => {
	return (
		<div className={styles["app"]}>
			<Outlet />
		</div>
	);
};

export default App;
