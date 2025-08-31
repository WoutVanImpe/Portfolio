import styles from "./phone.module.scss";
import { motion, MotionValue, useSpring, useTransform } from "motion/react";
import { useState } from "react";
import { useTheme } from "~context/ThemeContext";
import { DrawSection } from "./section-draw/DrawSection";
import { HomeSection } from "./section-home/HomeSection";
import { TodoSection } from "./section-todo/TodoSection";
import { WeatherSection } from "./section-weather/WeatherSection";
import { MapSection } from "./section-map/MapSection";

export const Screen = ({ screenState }: { screenState: MotionValue<number> }) => {
	const [appState, setAppState] = useState<"home" | "draw" | "todo" | "weather" | "map">("home");
	const { textBgColor } = useTheme();

	const smoothPower = useSpring(screenState, {
		stiffness: 150,
		damping: 20,
		mass: 1,
	});

	const screenOpacity = useTransform(smoothPower, [0, 1], [0, 0.9]);

	return (
		<motion.div className={styles["screen"]} style={{ opacity: screenOpacity }} animate={{ backgroundColor: textBgColor }} transition={{ duration: 1, ease: "easeIn" }}>
			{appState === "home" && <HomeSection setAppState={setAppState} />}

			{appState === "draw" && <DrawSection setAppState={setAppState} />}

			{appState === "todo" && <TodoSection setAppState={setAppState} />}

			{appState === "weather" && <WeatherSection setAppState={setAppState} />}

			{appState === "map" && <MapSection setAppState={setAppState} />}
		</motion.div>
	);
};
