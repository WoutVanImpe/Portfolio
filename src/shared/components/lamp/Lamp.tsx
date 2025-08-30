import styles from "./lamp.module.scss";
import lampImg from "../assets/lamp.svg";
import triggerImg from "../assets/lamp-trigger.svg";
import lampOnImg from "../assets/lamp-on.svg";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useObjects } from "~context/ObjectContext";
import { useTheme } from "~context/ThemeContext";
import { useEffect } from "react";
import { useTips } from "~context/TipsContext";
import { Trans } from "react-i18next";

export const Lamp = () => {
	const { lamp, setLamp, curtain } = useObjects();
	const { darkmode, setDarkmode, textColor } = useTheme();
	const y = useMotionValue(0);
	const lightOpacity = useMotionValue(1);

	useEffect(() => {
		if (!lamp) {
			lightOpacity.set(1);
		}
	}, [lamp]);

	const smoothY = useSpring(y, {
		stiffness: 120,
		damping: 20,
		mass: 1,
	});

	const smoothLight = useSpring(lightOpacity, {
		stiffness: 80,
		damping: 20,
		mass: 1,
	});

	const lampOpacity = useTransform(smoothLight, [0, 1], [0, 1]);
	const lampY = useTransform(smoothY, [0, 1], [0, 25]);

	const handleClick = () => {
		y.set(1);

		if (curtain?.get() === 0) {
			curtain.set(1);
			setDarkmode(!darkmode);
		}

		lightOpacity.set(lightOpacity.get() === 1 ? 0 : 1);
		setLamp(!lamp);
		setTimeout(() => {
			y.set(0);
		}, 200);
	};

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
		<div className={styles["lamp-container"]}>
			<img className={styles["lamp-container__lamp"]} src={lampImg} alt="lamp" />
			<motion.div className={styles["lamp-container__trigger"]} style={{ y: lampY }} whileHover={{ translateY: "1px", scale: 1.1 }} onClick={handleClick}>
				<img src={triggerImg} alt="trigger" />
			</motion.div>
			<motion.img className={styles["lamp-container__lampcap"]} style={{ opacity: lampOpacity }} src={lampOnImg} alt="lampkap" />
			<motion.p animate={{ color: textColor }} style={{ opacity: tipOpacity }} transition={{ duration: 1, ease: "easeIn" }}>
				<Trans>tips.lamp</Trans>
			</motion.p>
		</div>
	);
};
