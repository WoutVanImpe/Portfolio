import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./drawSection.module.scss";
import { useTheme } from "~context/ThemeContext";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Canvas } from "./Canvas";

export const DrawSection = ({ setAppState }: { setAppState: Dispatch<SetStateAction<"home" | "draw" | "todo" | "weather" | "map">> }) => {
	const { textColor } = useTheme();
	const drawColor = useMotionValue(0);
	const clearCanvas = useMotionValue(false);

	const smoothColor = useSpring(drawColor, {
		stiffness: 50,
		damping: 20,
		mass: 1,
	});

	const color = useTransform(smoothColor, (value) => `hsla(${value}, 100%, 50%, 1)`);
	return (
		<div className={styles["draw"]}>
			<Canvas color={color.get()} clearCanvas={clearCanvas} />
			<div className={styles["draw__controls"]}>
				<motion.div className={styles["draw__controls__color"]} style={{ backgroundColor: color }}></motion.div>
				<motion.input type="range" defaultValue={0} min={0} max={360} onChange={(e: ChangeEvent<HTMLInputElement>) => drawColor.set(Number(e.target.value))} />
				<motion.svg onClick={() => clearCanvas.set(true)} animate={{ fill: textColor }} transition={{ duration: 1, ease: "easeIn" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
				</motion.svg>
			</div>
			<motion.svg
				onClick={() => {
					setAppState("home");
					drawColor.set(0);
				}}
				animate={{ fill: textColor }}
				transition={{ duration: 1, ease: "easeIn" }}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 640 640"
			>
				<path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
			</motion.svg>
		</div>
	);
};
