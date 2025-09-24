import styles from "./mailbox.module.scss";
import boxFrontImg from "../assets/mailbox-front.svg";
import boxBackImg from "../assets/mailbox-back.svg";
import boxDoorImg from "../assets/mailbox-door.svg";
import { motion, MotionValue, useAnimation, useMotionValueEvent } from "motion/react";

export const Mailbox = ({ letterReady, doorOpen }: { letterReady: MotionValue<number>; doorOpen: MotionValue<number> }) => {
	useMotionValueEvent(letterReady, "change", () => handleDoor());

	const doorControls = useAnimation();

	const handleDoor = async () => {
		await doorControls.start({
			rotateY: 150 * letterReady.get(),
			transition: { duration: 0.8, ease: "easeInOut" },
		});
		doorOpen.set(1);
	};

	return (
		<div className={styles["mailbox"]}>
			<motion.img className={styles["mailbox__front"]} src={boxFrontImg} alt="mailbox" />
			<motion.img className={styles["mailbox__back"]} src={boxBackImg} alt="mailbox" />
			<motion.img animate={doorControls} className={styles["mailbox__door"]} src={boxDoorImg} alt="mailbox" />
		</div>
	);
};
