import type { Dispatch, SetStateAction } from "react";
import styles from "./weatherSection.module.scss";

export const WeatherSection = ({ setAppState }: { setAppState: Dispatch<SetStateAction<"home" | "draw" | "todo" | "weather" | "map">> }) => {
	return (
		<div className={styles["weather"]}>
			<div></div>
		</div>
	);
};
