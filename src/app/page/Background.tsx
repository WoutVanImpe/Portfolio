import { motion } from "motion/react";
import styles from "./headpage.module.scss";
import { useTheme } from "~context/ThemeContext";
import classNames from "classnames";

export const Background = ({ children }: { children: React.ReactNode }) => {
	const { backgroundColor, darkmode } = useTheme();

	return (
		<motion.div className={styles["background-container"]}>
			<motion.div
				className={styles["background"]}
				animate={{
					backgroundColor: backgroundColor,
				}}
				transition={{ duration: 1, ease: "easeIn" }}
			></motion.div>
			<motion.div
				className={classNames(styles["background__pattern"], styles["background__pattern--light"])}
				animate={{
					opacity: darkmode ? 0 : 1,
				}}
				transition={{ duration: 1, ease: "easeIn" }}
			></motion.div>
			<motion.div
				className={classNames(styles["background__pattern"], styles["background__pattern--dark"])}
				animate={{
					opacity: darkmode ? 1 : 0,
				}}
				transition={{ duration: 1, ease: "easeIn" }}
			></motion.div>
			{children}
		</motion.div>
	);
};
