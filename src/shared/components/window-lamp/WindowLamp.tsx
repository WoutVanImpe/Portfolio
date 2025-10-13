import { Lamp } from "./lamp/Lamp";
import { Window } from "./window/Window";
import styles from "./windowLamp.module.scss";

export const WindowLamp = () => {
	return (
		<div className={styles["window-lamp-container"]}>
			<Window />
			<div className={styles["window-lamp-container__lamp"]}>
				<Lamp />
			</div>
		</div>
	);
};
