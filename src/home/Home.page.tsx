import styles from "./home.module.scss";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import light from "./assets/light.svg";
import { useObjects } from "~context/ObjectContext";
import { HeaderSection } from "./components/section-header/HeaderSection";
import { AboutSection } from "./components/section-about/AboutSection";
import { WorksSection } from "./components/section-works/WorksSection";
import { ContactSection } from "./components/section-contact/ContactSection";
import { Navigation } from "./components/navigation/Navigation";

export const HomePage = () => {
	const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const lampOpacity = useMotionValue<number>(0);
	const { lamp } = useObjects();

	const smoothLamp = useSpring(lampOpacity, {
		stiffness: 20,
		damping: 20,
		mass: 1,
	});

	const headerRef = useRef<HTMLDivElement | null>(null);
	const aboutRef = useRef<HTMLDivElement | null>(null);
	const worksRef = useRef<HTMLDivElement | null>(null);
	const contactRef = useRef<HTMLDivElement | null>(null);

	const navY = useMotionValue<number>(0);

	const smoothNav = useSpring(navY, {
		stiffness: 80,
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

	const y = useTransform(smoothNav, [0, 1], [-550, -20]);

	return (
		<motion.div className={styles["p-home"]} onMouseMove={(e) => handleMouse(e)}>
			<HeaderSection ref={headerRef} />
			<AboutSection ref={aboutRef} />
			<WorksSection ref={worksRef} />
			<ContactSection ref={contactRef} />
			<motion.div className={styles["p-home__nav"]} style={{ scale: 0.8, y: y }} whileHover={{ translateY: "10px" }}>
				<Navigation home={headerRef} about={aboutRef} works={worksRef} contact={contactRef} y={navY} />
			</motion.div>
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
