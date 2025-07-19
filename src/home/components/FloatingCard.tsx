import { motion } from "framer-motion";
import { useState } from "react";
import { ProjectCard } from "~shared/components/project-card/ProjectCard";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import testImg from "../../assets/testimg.jpg";

type FloatingCardProps = {
	project: ProjectType;
	startX: number; 
	containerWidth: number;
    containerHeight: number;
};

export const FloatingCard = ({ project, startX, containerWidth, containerHeight }: FloatingCardProps) => {
	const [x, setX] = useState(startX);

	return (
		<motion.div
			style={{
				x,
				scale: 0.7,
				filter: "blur(2px)",
				cursor: "pointer",
				position: "absolute",
				top: Math.random() * (containerHeight - 300),
			}}
			whileHover={{
				scale: 1.3,
				filter: "blur(0px)",
				zIndex: 3,
			}}
			animate={{ x: -300 }}
			transition={{
				x: {
					duration: 15 + Math.random() * 40,
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
				}
			}}
		>
			<ProjectCard title={project.title} image={testImg} tags={project.tags} />
		</motion.div>
	);
};
