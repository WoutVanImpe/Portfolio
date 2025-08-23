import styles from "./navigation.module.scss";
import navBgImg from "../../../shared/components/assets/nav-drawer.svg";
import book1Img from "../../../shared/components/assets/nav-option1.svg";
import book2Img from "../../../shared/components/assets/nav-option2.svg";
import book3Img from "../../../shared/components/assets/nav-option3.svg";
import book4Img from "../../../shared/components/assets/nav-option4.svg";
import { Globe } from "~shared/components/globe/Glode";
import { motion, MotionValue } from "motion/react";

type RefType = React.RefObject<HTMLDivElement | null>;

export const Navigation = ({ home, about, works, contact, y }: { home: RefType; about: RefType; works: RefType; contact: RefType; y: MotionValue<number> }) => {
	const handleStateClick = () => {
		y.set(y.get() === 0 ? 1 : 0);
	};

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
					<p>Home</p>
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
					<p>About</p>
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
					<p>Works</p>
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
					<p>Contact</p>
					<img src={book4Img} alt="contact option" />
				</motion.div>
			</div>
			<motion.div className={styles["navigation-container__click-target"]} style={{ cursor: "pointer" }} onClick={handleStateClick}></motion.div>
		</div>
	);
};
