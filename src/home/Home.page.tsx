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
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import { useTips } from "~context/TipsContext";

export const HomePage = () => {
	/* Tips opacity */
	const { setTips } = useTips();

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "w") {
				setTips(true);
			}
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			if (e.key === "w") {
				setTips(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	/* Lamp effect */
	const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const lampOpacity = useMotionValue<number>(0);
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

	/* Navigation */
	const { width } = useWindowDimensions();
	const navPos = useMotionValue<number>(0);

	useEffect(() => {
		navPos.set(width > 1200 ? (width - 1200) / 2 : 0);
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

	const y = useTransform(smoothNav, [0, 1], [-500, -20]);

	return (
		<motion.div className={styles["p-home"]} onMouseMove={(e) => handleMouse(e)}>
			<HeaderSection ref={headerRef} />
			<AboutSection ref={aboutRef} />
			<WorksSection ref={worksRef} />
			<ContactSection ref={contactRef} />
			<motion.div className={styles["p-home__nav"]} style={{ scale: 0.8, y: y, right: navPos }} whileHover={{ translateY: "10px" }}>
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
