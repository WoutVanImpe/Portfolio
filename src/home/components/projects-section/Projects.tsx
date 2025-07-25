import { forwardRef, useRef } from "react";
import styles from "./projects.module.scss";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Carousel } from "../carousel/Carousel";

interface ProjectListProps {
	projects: ProjectType[];
}

export const Projects = forwardRef<HTMLDivElement, ProjectListProps>(({ projects }, ref) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start end", "end start"] });
	const smoothScrollY = useSpring(scrollYProgress, {
		stiffness: 50,
		damping: 20,
		mass: 1,
	});

	const gradColor1 = useTransform(smoothScrollY, [0.7, 1], ["#4c24e1", "#4c24e1"]);
	const gradColor2 = useTransform(smoothScrollY, [0.7, 1], ["#f200a0", "#0065f4"]);
	const gradColor3 = useTransform(smoothScrollY, [0.7, 1], ["#ff495f", "#007cd3"]);
	const gradColor4 = useTransform(smoothScrollY, [0.7, 1], ["#ffad3f", "#0088a0"]);
	const gradColor5 = useTransform(smoothScrollY, [0.7, 1], ["#f9f871", "#008f7a"]);

	const gradient = useTransform(smoothScrollY, (value) => `linear-gradient(to right top, ${gradColor1.get()}, ${gradColor2.get()}, ${gradColor3.get()}, ${gradColor4.get()}, ${gradColor5.get()})`);

	return (
		<motion.div ref={ref} className={styles["projects-wrapper"]} style={{ backgroundImage: gradient }}>
			<div ref={scrollRef} className={styles["custom-shape-divider-top-1753196371"]}>
				<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
					<path
						d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
						className={styles["shape-fill"]}
					></path>
				</svg>
			</div>
			<div className={styles["p-projects"]}>
				<Carousel projects={projects} />
			</div>
			<div className={styles["custom-shape-divider-bottom-1753196696"]}>
				<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
					<path
						d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
						className={styles["shape-fill"]}
					></path>
				</svg>
			</div>
		</motion.div>
	);
});
