import styles from "./phone.module.scss";
import { motion, MotionValue, useSpring, useTransform } from "motion/react";
import { useTheme } from "~context/ThemeContext";

export const Screen = ({ screenState }: { screenState: MotionValue<number> }) => {
	const { textBgColor } = useTheme();

	const smoothPower = useSpring(screenState, {
		stiffness: 80,
		damping: 20,
		mass: 1,
	});

	const screenOpacity = useTransform(smoothPower, [0, 1], [0, 0.9]);

	return (
		<motion.div className={styles["screen"]} style={{ opacity: screenOpacity }} animate={{ backgroundColor: textBgColor }} transition={{ duration: 1, ease: "easeIn" }}>
			<div></div>
		</motion.div>
	);
};
 