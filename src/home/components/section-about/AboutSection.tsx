import { useTheme } from "~context/ThemeContext";
import styles from "./aboutSection.module.scss";
import { motion } from "motion/react";
import { forwardRef } from "react";

export const AboutSection = forwardRef<HTMLDivElement, {}>((props, ref) => {
	const { textColor, textBgColor, textBorderColor } = useTheme();

	return (
		<div className={styles["s-about"]} ref={ref}>
			<motion.h1 animate={{ color: textColor, backgroundColor: textBgColor, borderColor: textBorderColor }} transition={{ duration: 1, ease: "easeIn" }}>
				About
			</motion.h1>
		</div>
	);
});
