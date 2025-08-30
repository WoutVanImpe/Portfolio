import styles from "./navigation.module.scss";
import navBgImg from "../../../shared/components/assets/nav-drawer.svg";
import book1Img from "../../../shared/components/assets/nav-option1.svg";
import book2Img from "../../../shared/components/assets/nav-option2.svg";
import book3Img from "../../../shared/components/assets/nav-option3.svg";
import book4Img from "../../../shared/components/assets/nav-option4.svg";
import { Globe } from "~shared/components/globe/Glode";
import { motion, MotionValue } from "motion/react";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Trans } from "react-i18next";

type RefType = React.RefObject<HTMLDivElement | null>;

export const Navigation = ({ home, about, works, contact, y }: { home: RefType; about: RefType; works: RefType; contact: RefType; y: MotionValue<number> }) => {
	const handleStateClick = () => {
		y.set(y.get() === 0 ? 1 : 0);
	};

	const [activeSection, setActiveSection] = useState("home");

	useEffect(() => {
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
	}, [home, about, works, contact]);

	return (
		<div className={styles["navigation-container"]}>
			<img className={styles["navigation-container__bg"]} src={navBgImg} alt="drawer" />
			<div className={styles["navigation-container__globe-container"]}>
				<Globe />
			</div>
			<div className={styles["navigation-container__options-container"]}>
				<motion.div
					className={styles["navigation-container__options-container__option"]}
					whileHover={{ scale: 1.1 }}
					onClick={() => {
						home.current?.scrollIntoView({ behavior: "smooth" });
						y.set(0);
					}}
				>
					<h5><Trans>nav.home</Trans></h5>
					<p className={classNames(activeSection === "home" ? styles["actif-nav"] : "")}><Trans>nav.home</Trans></p>
					<img src={book1Img} alt="home option" />
				</motion.div>
				<motion.div
					className={styles["navigation-container__options-container__option"]}
					whileHover={{ scale: 1.1 }}
					onClick={() => {
						about.current?.scrollIntoView({ behavior: "smooth" });
						y.set(0);
					}}
				>
					<h5><Trans>nav.about</Trans></h5>
					<p className={classNames(activeSection === "about" ? styles["actif-nav"] : "")}><Trans>nav.about</Trans></p>
					<img src={book2Img} alt="about option" />
				</motion.div>
				<motion.div
					className={styles["navigation-container__options-container__option"]}
					whileHover={{ scale: 1.1 }}
					onClick={() => {
						works.current?.scrollIntoView({ behavior: "smooth" });
						y.set(0);
					}}
				>
					<h5><Trans>nav.works</Trans></h5>
					<p className={classNames(activeSection === "works" ? styles["actif-nav"] : "")}><Trans>nav.works</Trans></p>
					<img src={book3Img} alt="works option" />
				</motion.div>
				<motion.div
					className={styles["navigation-container__options-container__option"]}
					whileHover={{ scale: 1.1 }}
					onClick={() => {
						contact.current?.scrollIntoView({ behavior: "smooth" });
						y.set(0);
					}}
				>
					<h5 className={classNames(activeSection === "contact" ? styles["actif-nav"] : "")}><Trans>nav.contact</Trans></h5>
					<p className={classNames(activeSection === "contact" ? styles["actif-nav"] : "")}><Trans>nav.contact</Trans></p>
					<img src={book4Img} alt="contact option" />
				</motion.div>
			</div>
			<motion.div className={styles["navigation-container__click-target"]} style={{ cursor: "pointer" }} onClick={handleStateClick}></motion.div>
		</div>
	);
};
