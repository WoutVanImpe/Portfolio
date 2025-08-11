import { Window } from "~shared/components/window/Window";
import frameImg from "../../../shared/components/assets/frame.svg";
import styles from "./headerSection.module.scss";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import { motion, useMotionValue } from "motion/react";
import { useEffect } from "react";

export const HeaderSection = () => {
	const { width } = useWindowDimensions();
	const windowScale = useMotionValue<number>(width > 1200 ? (1200 * 0.3) / 400 : (width * 0.3) / 400);

	useEffect(() => {
		windowScale.set(width > 1200 ? (1200 * 0.3) / 400 : (width * 0.3) / 400);
	}, [width]);

	return (
		<div className={styles["s-header"]}>
			<div className={styles["s-header__greet-container"]}>
				<div className={styles["s-header__greet-container__frame"]}>
					<h1>Hallo, ik ben Wout!</h1>
					<h3>Student Multimedia en Creatieve Technologie</h3>
				</div>
			</div>
			<div className={styles["s-header__objects-container"]}>
				<motion.div className={styles["s-header__objects-container__window"]} style={{ scale: windowScale }}>
					<Window />
				</motion.div>
			</div>
		</div>
	);
};
