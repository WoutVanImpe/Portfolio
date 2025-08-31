import type { Dispatch, SetStateAction } from "react";
import styles from "./mapSection.module.scss";

export const MapSection = ({ setAppState }: { setAppState: Dispatch<SetStateAction<"home" | "draw" | "todo" | "weather" | "map">> }) => {
	return (
		<div className={styles["map"]}>
			<div></div>
		</div>
	);
};
