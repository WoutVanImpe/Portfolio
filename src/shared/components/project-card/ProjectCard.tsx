import styles from "./project-card.module.scss";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import type ProjectType from "~shared/hooks/projects-data/project.types";

interface ProjectCardProps extends ProjectType {
	clicked: string;
}

export const ProjectCard = ({ title, img, tags, description, clicked }: ProjectCardProps) => {
	const isExpanded = clicked === "0true";

	const cardVariants = {
		collapsed: {
			width: 200,
			transition: {
				type: "spring" as const,
				stiffness: 200,
				damping: 20,
			},
		},
		expanded: {
			width: 500,
			transition: {
				type: "spring" as const,
				stiffness: 200,
				damping: 20,
			},
		},
	};

	return (
		<motion.div className={styles["project-card"]} layout variants={cardVariants} animate={isExpanded ? "expanded" : "collapsed"} transition={{ duration: 0.4, ease: "easeInOut" }}>
			<div className={styles["project-card__bigcard"]}>
				<div className={styles["project-card__bigcard__norm"]}>
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

				<AnimatePresence>
					{isExpanded && (
						<motion.div
							key="extra"
							layout
							initial={{ opacity: 0, height: 0 }}
							animate={{
								opacity: 1,
								transition: {
									delay: 0.3,
									duration: 0.3,
								},
							}}
							exit={{
								opacity: 0,
								transition: {
									duration: 0.2,
								},
							}}
							className={styles["project-card__bigcard__extra"]}
						>
							<p>{description}</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
};
