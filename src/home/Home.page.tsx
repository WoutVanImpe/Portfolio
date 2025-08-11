import styles from "./home.module.scss";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import light from "./assets/light.svg";
import { useObjects } from "~context/ObjectContext";
import { HeaderSection } from "./components/section-header/HeaderSection";
import { AboutSection } from "./components/section-about/AboutSection";
import { WorksSection } from "./components/section-works/WorksSection";
import { ContactSection } from "./components/section-contact/ContactSection";

export const HomePage = () => {
	const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const lampOpacity = useMotionValue(0);
	const { lamp } = useObjects();

	const smoothLamp = useSpring(lampOpacity, {
		stiffness: 20,
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
		<motion.div className={styles["p-home"]} onMouseMove={(e) => handleMouse(e)}>
			<HeaderSection />
			<AboutSection />
			<WorksSection />
			<ContactSection />
			<div className={styles["light-container"]}>
				<motion.img
					style={{
						opacity: opacity,
						position: "absolute",
						x: mousePos.x,
						y: mousePos.y,
						translateX: "-50%",
						translateY: "-50%",
						pointerEvents: "none",
						scale: scale,
						zIndex: 10,
					}}
					src={light}
					alt="light"
				/>
			</div>
		</motion.div>
	);
};
