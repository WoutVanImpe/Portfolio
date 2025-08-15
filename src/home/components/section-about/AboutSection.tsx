import { useTheme } from "~context/ThemeContext";
import styles from "./aboutSection.module.scss";
import { motion } from "motion/react";

export const AboutSection = () => {
	const { textColor, textBgColor, textBorderColor } = useTheme();

	return (
		<div className={styles["s-about"]}>
			<motion.h1 animate={{ color: textColor, backgroundColor: textBgColor, borderColor: textBorderColor }} transition={{ duration: 1, ease: "easeIn" }}>
				About
			</motion.h1>
		</div>
	);
};
