import styles from "./globe.module.scss";
import globeImg from "../assets/globe.svg";
import baseImg from "../assets/globe-base.svg";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState } from "react";

interface Globe {
	rotate: number;
	filter: string;
	transition?: {
		rotate: {
			duration: number;
			ease: "easeIn";
			repeat: number;
		};
	};
}

export const Globe = () => {
	const [styleNumber, setStyleNumber] = useState<0 | 1>(0);
	const opacityVal = useMotionValue<number>(0);
	const indexVal = useMotionValue<number>(1);

	const smoothDisplay = useSpring(opacityVal, {
		stiffness: 50,
		damping: 20,
		mass: 1,
	});

	const smoothIndex = useSpring(indexVal, {
		stiffness: 25,
		damping: 20,
		mass: 1,
	});

	const langDisplay = useTransform(smoothDisplay, [0, 1], [0, 1]);
	const langIndex = useTransform(smoothIndex, [1, 3], [1, 3]);

	const handleClick = () => {
		setStyleNumber(styleNumber === 0 ? 1 : 0);
		opacityVal.set(opacityVal.get() === 0 ? 1 : 0);
		indexVal.set(indexVal.get() === 1 ? 3 : 1);
	};

	const styleVariants: Record<string, Globe> = {
		"0": { rotate: 0, filter: "blur(0px)" },
		"1": { rotate: 360, filter: "blur(3px)", transition: { rotate: { duration: 0.2, ease: "easeIn", repeat: Infinity } } },
	};

	return (
		<div className={styles["globe-container"]}>
			<img className={styles["globe-container__base"]} src={baseImg} alt="globe base" />
			<motion.img
				animate={{ rotate: styleVariants[styleNumber].rotate, filter: styleVariants[styleNumber].filter, transition: styleVariants[styleNumber].transition }}
				className={styles["globe-container__globe"]}
				src={globeImg}
				alt="globe"
				whileHover={{
					rotate: 360,
					filter: "blur(3px)",
					transition: {
						rotate: {
							duration: 0.2,
							ease: "easeIn",
							repeat: Infinity,
						},
					},
				}}
				onClick={handleClick}
			/>
			<motion.div style={{ opacity: langDisplay, zIndex: langIndex }} className={styles["globe-container__lang"]}>
				<p>Nederlands</p>
				<p>English</p>
			</motion.div>
		</div>
	);
};
