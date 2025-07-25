import { motion } from "framer-motion";
import { useState } from "react";
import { ProjectCard } from "~shared/components/project-card/ProjectCard";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import testImg from "../../../assets/testimg.jpg";

type FloatingCardProps = {
	project: ProjectType;
	index: number;
	containerWidth: number;
	containerHeight: number;
};

export const FloatingCardToLeft = ({ project, index, containerWidth, containerHeight }: FloatingCardProps) => {
	const startX = containerWidth + index * 185;
	const [x, setX] = useState(startX);
	const [top, setTop] = useState(Math.random() * (containerHeight - 390) + 50);

	const distance = startX + 300;
	const speed = 60;
	const duration = distance / speed;

	return (
		<motion.div
			style={{
				x,
				top,
				scale: 0.7,
				filter: "blur(2px)",
				position: "absolute",
				zIndex: 1,
			}}
			whileHover={{
				scale: 1.3,
				filter: "blur(0px)",
				zIndex: 3,
				backdropFilter: "blur(2px)",
			}}
			animate={{ x: -300 }}
			transition={{
				x: {
					duration,
					ease: "linear",
					repeat: Infinity,
					repeatType: "loop",
				},
				scale: { duration: 0.3 },
				filter: { duration: 0.3 },
			}}
			onUpdate={(latest) => {
				if (parseFloat(latest.x as string) <= -300) {
					setX(containerWidth + 300);
					setTop(Math.random() * (containerHeight - 390) + 50);
				}
			}}
		>
			<ProjectCard id={project.id} title={project.title} img={testImg} tags={project.tags} />
		</motion.div>
	);
};

export const FloatingCardToRight = ({ project, index, containerWidth, containerHeight }: FloatingCardProps) => {
	const startX = -300 - index * 185;
	const endX = containerWidth + 300;
	const [x, setX] = useState(startX);
	const [top, setTop] = useState(Math.random() * (containerHeight - 390) + 50);

	const distance = endX - startX;
	const speed = 60;
	const duration = distance / speed;

	return (
		<motion.div
			style={{
				x,
				top,
				scale: 0.7,
				filter: "blur(2px)",
				position: "absolute",
				zIndex: 1,
			}}
			whileHover={{
				scale: 1.3,
				filter: "blur(0px)",
				zIndex: 3,
				backdropFilter: "blur(2px)",
			}}
			animate={{ x: containerWidth + 300 }}
			transition={{
				x: {
					duration,
					ease: "linear",
					repeat: Infinity,
					repeatType: "loop",
				},
				scale: { duration: 0.3 },
				filter: { duration: 0.3 },
			}}
			onUpdate={(latest) => {
				if (parseFloat(latest.x as string) >= containerWidth + 300) {
					setX(0 - 300);
					setTop(Math.random() * (containerHeight - 390) + 50);
				}
			}}
		>
			<ProjectCard id={project.id} title={project.title} img={testImg} tags={project.tags} />
		</motion.div>
	);
};
