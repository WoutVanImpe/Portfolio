import styles from "./navigation.module.scss";
import navBgImg from "../../../shared/components/assets/nav-drawer.svg";
import book1Img from "../../../shared/components/assets/nav-option1.svg";
import book2Img from "../../../shared/components/assets/nav-option2.svg";
import book3Img from "../../../shared/components/assets/nav-option3.svg";
import book4Img from "../../../shared/components/assets/nav-option4.svg";
import { Globe } from "~shared/components/globe/Glode";
import { motion } from "motion/react";

export const Navigation = () => {
	return (
		<div className={styles["navigation-container"]}>
			<img className={styles["navigation-container__bg"]} src={navBgImg} alt="drawer" />
			<div className={styles["navigation-container__globe-container"]}>
				<Globe />
			</div>
			<div className={styles["navigation-container__options-container"]}>
				<motion.div className={styles["navigation-container__options-container__option"]}>
                    <p>Home</p>
					<img src={book1Img} alt="home option" />
				</motion.div>
				<div className={styles["navigation-container__options-container__option"]}>
                    <p>About</p>
					<img src={book2Img} alt="about option" />
				</div>
				<div className={styles["navigation-container__options-container__option"]}>
                    <p>Works</p>
					<img src={book3Img} alt="works option" />
				</div>
				<div className={styles["navigation-container__options-container__option"]}>
                    <p>Contact</p>
					<img src={book4Img} alt="contact option" />
				</div>
			</div>
		</div>
	);
};
