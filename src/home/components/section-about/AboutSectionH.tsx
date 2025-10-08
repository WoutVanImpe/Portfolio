import { useTheme } from "~context/ThemeContext";
import styles from "./aboutSection.module.scss";
import { motion, useMotionValue } from "motion/react";
import { forwardRef, useEffect } from "react";
import { Trans } from "react-i18next";
import { Portrait } from "~shared/components/portrait/Portrait";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import { FadeInSlideUp } from "~shared/components/fadeIn/FadeIn";

export const AboutSectionH = forwardRef<HTMLDivElement, {}>((props, ref) => {
	const { textColor, textBgColor, textBorderColor } = useTheme();
	const { width } = useWindowDimensions();

	const portraitScale = useMotionValue<number>(width > 1028 ? 0.6 : Math.max((width / 1028) * 0.6, 0.45));

	useEffect(() => {
		const newScale = width > 1028 ? 0.6 : Math.max((width / 1028) * 0.6, 0.45);
		portraitScale.set(newScale);
	}, [width]);

	return (
		<div className={styles["s-about"]} ref={ref}>
			<motion.h1 animate={{ color: textColor, backgroundColor: textBgColor, borderColor: textBorderColor }} transition={{ duration: 1, ease: "easeIn" }}>
				<Trans>about.title</Trans>
			</motion.h1>

			<div className={styles["s-about__long-text"]}>
				<motion.div
					style={{
						scale: portraitScale,
						width: width > 768 ? 600 * portraitScale.get() : "auto",
						height: 692 * portraitScale.get(),
						transformOrigin: width > 768 ? "top left" : "top center",
						display: "inline-block",
					}}
				>
					<FadeInSlideUp delay={0.1}>
						<Portrait scale={portraitScale.get()} />
					</FadeInSlideUp>
				</motion.div>

				<motion.p
					style={{
						width: width > 768 ? "auto" : width * 0.85,
					}}
					animate={{ color: textColor }}
					transition={{ duration: 1, ease: "easeIn" }}
				>
					<Trans>about.about</Trans>
				</motion.p>
			</div>
		</div>
	);
});
