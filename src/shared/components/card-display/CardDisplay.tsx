import styles from "./card-display.module.scss";
import frontFrameImg from "../assets/cardholder-front.svg";
import backFrameImg from "../assets/cardholder-back.svg";
import { Postcard } from "../postcard/Postcard";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export const CardDisplay = () => {
	const frameState = useMotionValue<number>(1);

	const smoothFrame = useSpring(frameState, {
		stiffness: 40,
		damping: 20,
		mass: 1,
	});

	const frameOpacity = useTransform(smoothFrame, [0, 1], [0, 1]);
	const frameScale = useTransform(smoothFrame, [0, 1], [0.5, 1]);

	return (
		<div className={styles["postcard-display-container"]}>
			<motion.img className={styles["postcard-display-container__back"]} src={backFrameImg} style={{ opacity: frameOpacity, scale: frameScale }} alt="back of frame" />
			<motion.div
				className={styles["postcard-display-container__card"]}
				style={{ rotateX: "5deg" }}
				whileHover={{
					rotateX: "0deg",
					y: -20,
				}}
			>
				<Postcard handleFrame={frameState} />
			</motion.div>
			<motion.img className={styles["postcard-display-container__front"]} src={frontFrameImg} style={{ opacity: frameOpacity, scale: frameScale }} alt="front of frame" />
		</div>
	);
};
