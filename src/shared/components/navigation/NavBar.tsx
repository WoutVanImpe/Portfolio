import { motion, motionValue, useSpring, useTransform } from "motion/react";
import styles from "./navbar.module.scss";
import { useEffect } from "react";

type RefType = React.RefObject<HTMLDivElement | null>;

export const NavBar = ({ home, about, works, contact, whiteNavColor, navIndex }: { home: RefType; about: RefType; works: RefType; contact: RefType; whiteNavColor: boolean; navIndex: boolean }) => {
	const scrolling = useSpring(1, {
		stiffness: 80,
		damping: 20,
	});

	const index = motionValue(2);

	useEffect(() => {
		whiteNavColor ? scrolling.set(1) : scrolling.set(0);
		navIndex ? index.set(2) : index.set(10);
	}, [whiteNavColor, navIndex]);

	const backgroundColorState = useTransform(scrolling, [0, 1], [0, 255]);
	const backgroundTransState = useTransform(scrolling, [0, 1], [0.3, 0.15]);
	const borderColorState = useTransform(scrolling, [0, 1], [0.2, 0.3]);
	const boxShadowTransState = useTransform(scrolling, [0, 1], [0.5, 0.2]);

	const backgroundColor = useTransform(scrolling, (value) => `rgba(${backgroundColorState.get()}, ${backgroundColorState.get()}, ${backgroundColorState.get()}, ${backgroundTransState.get()})`);
	const border = useTransform(scrolling, (value) => `1px solid rgba(${backgroundColorState.get()}, ${backgroundColorState.get()}, ${backgroundColorState.get()}, ${borderColorState.get()})`);
	const boxShadow = useTransform(scrolling, (value) => `0 8px 32px 0 rgba(31, 38, 135, ${boxShadowTransState.get()})`);

	return (
		<motion.div className={styles["navbar"]} style={{ backgroundColor, border, boxShadow, zIndex: index }}>
			<div className={styles["navbar__logo"]}></div>
			<div className={styles["navbar__links"]}>
				<button onClick={() => home.current?.scrollIntoView({ behavior: "smooth" })}>home</button>
				<button onClick={() => about.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>about</button>
				<button onClick={() => works.current?.scrollIntoView({ behavior: "smooth" })}>works</button>
				<button onClick={() => contact.current?.scrollIntoView({ behavior: "smooth" })}>contact</button>
			</div>
		</motion.div>
	);
};
