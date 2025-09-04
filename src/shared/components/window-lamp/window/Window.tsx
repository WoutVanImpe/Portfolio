import styles from "./window.module.scss";
import windowImg from "../../assets/window.svg";
import curtainImg from "../../assets/curtain.svg";
import railImg from "../../assets/curtain-rail.svg";
import { easeInOut, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useTheme } from "~context/ThemeContext";
import { useObjects } from "~context/ObjectContext";
import { useEffect } from "react";
import { useTips } from "~context/TipsContext";
import { Trans } from "react-i18next";

export const Window = () => {
	const { darkmode, setDarkmode, textColor } = useTheme();
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

	const { tips } = useTips();
	const tipOpac = useMotionValue(0);

	useEffect(() => {
		tips ? tipOpac.set(1) : tipOpac.set(0);
	}, [tips]);

	const smoothTip = useSpring(tipOpac, {
		stiffness: 80,
		damping: 20,
		mass: 1,
	});

	const tipOpacity = useTransform(smoothTip, [0, 1], [0, 1]);

	return (
		<div className={styles["window-container"]}>
			<div className={styles["window-container__background"]}></div>
			<img className={styles["window-container__window"]} src={windowImg} alt="window" />
			<motion.img style={{ scaleX: curtainScale }} onClick={handleClick} whileHover={{ scaleY: 0.98 }} transition={{ scaleY: { duration: 0.3, ease: easeInOut } }} className={styles["window-container__cloth"]} src={curtainImg} alt="curtain" />
			<img className={styles["window-container__rail"]} src={railImg} alt="curtain rail" />
			<motion.p animate={{ color: textColor }} style={{ opacity: tipOpacity }} transition={{ duration: 1, ease: "easeIn" }}>
				<Trans>tips.window</Trans>
			</motion.p>
		</div>
	);
};
