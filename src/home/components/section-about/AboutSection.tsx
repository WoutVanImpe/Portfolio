import { useTheme } from "~context/ThemeContext";
import styles from "./aboutSection.module.scss";
import { motion, scale } from "motion/react";
import { forwardRef } from "react";
import { Trans } from "react-i18next";
import { Portrait } from "~shared/components/portrait/Portrait";

export const AboutSection = forwardRef<HTMLDivElement, {}>((props, ref) => {
	const { textColor, textBgColor, textBorderColor } = useTheme();

	return (
		<div className={styles["s-about"]} ref={ref}>
			<motion.h1 animate={{ color: textColor, backgroundColor: textBgColor, borderColor: textBorderColor }} transition={{ duration: 1, ease: "easeIn" }}>
				<Trans>about.title</Trans>
			</motion.h1>
			<div className={styles["s-about__long-text"]}>
				<div style={{ scale: 0.6, width: "40%", transformOrigin: "left" }}>
					<Portrait scale={0.6} />
				</div>
				<motion.p animate={{ color: textColor }} transition={{ duration: 1, ease: "easeIn" }}>
					Hi! Ik ben Wout, een derdejaarsstudent Multimedia en Creatieve Technologie aan de Erasmushogeschool Brussel, met een sterke passie voor front-end development en motion design. Ik experimenteer graag met nieuwe technologieën en daag mezelf
					uit om creatief en oplossingsgericht te werken. Naast mijn studie ben ik actief als socialmediamanager bij JNM (Jeugdbond voor Natuur en Milieu), waar ik onder andere meewerk aan promomateriaal zoals Instagramcontent, flyers en magazines.
					Verder besteed ik in mijn vrije tijd graag aandacht aan het aanscherpen van mijn technische en visuele skills.
				</motion.p>
			</div>
		</div>
	);
});
