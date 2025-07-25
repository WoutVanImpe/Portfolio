import { useEffect, useState } from "react";
import styles from "./carousel.module.scss";
import { motion } from "framer-motion";
import { ProjectCard } from "~shared/components/project-card/ProjectCard";
import testimg from "../../../assets/testimg.jpg";
import arrowLeft from "./imgs/arrowLeft.svg";
import arrowRight from "./imgs/arrowRight.svg";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import classNames from "classnames";

interface CarouselProps {
	projects: ProjectType[];
}
interface CardStyling {
	scale: number;
	opacity: number;
	filter: string;
	zIndex: number;
	rotateZ: string;
}

export const Carousel = ({ projects }: CarouselProps) => {
	const { width: screenWidth } = useWindowDimensions();

	const cardWidth = 200;
	const overlap = 50;
	const spacing = cardWidth - overlap;

	const totalCards = projects.length;

	const centerIndex = Math.floor(totalCards / 2);

	const positions = Array.from({ length: totalCards }, (_, i) => {
		const offset = i - centerIndex;
		return offset * spacing;
	});

	const [cardOrder, setCardOrder] = useState<number[]>(Array.from({ length: totalCards }, (_, i) => i));

	const [card0Clicked, setCard0Clicked] = useState<boolean>(false);
	const [card0Style, setCard0Style] = useState<CardStyling>({ scale: 1.1, opacity: 1, filter: "none", zIndex: 9, rotateZ: "-2deg" });
	const [card0XOffset, setCard0XOffset] = useState<number>(0);

	useEffect(() => {
		if (card0Clicked) {
			setCard0Style({ scale: 1.5, opacity: 1, filter: "none", zIndex: 9, rotateZ: "0deg" });
			setCard0XOffset(-150);
		} else {
			setCard0Style({ scale: 1.1, opacity: 1, filter: "none", zIndex: 9, rotateZ: "-2deg" });
			setCard0XOffset(0);
		}
	}, [card0Clicked]);

	const handleNext = () => {
		if (!card0Clicked) {
			setCardOrder((prev) => {
				const [first, ...rest] = prev;
				return [...rest, first];
			});
		}
	};

	const handlePrev = () => {
		if (!card0Clicked) {
			setCardOrder((prev) => {
				const last = prev[prev.length - 1];
				return [last, ...prev.slice(0, -1)];
			});
		}
	};

	const handleClick = (e: React.MouseEvent<HTMLDivElement>, offset: number) => {
		const element = e.currentTarget;
		if (offset === 0) {
			setCard0Clicked(!card0Clicked);
		} else if (offset > 0) {
			if (!card0Clicked) {
				for (let i = 0; i < offset; i++) {
					handlePrev();
				}
			}
		} else if (!card0Clicked) {
			for (let i = 0; i > offset; i--) {
				handleNext();
			}
		}
	};
	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "50vh",
				minHeight: "440px",
				overflow: "hidden",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{cardOrder.map((posIndex, i) => {
				const offset = posIndex - centerIndex;
				const x = positions[posIndex];

				const styleVariants: Record<string, CardStyling> = {
					"0": card0Style,
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

				const xPos = x + (offset === 0 ? card0XOffset : 0);

				return (
					<motion.div
						className={classNames(styles["carouselCard"], `card${offset}`)}
						key={`Card ${i + 1}`}
						animate={{
							x: xPos,
							scale: animationStyle.scale,
							opacity: animationStyle.opacity,
							filter: animationStyle.filter,
							rotateZ: animationStyle.rotateZ,
						}}
						transition={{ duration: 0.5, ease: "easeInOut" }}
						style={{
							position: "absolute",
							top: "10vh",
							left: screenWidth / 2,
							marginLeft: `-${cardWidth / 2}px`,
							zIndex: animationStyle.zIndex,
							backdropFilter: "blur(5px)",
							cursor: "pointer",
						}}
						onClick={(e) => handleClick(e, offset)}
					>
						<ProjectCard id={projects[i].id} title={projects[i].title} img={testimg} tags={projects[i].tags} description={projects[i].description} clicked={`${offset}${card0Clicked}`} />
					</motion.div>
				);
			})}

			<button
				className={styles["carouselButton"]}
				onClick={handlePrev}
				style={{
					position: "absolute",
					top: "calc(50% + 180px)",
					right: "calc(50% + 30px)",
					transform: "translateY(-50%)",
					zIndex: 7,
				}}
			>
				<img src={arrowRight} alt="terug" />
			</button>

			<button
				className={styles["carouselButton"]}
				onClick={handleNext}
				style={{
					position: "absolute",
					top: "calc(50% + 180px)",
					left: "calc(50% + 30px)",
					transform: "translateY(-50%)",
					zIndex: 7,
				}}
			>
				<img src={arrowLeft} alt="volgende" />
			</button>
		</div>
	);
};
