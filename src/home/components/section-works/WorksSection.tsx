import { CardDisplay } from "~shared/components/card-display/CardDisplay";
import styles from "./worksSection.module.scss";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import { motion, useMotionValue } from "motion/react";
import { useEffect } from "react";

export const WorksSection = () => {
	const { width } = useWindowDimensions();
	const cardScale = useMotionValue<number>(width > 1200 ? (1200 * 0.48) / 650 : (width * 0.48) / 650);

	useEffect(() => {
		cardScale.set(width > 1200 ? (1200 * 0.48) / 650 : (width * 0.48) / 650);
	}, [width]);

	return (
		<div className={styles["s-works"]}>
			<h1>Works</h1>
			<motion.div className={styles["s-works__works-container"]}>
				<motion.div className={styles["s-works__works-container__card-container"]} style={{ scale: cardScale }}>
					<CardDisplay />
				</motion.div>
				<motion.div className={styles["s-works__works-container__card-container"]} style={{ scale: cardScale }}>
					<CardDisplay />
				</motion.div>
				<motion.div className={styles["s-works__works-container__card-container"]} style={{ scale: cardScale }}>
					<CardDisplay />
				</motion.div>
			</motion.div>
		</div>
	);
};
