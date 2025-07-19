import { motion } from "framer-motion";
import { useState } from "react";
import { ProjectCard } from "~shared/components/project-card/ProjectCard";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import testImg from "../../assets/testimg.jpg";

type FloatingCardProps = {
	project: ProjectType;
	index: number;
	containerWidth: number;
	containerHeight: number;
};

export const FloatingCard = ({ project, index, containerWidth, containerHeight }: FloatingCardProps) => {
	const startX = containerWidth + index * 185;
	const [x, setX] = useState(startX);
	const [top, setTop] = useState(Math.random() * (containerHeight - 300));

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
				cursor: "pointer",
				position: "absolute",
			}}
			whileHover={{
				scale: 1.3,
				filter: "blur(0px)",
				zIndex: 3,
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
					setX(containerWidth + 500);
					setTop(Math.random() * (containerHeight - 300));
				}
			}}
		>
			<ProjectCard title={project.title} image={testImg} tags={project.tags} />
		</motion.div>
	);
};
