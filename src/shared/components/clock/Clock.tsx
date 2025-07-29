import styles from "./clock.module.scss";
import clockImg from "../assets/clock.svg";
import hourImg from "../assets/hour.svg";
import minuteImg from "../assets/minute.svg";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export const Clock = () => {
	const minutes = useMotionValue(new Date().getMinutes());
	const hour = useMotionValue(new Date().getHours() * 60 + new Date().getMinutes());

	const smoothMinutes = useSpring(minutes, {
		stiffness: 120,
		damping: 20,
		mass: 1,
	});

	const smoothHours = useSpring(hour, {
		stiffness: 120,
		damping: 20,
		mass: 1,
	});

	const minutePos = useTransform(smoothMinutes, [0, 60], [0, 360]);
	const hourPos = useTransform(smoothHours, [0, 1440], [0, 360]);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			minutes.set(now.getMinutes());
			hour.set(now.getHours() * 60 + now.getMinutes());
		}, 6000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={styles["clock-container"]}>
			<img className={styles["clock-container__clock"]} src={clockImg} alt="clock" />
			<motion.img style={{ rotate: hourPos }} className={styles["clock-container__hour"]} src={hourImg} alt="hour pointer" />
			<motion.img style={{ rotate: minutePos }} className={styles["clock-container__minute"]} src={minuteImg} alt="minute pointer" />
		</div>
	);
};
