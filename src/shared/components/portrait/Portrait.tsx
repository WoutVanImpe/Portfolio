import { motion, useMotionValue, useTransform } from "motion/react";
import styles from "./portrait.module.scss";
import portraitImg from "../assets/portrait.svg";
import eyeImg from "../assets/eye.svg";
import classNames from "classnames";
import { useTheme } from "~context/ThemeContext";

export const Portrait = () => {
	const { textColor, textBgColor, textBorderColor } = useTheme();

	const mouseX = useMotionValue<number>(280);
	const mouseY = useMotionValue<number>(165);

	const handleMouse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		mouseX.set(e.clientX);
		mouseY.set(e.clientY);
	};

	const leftEyeX = useTransform(mouseX, [0, 227, 600], [-10, 0, 10]);
	const rightEyeX = useTransform(mouseX, [0, 305, 600], [-10, 0, 10]);

	const leftEyeY = useTransform(mouseY, [0, 169, 680], [-5, 0, 5]);
	const rightEyeY = useTransform(mouseY, [0, 160, 680], [-5, 0, 5]);

	return (
		<motion.div className={styles["portrait-container"]} onMouseMove={(e) => handleMouse(e)} animate={{ color: textColor, backgroundColor: textBgColor, borderColor: textBorderColor }} transition={{ duration: 1, ease: "easeIn" }}>
			<img className={styles["portrait-container__portrait"]} src={portraitImg} alt="portrait" />
			<div className={classNames(styles["portrait-container__eye-container"], styles["portrait-container__eye-container--left"])}>
				<motion.img style={{ x: leftEyeX, y: leftEyeY }} src={eyeImg} alt="eye" />
			</div>
			<div className={classNames(styles["portrait-container__eye-container"], styles["portrait-container__eye-container--right"])}>
				<motion.img style={{ x: rightEyeX, y: rightEyeY }} src={eyeImg} alt="eye" />
			</div>
		</motion.div>
	);
};
