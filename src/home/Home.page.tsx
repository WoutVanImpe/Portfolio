import styles from "./home.module.scss";
import { useGetProjects } from "~shared/hooks/projects-data/useGetProjects.hooks";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import { FloatingCardToLeft, FloatingCardToRight } from "./components/FloatingCard";
import { forwardRef, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export const Home = forwardRef<HTMLDivElement, {}>((props, ref) => {
	const { data } = useGetProjects();
	const projectList: ProjectType[] = [];
	const dimensions = useWindowDimensions();

	if (data) {
		while (projectList.length <= (dimensions.width / 253) * 2) data.forEach((project) => projectList.push(project));
	}

	const scrollRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start end", "end start"] });
	const smoothScrollY = useSpring(scrollYProgress, {
		stiffness: 50,
		damping: 20,
		mass: 1,
	});

	const gradColor1 = useTransform(smoothScrollY, [0.5, 0.9], ["#4c24e1", "#4c24e1"]);
	const gradColor2 = useTransform(smoothScrollY, [0.5, 0.9], ["#0065f4", "#f200a0"]);
	const gradColor3 = useTransform(smoothScrollY, [0.5, 0.9], ["#007cd3", "#ff495f"]);
	const gradColor4 = useTransform(smoothScrollY, [0.5, 0.9], ["#0088a0", "#ffad3f"]);
	const gradColor5 = useTransform(smoothScrollY, [0.5, 0.9], ["#008f7a", "#f9f871"]);

	const gradient = useTransform(smoothScrollY, (value) => `linear-gradient(to right top, ${gradColor1.get()}, ${gradColor2.get()}, ${gradColor3.get()}, ${gradColor4.get()}, ${gradColor5.get()})`);

	return (
		<div className={styles["p-home"]} ref={ref}>
			<motion.div ref={scrollRef} className={styles["p-home__header"]} style={{ backgroundImage: gradient }}>
				{projectList.map((project: ProjectType, index: number) => {
					if (index % 2) {
						return <FloatingCardToLeft key={project.title + index} project={project} index={index} containerWidth={dimensions.width} containerHeight={dimensions.height} />;
					} else {
						return <FloatingCardToRight key={project.title + index} project={project} index={index} containerWidth={dimensions.width} containerHeight={dimensions.height} />;
					}
				})}
				<div className={styles["p-home__header__welcome"]}>
					<div className={styles["p-home__header__welcome__textblock"]}>
						<h1>Hallo</h1>
						<h2>Ik ben Wout Van Impe</h2>
					</div>
				</div>
				<div className={styles["custom-shape-divider-bottom-1753013852"]}>
					<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
						<path
							d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
							className={styles["shape-fill"]}
						></path>
					</svg>
				</div>
			</motion.div>
		</div>
	);
});
