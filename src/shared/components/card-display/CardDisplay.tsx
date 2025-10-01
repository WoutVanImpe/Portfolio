import styles from "./card-display.module.scss";
import frontFrameImg from "../assets/cardholder-front.svg";
import backFrameImg from "../assets/cardholder-back.svg";
import { Postcard } from "../postcard/Postcard";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import { useTheme } from "~context/ThemeContext";
import { useTips } from "~context/TipsContext";
import { useEffect } from "react";
import { Trans } from "react-i18next";

type CardDisplayProps = {
	projectInfo: ProjectType;
	index: number;
};

export const CardDisplay = ({ projectInfo, index }: CardDisplayProps) => {
	const { textColor } = useTheme();

	const frameState = useMotionValue<number>(1);

	const smoothFrame = useSpring(frameState, {
		stiffness: 40,
		damping: 20,
		mass: 1,
	});

	const frameOpacity = useTransform(smoothFrame, [0, 1], [0, 1]);
	const frameScale = useTransform(smoothFrame, [0, 1], [0.5, 1]);

	const { tips } = useTips();
	const tipOpac = useMotionValue(0);

	useEffect(() => {
		tips ? tipOpac.set(1) : tipOpac.set(0);
	}, [tips]);

	const smoothTip = useSpring(tipOpac, {
		stiffness: 80,
		damping: 20,
		mass: 1,
	});

	const tipOpacity = useTransform(smoothTip, [0, 1], [0, 1]);

	return (
		<div className={styles["postcard-display-container"]}>
			<motion.img className={styles["postcard-display-container__back"]} src={backFrameImg} style={{ opacity: frameOpacity, scale: frameScale }} alt="back of frame" />
			<motion.div
				className={styles["postcard-display-container__card"]}
				style={{ rotateX: "5deg" }}
				whileHover={{
					rotateX: "0deg",
					y: -20,
				}}
			>
				<Postcard handleFrame={frameState} ProjectInfo={projectInfo} />
			</motion.div>
			<motion.img className={styles["postcard-display-container__front"]} src={frontFrameImg} style={{ opacity: frameOpacity, scale: frameScale }} alt="front of frame" />
			{index === 0 ? (
				<motion.p animate={{ color: textColor }} style={{ opacity: tipOpacity }} transition={{ duration: 1, ease: "easeIn" }}>
					<Trans>tips.card</Trans>
				</motion.p>
			) : (
				<></>
			)}
		</div>
	);
};
