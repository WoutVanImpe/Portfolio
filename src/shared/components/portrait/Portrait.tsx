import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import styles from "./portrait.module.scss";
import portraitImg from "../assets/portrait.svg";
import eyeImg from "../assets/eye.svg";
import classNames from "classnames";
import { useTheme } from "~context/ThemeContext";

export const Portrait = ({ scale }: { scale: number }) => {
	const { textColor, textBgColor, textBorderColor } = useTheme();

	const mouseX = useMotionValue<number>(380 * scale);
	const mouseY = useMotionValue<number>(250 * scale);

	const handleMouse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
		mouseX.set(e.clientX - rect.left);
		mouseY.set(e.clientY - rect.top);
	};

	const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 1 });
	const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 1 });

	const leftEyeX = useTransform(smoothX, [0, 312 * scale, 600 * scale], [-15, 0, 10]);
	const rightEyeX = useTransform(smoothX, [0, 457 * scale, 600 * scale], [-10, 0, 10]);

	const leftEyeY = useTransform(smoothY, [0, 244 * scale, 692 * scale], [-5, 0, 5]);
	const rightEyeY = useTransform(smoothY, [0, 263 * scale, 692 * scale], [-5, 0, 5]);

	return (
		<motion.div
			className={styles["portrait-container"]}
			onMouseMove={handleMouse}
			animate={{
				color: textColor,
				backgroundColor: textBgColor,
				borderColor: textBorderColor,
			}}
			transition={{ duration: 1, ease: "easeIn" }}
		>
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
