import styles from "./window.module.scss";
import windowImg from "../assets/window.svg";
import curtainImg from "../assets/curtain.svg";
import railImg from "../assets/curtain-rail.svg";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useTheme } from "~context/ThemeContext";
import { useObjects } from "~context/ObjectContext";
import { useEffect } from "react";

export const Window = () => {
	const { darkmode, setDarkmode } = useTheme();
	const { curtain, lamp, setLamp } = useObjects();
	const curtainState = useMotionValue(0);

	useEffect(() => {
		if (curtain) {
			curtainState.set(curtain.get());
		}
	}, [curtain?.get()]);

	const handleClick = () => {
		curtain?.set(curtain.get() === 1 ? 0 : 1);
		setDarkmode(!darkmode);
		if (lamp === true) {
			setLamp(false);
		}
	};

	const smoothCurtain = useSpring(curtainState, {
		stiffness: 60,
		damping: 20,
		mass: 1,
	});

	const curtainScale = useTransform(smoothCurtain, [0, 1], [0.2, 1]);

	return (
		<div className={styles["window-container"]}>
			<div className={styles["window-container__background"]}></div>
			<img className={styles["window-container__window"]} src={windowImg} alt="window" />
			<motion.img style={{ scaleX: curtainScale }} onClick={handleClick} className={styles["window-container__cloth"]} src={curtainImg} alt="curtain" />
			<img className={styles["window-container__rail"]} src={railImg} alt="curtain rail" />
		</div>
	);
};
