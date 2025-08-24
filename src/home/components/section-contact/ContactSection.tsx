import { motion } from "motion/react";
import styles from "./contactSection.module.scss";
import { useTheme } from "~context/ThemeContext";
import { forwardRef } from "react";

export const ContactSection = forwardRef<HTMLDivElement, {}>((props, ref) => {
	const { textColor, textBgColor, textBorderColor } = useTheme();

	return (
		<div className={styles["s-contact"]} ref={ref}>
			<motion.h1 animate={{ color: textColor, backgroundColor: textBgColor, borderColor: textBorderColor }} transition={{ duration: 1, ease: "easeIn" }}>
				Contact
			</motion.h1>
		</div>
	);
});
