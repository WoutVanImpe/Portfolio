import { Window } from "~shared/components/window/Window";
import styles from "./headerSection.module.scss";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import { motion, useMotionValue } from "motion/react";
import { useEffect } from "react";
import { Lamp } from "~shared/components/lamp/Lamp";
import { Globe } from "~shared/components/globe/Glode";

export const HeaderSection = () => {
	const { width } = useWindowDimensions();
	const windowScale = useMotionValue<number>(width > 1200 ? (1200 * 0.3) / 500 : (width * 0.3) / 500);
	const shelfScale = useMotionValue<number>(width > 1200 ? (1200 * 0.4) / 500 : (width * 0.4) / 500);
	const objectScale = useMotionValue<number>(width > 1200 ? (1200 * 0.15) / 200 : (width * 0.15) / 200);

	useEffect(() => {
		windowScale.set(width > 1200 ? (1200 * 0.3) / 400 : (width * 0.3) / 400);
		shelfScale.set(width > 1200 ? (1200 * 0.4) / 500 : (width * 0.4) / 500);
	}, [width]);

	return (
		<div className={styles["s-header"]}>
			<div className={styles["s-header__greet-container"]}>
				<div className={styles["s-header__greet-container__frame"]}>
					<h1>Hallo, ik ben Wout!</h1>
					<h3>Student Multimedia en Creatieve Technologie</h3>
				</div>
				<div className={styles["s-header__greet-container__shelf-container"]}>
					<div className={styles["s-header__greet-container__shelf-container__objects"]}>
						<motion.div className={styles["s-header__greet-container__shelf-container__objects__lamp"]} style={{ scale: objectScale }}>
							<Lamp />
						</motion.div>
						<motion.div className={styles["s-header__greet-container__shelf-container__objects__globe"]} style={{ scale: objectScale }}>
							<Globe />
						</motion.div>
					</div>
					<motion.div className={styles["s-header__greet-container__shelf-container__shelf"]} style={{ scale: shelfScale }}></motion.div>
				</div>
			</div>
			<div className={styles["s-header__window-container"]}>
				<motion.div className={styles["s-header__window-container__window"]} style={{ scale: windowScale }}>
					<Window />
				</motion.div>
			</div>
		</div>
	);
};
