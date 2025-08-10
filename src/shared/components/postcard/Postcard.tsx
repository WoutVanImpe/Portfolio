import styles from "./Postcard.module.scss";
import cardImg from "../assets/postcard.svg";
import motionImg from "../assets/motion-stamp.svg";
import webImg from "../assets/web-stamp.svg";
import socialImg from "../assets/social-stamp.svg";
import designImg from "../assets/design-stamp.svg";
import { useState } from "react";
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from "motion/react";

export const Postcard = () => {
	const [viewState, setViewState] = useState<boolean>(false);
	const controls = useAnimation();

	const handleClick = async () => {
		await Promise.all([
			controls.start({
				y: -130,
				transition: { duration: 0.5, ease: "easeInOut" },
			}),
			controls.start({
				rotateY: 90,
				transition: { duration: 0.5, delay: 0.3, ease: "easeInOut" },
			}),
		]);

		setViewState((prev) => !prev);

		await Promise.all([
			controls.start({
				rotateY: 0,
				transition: { duration: 0.5, ease: "easeInOut" },
			}),
			controls.start({
				y: 0,
				transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" },
			}),
		]);
	};

	return (
		<motion.div className={styles["postcard-container"]} onClick={handleClick} animate={controls}>
			{viewState ? (
				<motion.div className={styles["postcard-container__front"]}>
					<img className={styles["postcard-container__front__card"]} src={cardImg} alt="postcard" />
					<div className={styles["postcard-container__front__stamp-container"]}>
						<img src={motionImg} alt="stamp" />
						<img src={webImg} alt="stamp" />
					</div>
					<h2 className={styles["postcard-container__front__title"]}>Project portfolio website</h2>
					<p className={styles["postcard-container__front__description"]}>
						Lorem ipsum dolor sit amet. Sit beatae alias in doloribus quis nam labore libero qui culpa pariatur. Est tenetur voluptatibus non pariatur esse sit debitis eveniet hic magnam alias. Sit odio voluptatem ut repudiandae dolorem a ducimus
						obcaecati est incidunt molestiae. Est asperiores obcaecati et illum quas est reprehenderit esse et totam omnis a numquam eaque qui sequi nulla! Quo architecto alias sit libero quas qui molestiae veniam aut iste omnis et quia consequatur.
						Et corporis veritatis vel incidunt corporis et debitis quia non iste quia qui quidem exercitationem. Aut beatae dignissimos aut minima sapiente ad quaerat corporis! Ut enim natus rem rerum voluptatum quo odit accusamus eos aliquam
						delectus qui porro neque est nihil galisum 33 pariatur ipsum!
					</p>
					<img className={styles["postcard-container__front__image"]} src="./images/frontend-main.png" alt="main" />
				</motion.div>
			) : (
				<motion.div className={styles["postcard-container__back"]}>
					<img className={styles["postcard-container__back__image"]} src="./images/frontend-main.png" alt="main" />
				</motion.div>
			)}
		</motion.div>
	);
};
