import styles from "./project-card.module.scss";
import classNames from "classnames";
import type ProjectType from "~shared/hooks/projects-data/project.types";

export const ProjectCard = ({ title, img, tags }: ProjectType) => {
	return (
		<div className={styles["project-card"]}>
			<div className={styles["project-card__img"]}>
				<img src={img} alt={title} />
			</div>
			<div className={styles["project-card__textbox"]}>
				<h3>{title}</h3>
				<div className={styles["project-card__bottom"]}>
					{tags.map((tag) => (
						<span key={tag} className={classNames(styles["project-card__tag"], styles[`project-card__tag--${tag}`])}>
							• {tag}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};
