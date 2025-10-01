import { CardDisplay } from "~shared/components/card-display/CardDisplay";
import styles from "./worksSection.module.scss";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import { motion, useMotionValue } from "motion/react";
import { forwardRef, useEffect, useState } from "react";
import { useTheme } from "~context/ThemeContext";
import { Trans } from "react-i18next";
import { useData } from "~context/DataContext";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import { FadeInSlideUp } from "~shared/components/fadeIn/FadeIn";

export const WorksSection = forwardRef<HTMLDivElement, {}>((props, ref) => {
	const { projects } = useData();
	const [projectsList, setProjectsList] = useState<[] | ProjectType[]>([]);

	useEffect(() => {
		projects === undefined ? setProjectsList([]) : setProjectsList(projects);
	}, [projects]);

	const { width } = useWindowDimensions();
	const { textColor, textBgColor, textBorderColor } = useTheme();

	let newScale: number;

	if (width > 1200) {
		newScale = (1200 * 0.48) / 650;
	} else if (width >= 900) {
		newScale = (width * 0.48) / 650;
	} else if (width >= 650) {
		newScale = 0.9;
	} else {
		newScale = (width / 650) * 0.9;
	}

	const cardScale = useMotionValue<number>(newScale);

	useEffect(() => {
		let updatedScale: number;

		if (width > 1200) {
			updatedScale = (1200 * 0.48) / 650;
		} else if (width >= 900) {
			updatedScale = (width * 0.48) / 650;
		} else if (width >= 650) {
			updatedScale = 0.9;
		} else {
			updatedScale = (width / 650) * 0.9;
		}

		cardScale.set(updatedScale);
	}, [width]);

	return (
		<div className={styles["s-works"]} ref={ref}>
			<motion.h1 animate={{ color: textColor, backgroundColor: textBgColor, borderColor: textBorderColor }} transition={{ duration: 1, ease: "easeIn" }}>
				<Trans>works.title</Trans>
			</motion.h1>
			<motion.div className={styles["s-works__works-container"]}>
				{projectsList.map((project, index) => (
					<FadeInSlideUp delay={0.1 * index} key={project.id}>
						<motion.div key={project.id} className={styles["s-works__works-container__card-container"]} style={{ scale: cardScale }}>
							<CardDisplay projectInfo={project} index={index} />
						</motion.div>
					</FadeInSlideUp>
				))}
			</motion.div>
		</div>
	);
});
