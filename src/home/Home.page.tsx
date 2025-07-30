import { Lamp } from "~shared/components/lamp/Lamp";
import styles from "./home.module.scss";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import light from "./assets/light.svg";
import { useProjects } from "~context/ProjectContext";
import { Clock } from "~shared/components/clock/Clock";
import { Globe } from "~shared/components/globe/Glode";

export const HomePage = () => {
	const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const lampOpacity = useMotionValue(0);
	const { lamp } = useProjects();

	const smoothLamp = useSpring(lampOpacity, {
		stiffness: 120,
		damping: 20,
		mass: 1,
	});

	const handleMouse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setMousePos({ x: e.clientX, y: e.clientY });
	};

	useEffect(() => {
		lamp ? lampOpacity.set(1) : lampOpacity.set(0);
	}, [lamp]);

	const opacity = useTransform(smoothLamp, [0, 1], [0, 1]);
	const scale = useTransform(smoothLamp, [0, 1], [20, 8]);

	return (
		<motion.div
			className={styles["playfield"]}
			onMouseMove={(e) => {
				handleMouse(e);
			}}
		>
			<Globe />
			{/* <Clock /> */}
			{/* <Lamp /> */}
			<motion.img
				style={{
					opacity: opacity,
					position: "absolute",
					x: mousePos.x,
					y: mousePos.y,
					translateX: "-50%",
					translateY: "-30%",
					pointerEvents: "none",
					scale: scale,
					zIndex: 10,
				}}
				src={light}
				alt="light"
			/>
		</motion.div>
	);
};
