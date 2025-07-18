import styles from "./project-card.module.scss";
import img from "../../../assets/testimg.jpg";

export const ProjectCard = () => {
	return (
		<div className={styles["project-card"]}>
			<div className={styles["project-card__img"]}>
				<img src={img} alt="project-card" />
			</div>
			<div className={styles["project-card__textbox"]}>
				<h3>project</h3>
			</div>
		</div>
	);
};
