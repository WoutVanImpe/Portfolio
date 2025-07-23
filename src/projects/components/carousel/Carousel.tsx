import { useState } from "react";
import styles from "./carousel.module.scss";
import { motion } from "framer-motion";
import { ProjectCard } from "~shared/components/project-card/ProjectCard";
import testimg from "../../../assets/testimg.jpg";
import arrowLeft from "./imgs/arrowLeft.svg";
import arrowRight from "./imgs/arrowRight.svg";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import type ProjectType from "~shared/hooks/projects-data/project.types";

interface CarouselProps {
	projects: ProjectType[];
}

export const Carousel = ({ projects }: CarouselProps) => {
	const { width: screenWidth } = useWindowDimensions();

	const cardWidth = 200;
	const overlap = 50;
	const spacing = cardWidth - overlap;

	const totalCards = 9;

	const centerIndex = Math.floor(totalCards / 2);

	const positions = Array.from({ length: totalCards }, (_, i) => {
		const offset = i - centerIndex;
		return offset * spacing;
	});

	const [cardOrder, setCardOrder] = useState<number[]>(Array.from({ length: totalCards }, (_, i) => i));

	const handleNext = () => {
		setCardOrder((prev) => {
			const [first, ...rest] = prev;
			return [...rest, first];
		});
	};

	const handlePrev = () => {
		setCardOrder((prev) => {
			const last = prev[prev.length - 1];
			return [last, ...prev.slice(0, -1)];
		});
	};
	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "400px",
				overflow: "hidden",
				display: "flex",
				justifyContent: "center",
				alignItems: "end",
			}}
		>
			{cardOrder.map((posIndex, i) => {
				const offset = posIndex - centerIndex;
				const x = positions[posIndex];

				const styleVariants: Record<
					string,
					{
						scale: number;
						opacity: number;
						filter: string;
						zIndex: number;
						rotateZ: string;
					}
				> = {
					"0": { scale: 1.1, opacity: 1, filter: "none", zIndex: 9, rotateZ: "-2deg" },
					"1": { scale: 0.9, opacity: 1, filter: "none", zIndex: 8, rotateZ: "15deg" },
					"-1": { scale: 0.9, opacity: 1, filter: "none", zIndex: 8, rotateZ: "-15deg" },
					"2": { scale: 0.8, opacity: 0.8, filter: "blur(1px)", zIndex: 7, rotateZ: "-5deg" },
					"-2": { scale: 0.8, opacity: 0.8, filter: "blur(1px)", zIndex: 7, rotateZ: "5deg" },
					"3": { scale: 0.7, opacity: 0.7, filter: "blur(2px)", zIndex: 6, rotateZ: "2deg" },
					"-3": { scale: 0.7, opacity: 0.7, filter: "blur(2px)", zIndex: 6, rotateZ: "-2deg" },
					"4": { scale: 0.6, opacity: 0, filter: "blur(3px)", zIndex: 7, rotateZ: "-10deg" },
					"-4": { scale: 0.6, opacity: 0, filter: "blur(3px)", zIndex: 7, rotateZ: "10deg" },
				};

				const animationStyle = styleVariants[offset] || { scale: 0.6, opacity: 0, filter: "blur(4px)", zIndex: 1 };

				return (
					<motion.div
						className={styles["carouselCard"]}
						key={`Card ${i + 1}`}
						animate={{
							x,
							scale: animationStyle.scale,
							opacity: animationStyle.opacity,
							filter: animationStyle.filter,
							rotateZ: animationStyle.rotateZ,
						}}
						transition={{ duration: 0.5, ease: "easeInOut" }}
						style={{
							position: "absolute",
							top: 50,
							left: screenWidth / 2,
							marginLeft: `-${cardWidth / 2}px`,
							zIndex: animationStyle.zIndex,
							backdropFilter: "blur(5px)",
						}}
					>
						<ProjectCard id={projects[i].id} title={projects[i].title} img={testimg} tags={projects[i].tags} />
					</motion.div>
				);
			})}

			<button
				className={styles["carouselButton"]}
				onClick={handlePrev}
				style={{
					marginRight: "20px",
				}}
			>
				<img src={arrowRight} alt="terug" />
			</button>

			<button
				className={styles["carouselButton"]}
				onClick={handleNext}
				style={{
					marginLeft: "20px",
				}}
			>
				<img src={arrowLeft} alt="volgende" />
			</button>
		</div>
	);
};
