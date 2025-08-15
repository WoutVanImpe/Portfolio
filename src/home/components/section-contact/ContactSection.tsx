import { motion } from "motion/react";
import styles from "./contactSection.module.scss";
import { useTheme } from "~context/ThemeContext";

export const ContactSection = () => {
	const { textColor, textBgColor, textBorderColor } = useTheme();

	return (
		<div className={styles["s-contact"]}>
			<motion.h1 animate={{ color: textColor, backgroundColor: textBgColor, borderColor: textBorderColor }} transition={{ duration: 1, ease: "easeIn" }}>
				Contact
			</motion.h1>
		</div>
	);
};
