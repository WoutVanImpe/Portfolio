import { CardDisplay } from "~shared/components/card-display/CardDisplay";
import styles from "./worksSection.module.scss";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import { motion, useMotionValue } from "motion/react";
import { forwardRef, useEffect } from "react";
import { useTheme } from "~context/ThemeContext";
import { Trans } from "react-i18next";

export const WorksSection = forwardRef<HTMLDivElement, {}>((props, ref) => {
	const { width } = useWindowDimensions();
	const cardScale = useMotionValue<number>(width > 1200 ? (1200 * 0.48) / 650 : (width * 0.48) / 650);

	const { textColor, textBgColor, textBorderColor } = useTheme();

	useEffect(() => {
		cardScale.set(width > 1200 ? (1200 * 0.48) / 650 : (width * 0.48) / 650);
	}, [width]);

	return (
		<div className={styles["s-works"]} ref={ref}>
			<motion.h1 animate={{ color: textColor, backgroundColor: textBgColor, borderColor: textBorderColor }} transition={{ duration: 1, ease: "easeIn" }}>
				<Trans>works.title</Trans>
			</motion.h1>
			<motion.div className={styles["s-works__works-container"]}>
				<motion.div className={styles["s-works__works-container__card-container"]} style={{ scale: cardScale }}>
					<CardDisplay />
				</motion.div>
				<motion.div className={styles["s-works__works-container__card-container"]} style={{ scale: cardScale }}>
					<CardDisplay />
				</motion.div>
				<motion.div className={styles["s-works__works-container__card-container"]} style={{ scale: cardScale }}>
					<CardDisplay />
				</motion.div>
			</motion.div>
		</div>
	);
});
