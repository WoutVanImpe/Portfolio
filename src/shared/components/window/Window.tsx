import styles from "./window.module.scss";
import windowImg from "../assets/window.svg";
import curtainImg from "../assets/curtain.svg";
import railImg from "../assets/curtain-rail.svg";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useProjects } from "~context/ProjectContext";

export const Window = () => {
	const { darkmode, setDarkmode } = useProjects();
	const curtainScale = useMotionValue(0);

	const smoothCurtain = useSpring(curtainScale, {
		stiffness: 120,
		damping: 20,
		mass: 1,
	});

	const handleClick = () => {
		curtainScale.set(curtainScale.get() === 1 ? 0 : 1);
		setDarkmode(!darkmode);
	};

	const scale = useTransform(smoothCurtain, [0, 1], [0.2, 1]);

	return (
		<div className={styles["window-container"]}>
			<img className={styles["window-container__window"]} src={windowImg} alt="window" />
			<motion.img style={{ scaleX: scale }} onClick={handleClick} className={styles["window-container__cloth"]} src={curtainImg} alt="curtain" />
			<img className={styles["window-container__rail"]} src={railImg} alt="curtain rail" />
		</div>
	);
};
