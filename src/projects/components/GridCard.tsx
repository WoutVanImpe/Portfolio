import styles from "./gridcard.module.scss";
import testimg from "../../assets/testimg.jpg";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import { motion } from "motion/react";
import classNames from "classnames";

export const GridCard = ({ title, img, description, tags }: ProjectType) => {
	return (
		<motion.div layout="position" transition={{ duration: 1 }} className={classNames(styles["gridcard"])}>
			<img src={testimg} alt="test" />
			<div className={styles.info}>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</motion.div>
	);
};
