import type ProjectType from "~shared/hooks/projects-data/project.types";
import styles from "./project-content.module.scss";
import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

export const ProjectContent = ({ title, tags, img, extraImg, description }: ProjectType) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start end", "end start"] });
	const smoothScrollY = useSpring(scrollYProgress, {
		stiffness: 50,
		damping: 20,
		mass: 1,
	});

	const gradColor1 = useTransform(smoothScrollY, [0.7, 0.9], ["#4c24e1", "#4c24e1"]);
	const gradColor2 = useTransform(smoothScrollY, [0.7, 0.9], ["#0065f4", "#f200a0"]);
	const gradColor3 = useTransform(smoothScrollY, [0.7, 0.9], ["#007cd3", "#ff495f"]);
	const gradColor4 = useTransform(smoothScrollY, [0.7, 0.9], ["#0088a0", "#ffad3f"]);
	const gradColor5 = useTransform(smoothScrollY, [0.7, 0.9], ["#008f7a", "#f9f871"]);

	const gradient = useTransform(smoothScrollY, (value) => `linear-gradient(to right top, ${gradColor1.get()}, ${gradColor2.get()}, ${gradColor3.get()}, ${gradColor4.get()}, ${gradColor5.get()})`);
	return (
		<div className={styles["content-container"]}>
			<motion.div ref={scrollRef} className={styles["content-header-wrapper"]} style={{ backgroundImage: gradient }}>
				<div className={styles["content-header"]}>
					<img src={img} alt={title} className={styles["content-header__image"]} />
					<div className={styles["content-header__text"]}>
						<h1>{title}</h1>
						<p>{description?.intro}</p>
						<div className={styles["content-header__tags"]}>
							{tags.map((tag) => (
								<span key={tag} className={classNames(styles["content-header__tag"], styles[`content-header__tag--${tag}`])}>
									• {tag}
								</span>
							))}
						</div>
					</div>
				</div>
				<div className={styles["custom-shape-divider-bottom-1753701867"]}>
					<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
						<path
							d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
							className={styles["shape-fill"]}
						></path>
					</svg>
				</div>
			</motion.div>

			<div className={styles["content-body"]}>
				<div className={styles["content-text"]}>
					{description?.sections.map((markdown, index) => (
						<div key={`Section ${index}`} className={styles["content-text__section"]}>
							<ReactMarkdown>{markdown}</ReactMarkdown>
						</div>
					))}
				</div>

				<div className={styles["content-extra-images"]}>
					{extraImg?.length ? (
						<div className={styles["content-extra-images"]}>
							{extraImg.map((img, i) => (
								<img key={`Image ${i}`} src={img} alt={`Extra ${i}`} />
							))}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};
