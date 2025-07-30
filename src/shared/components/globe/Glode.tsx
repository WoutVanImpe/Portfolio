import styles from "./globe.module.scss";
import globeImg from "../assets/globe.svg";
import baseImg from "../assets/globe-base.svg";
import { motion } from "motion/react";

export const Globe = () => {
	return (
		<div className={styles["globe-container"]}>
			<img className={styles["globe-container__base"]} src={baseImg} alt="globe base" />
			<motion.img
				className={styles["globe-container__globe"]}
				src={globeImg}
				alt="globe"
				whileHover={{
					rotate: 360,
					filter: "blur(4px)",
					transition: {
						rotate: {
							duration: 0.2,
							ease: "easeIn",
							repeat: Infinity,
						},
					},
				}}
			/>
		</div>
	);
};
