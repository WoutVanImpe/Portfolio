import { motion } from "motion/react";
import styles from "./headpage.module.scss";
import { useTheme } from "~context/ThemeContext";

export const Background = ({ children }: { children: React.ReactNode }) => {
	const { backgroundColor, patternColor } = useTheme();

	return (
		<motion.div
			className={styles["background"]}
			animate={{
				backgroundColor: backgroundColor,
				backgroundImage: `radial-gradient(${patternColor} 10%, transparent 10%), radial-gradient(${patternColor} 10%, transparent 10%)`,
			}}
			transition={{ duration: 1, ease: "easeIn" }}
		>
			{children}
		</motion.div>
	);
};
