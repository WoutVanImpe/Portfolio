import { useTheme } from "~context/ThemeContext";
import styles from "./aboutSection.module.scss";
import { motion, scale, useMotionValue } from "motion/react";
import { forwardRef, useEffect } from "react";
import { Trans } from "react-i18next";
import { Portrait } from "~shared/components/portrait/Portrait";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";

export const AboutSection = forwardRef<HTMLDivElement, {}>((props, ref) => {
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
					<Portrait scale={portraitScale.get()} />
				</motion.div>

				<motion.p
					style={{
						width: width > 768 ? "auto" : width * 0.85,
					}}
					animate={{ color: textColor }}
					transition={{ duration: 1, ease: "easeIn" }}
				>
					Hi! Ik ben Wout, een derdejaarsstudent Multimedia en Creatieve Technologie aan de Erasmushogeschool Brussel, met een sterke passie voor front-end development en motion design. Ik experimenteer graag met nieuwe technologieën en daag mezelf
					uit om creatief en oplossingsgericht te werken. Naast mijn studie ben ik actief als socialmediamanager bij JNM (Jeugdbond voor Natuur en Milieu), waar ik onder andere meewerk aan promomateriaal zoals Instagramcontent, flyers en magazines.
					Verder besteed ik in mijn vrije tijd graag aandacht aan het aanscherpen van mijn technische en visuele skills.
				</motion.p>
			</div>
		</div>
	);
});
