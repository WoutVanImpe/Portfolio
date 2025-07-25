import { motion, motionValue, useSpring, useTransform } from "motion/react";
import styles from "./navbar.module.scss";
import { useEffect, useState } from "react";
import classNames from "classnames";

type RefType = React.RefObject<HTMLDivElement | null>;

export const NavBar = ({ home, about, works, contact, whiteNavColor, navIndex }: { home: RefType; about: RefType; works: RefType; contact: RefType; whiteNavColor: boolean; navIndex: number }) => {
	const scrolling = useSpring(1, {
		stiffness: 80,
		damping: 20,
	});

	const [activeSection, setActiveSection] = useState("home");

	useEffect(() => {
		whiteNavColor ? scrolling.set(1) : scrolling.set(0);

		const handleScroll = () => {
			const sectionOffsets = [
				{ name: "home", top: home.current?.getBoundingClientRect().top || 0 },
				{ name: "about", top: about.current?.getBoundingClientRect().top || 0 },
				{ name: "works", top: works.current?.getBoundingClientRect().top || 0 },
				{ name: "contact", top: contact.current?.getBoundingClientRect().top || 0 },
			];

			const threshold = 100;
			const visibleSection = sectionOffsets.find((section) => section.top >= 0 && section.top < threshold);

			if (visibleSection) {
				setActiveSection(visibleSection.name);
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, [whiteNavColor, home, about, works, contact]);

	const backgroundColorState = useTransform(scrolling, [0, 1], [0, 255]);
	const backgroundTransState = useTransform(scrolling, [0, 1], [0.3, 0.15]);
	const borderColorState = useTransform(scrolling, [0, 1], [0.2, 0.3]);
	const boxShadowTransState = useTransform(scrolling, [0, 1], [0.5, 0.2]);

	const backgroundColor = useTransform(scrolling, (value) => `rgba(${backgroundColorState.get()}, ${backgroundColorState.get()}, ${backgroundColorState.get()}, ${backgroundTransState.get()})`);
	const border = useTransform(scrolling, (value) => `1px solid rgba(${backgroundColorState.get()}, ${backgroundColorState.get()}, ${backgroundColorState.get()}, ${borderColorState.get()})`);
	const boxShadow = useTransform(scrolling, (value) => `0 8px 32px 0 rgba(31, 38, 135, ${boxShadowTransState.get()})`);

	return (
		<motion.div className={styles["navbar"]} style={{ backgroundColor, border, boxShadow, zIndex: navIndex }}>
			<div className={styles["navbar__logo"]}></div>
			<div className={styles["navbar__links"]}>
				<button onClick={() => home.current?.scrollIntoView({ behavior: "smooth" })} className={classNames(activeSection === "home" ? styles["navbar__link--active"] : "")}>
					home
				</button>
				<button onClick={() => about.current?.scrollIntoView({ behavior: "smooth" })} className={classNames(activeSection === "about" ? styles["navbar__link--active"] : "")}>
					about
				</button>
				<button onClick={() => works.current?.scrollIntoView({ behavior: "smooth" })} className={classNames(activeSection === "works" ? styles["navbar__link--active"] : "")}>
					works
				</button>
				<button onClick={() => contact.current?.scrollIntoView({ behavior: "smooth" })} className={classNames(activeSection === "contact" ? styles["navbar__link--active"] : "")}>
					contact
				</button>
			</div>
		</motion.div>
	);
};
