import { useEffect, useState } from "react";
import styles from "./mini-carousel.module.scss";
import { motion } from "motion/react";

interface CardStyling {
	filter: string;
	zIndex: number;
	opacity: number;
}

interface MiniCarouselProps {
	images: string[];
	title: string;
}

export const MiniCarousel = ({ images, title }: MiniCarouselProps) => {
	const totalCards = images.length;

	const cardNumber = Array.from({ length: totalCards }, (_, i) => i);

	const [cardOrder, setCardOrder] = useState<number[]>(Array.from({ length: totalCards }, (_, i) => i));

	useEffect(() => {
		const interval = setInterval(() => {
			setCardOrder((prev) => {
				const [first, ...rest] = prev;
				return [...rest, first];
			});
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={styles["mini-carousel"]}>
			{cardNumber.map((i) => {
				const styleVariants: Record<string, CardStyling> = {
					"0": { filter: "none", zIndex: 11, opacity: 1 },
					"1": { filter: "blur(1px)", zIndex: 10, opacity: 0 },
				};

				const animationStyle = styleVariants[cardOrder[i]] || styleVariants[1];

				return (
					<motion.div
						key={`Card ${i + 1}`}
						className={styles["mini-carousel__card"]}
						style={{
							zIndex: animationStyle.zIndex,
							opacity: animationStyle.opacity,
						}}
						animate={{
							filter: animationStyle.filter,
							opacity: animationStyle.opacity,
						}}
						transition={{ duration: 0.4, ease: "easeInOut" }}
					>
						<img src={images[i]} alt={`${title} foto`} draggable={false} />
					</motion.div>
				);
			})}
		</div>
	);
};
