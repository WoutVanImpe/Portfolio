import styles from "./gridcard.module.scss";
import testimg from "../../assets/testimg.jpg";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import { useState } from "react";
import { motion } from "motion/react";
import classNames from "classnames";

export const GridCard = ({ title, img, description, tags }: ProjectType) => {
	const [isExtended, setIsExtended] = useState(false);

	const toggleClick = () => setIsExtended(!isExtended);

	return (
		<motion.div layout="position" transition={{ duration: 1 }} onClick={toggleClick} className={classNames(styles["gridcard"], { [styles.extended]: isExtended })}>
			<img src={testimg} alt="test" />
			<div className={styles.info}>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</motion.div>
	);
};
