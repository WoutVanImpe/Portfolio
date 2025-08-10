import styles from "./carddisplay.module.scss";
import frontFrameImg from "../assets/cardholder-front.svg";
import backFrameImg from "../assets/cardholder-back.svg";
import { Postcard } from "../postcard/Postcard";
import { motion } from "motion/react";

export const CardDisplay = () => {
	return (
		<div className={styles["postcard-display-container"]}>
			<img className={styles["postcard-display-container__back"]} src={backFrameImg} alt="back of frame" />
			<motion.div
				className={styles["postcard-display-container__card"]}
				style={{ rotateX: "5deg" }}
				whileHover={{
					rotateX: "0deg",
					y: -20,
				}}
			>
				<Postcard />
			</motion.div>
			<img className={styles["postcard-display-container__front"]} src={frontFrameImg} alt="front of frame" />
		</div>
	);
};
