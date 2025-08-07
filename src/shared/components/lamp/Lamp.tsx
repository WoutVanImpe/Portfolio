import styles from "./lamp.module.scss";
import lampImg from "../assets/lamp.svg";
import triggerImg from "../assets/lamp-trigger.svg";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useObjects } from "~context/ObjectContext";
import { useTheme } from "~context/ThemeContext";

export const Lamp = () => {
	const { lamp, setLamp, curtain } = useObjects();
	const { darkmode, setDarkmode } = useTheme();
	const y = useMotionValue(0);

	const smoothY = useSpring(y, {
		stiffness: 120,
		damping: 20,
		mass: 1,
	});

	const lampY = useTransform(smoothY, [0, 1], [0, 25]);

	const handleClick = () => {
		y.set(1);

		if (curtain?.get() === 0) {
			curtain.set(1);
			setDarkmode(!darkmode);
		}

		setLamp(!lamp);
		setTimeout(() => {
			y.set(0);
		}, 200);
	};

	return (
		<div className={styles["lamp-container"]}>
			<img className={styles["lamp-container__lamp"]} src={lampImg} alt="lamp" />
			<motion.div className={styles["lamp-container__trigger"]} style={{ y: lampY }} whileHover={{ translateY: "1px", scale: 1.1 }} onClick={handleClick}>
				<img src={triggerImg} alt="trigger" />
			</motion.div>
		</div>
	);
};
