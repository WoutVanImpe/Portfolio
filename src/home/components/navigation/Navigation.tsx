import styles from "./navigation.module.scss";
import navBgImg from "../../../shared/components/assets/nav-drawer.svg";
import book1Img from "../../../shared/components/assets/nav-option1.svg";
import book2Img from "../../../shared/components/assets/nav-option2.svg";
import book3Img from "../../../shared/components/assets/nav-option3.svg";
import book4Img from "../../../shared/components/assets/nav-option4.svg";
import { Globe } from "~shared/components/globe/Glode";
import { motion, useMotionValue } from "motion/react";

export const Navigation = () => {
	const navState = useMotionValue<number>(0);

	const handleStateClick = () => {
		navState.set(navState.get() === 1 ? 0 : 1);
	};

	return (
		<div className={styles["navigation-container"]}>
			<img className={styles["navigation-container__bg"]} src={navBgImg} alt="drawer" />
			<div className={styles["navigation-container__globe-container"]}>
				<Globe />
			</div>
			<div className={styles["navigation-container__options-container"]}>
				<motion.div className={styles["navigation-container__options-container__option"]} whileHover={{ scale: 1.1 }}>
					<p>Home</p>
					<img src={book1Img} alt="home option" />
				</motion.div>
				<motion.div className={styles["navigation-container__options-container__option"]} whileHover={{ scale: 1.1 }}>
					<p>About</p>
					<img src={book2Img} alt="about option" />
				</motion.div>
				<motion.div className={styles["navigation-container__options-container__option"]} whileHover={{ scale: 1.1 }}>
					<p>Works</p>
					<img src={book3Img} alt="works option" />
				</motion.div>
				<motion.div className={styles["navigation-container__options-container__option"]} whileHover={{ scale: 1.1 }}>
					<p>Contact</p>
					<img src={book4Img} alt="contact option" />
				</motion.div>
			</div>
			<motion.div className={styles["navigation-container__click-target"]} onClick={handleStateClick}></motion.div>
		</div>
	);
};
