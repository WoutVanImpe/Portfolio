import styles from "./Postcard.module.scss";
import cardImg from "../assets/postcard.svg";
import motionImg from "../assets/motion-stamp.svg";
import webImg from "../assets/web-stamp.svg";
import socialImg from "../assets/social-stamp.svg";
import designImg from "../assets/design-stamp.svg";
import { useEffect, useState } from "react";
import { motion, MotionValue, useAnimation } from "motion/react";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import { useTranslation } from "react-i18next";

type PostcardProps = {
	handleFrame?: MotionValue<number>;
	ProjectInfo: ProjectType;
};

export const Postcard = ({ handleFrame, ProjectInfo }: PostcardProps) => {
	const { i18n } = useTranslation();
	const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

	useEffect(() => {
		setSelectedLanguage(i18n.language);
	}, [i18n.language]);

	const [viewState, setViewState] = useState<boolean>(false);
	const controls = useAnimation();

	const handleClick = async () => {
		handleFrame?.set(handleFrame.get() === 1 ? 0 : 1);
		await Promise.all([
			controls.start({
				y: -130,
				transition: { duration: 0.5, ease: "easeInOut" },
			}),
			controls.start({
				rotateY: 90,
				transition: { duration: 0.5, delay: 0.3, ease: "easeIn" },
			}),
		]);

		setViewState((prev) => !prev);

		await Promise.all([
			controls.start({
				rotateY: 0,
				transition: { duration: 0.5, ease: "easeOut" },
			}),
			controls.start({
				y: 0,
				transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" },
			}),
		]);
	};

	const tagImages: Record<string, string> = {
		motion: motionImg,
		web: webImg,
		"social media": socialImg,
		"graphic design": designImg,
	};

	const text: Record<
		string,
		{
			title: string;
			teaser: string;
		}
	> = {
		en: ProjectInfo.en,
		nl: ProjectInfo.nl,
	};

	return (
		<motion.div className={styles["postcard-container"]} onClick={handleClick} animate={controls}>
			{viewState ? (
				<motion.div className={styles["postcard-container__front"]}>
					<img className={styles["postcard-container__front__card"]} src={cardImg} alt="postcard" />
					<div className={styles["postcard-container__front__stamp-container"]}>
						{ProjectInfo.tags.map((tag) => {
							const imgSrc = tagImages[tag];
							return <img key={tag} src={imgSrc} alt={`${tag} stamp`} />;
						})}
					</div>
					<h2 className={styles["postcard-container__front__title"]}>{text[selectedLanguage].title}</h2>
					<p className={styles["postcard-container__front__description"]}>{text[selectedLanguage].teaser}</p>
					<img className={styles["postcard-container__front__image"]} src={ProjectInfo.cover} alt="main" />
					{/* <motion.button whileHover={{ scale: 1.1 }} style={{ rotate: -5 }} className={styles["postcard-container__front__button"]}>
						<Trans>works.seeMore</Trans>
					</motion.button> */}
				</motion.div>
			) : (
				<motion.div className={styles["postcard-container__back"]}>
					<img className={styles["postcard-container__back__image"]} src={ProjectInfo.cover} alt="main" />
				</motion.div>
			)}
		</motion.div>
	);
};
