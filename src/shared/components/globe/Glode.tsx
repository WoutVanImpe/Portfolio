import styles from "./globe.module.scss";
import globeImg from "../assets/globe.svg";
import baseImg from "../assets/globe-base.svg";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { LanguageButton } from "./LanguageButton";
import { useTheme } from "~context/ThemeContext";
import { useTips } from "~context/TipsContext";

export const Globe = () => {
	const { textColor } = useTheme();

	const { i18n } = useTranslation();
	const [showLangs, setShowLangs] = useState(false);

	const handleClick = () => {
		setShowLangs((prev) => !prev);
	};

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
		<div className={styles["globe-container"]}>
			<img className={styles["globe-container__base"]} src={baseImg} alt="globe base" />
			<p className={styles["globe-container__indicator"]}>{i18n.language}</p>

			<motion.img
				className={styles["globe-container__globe"]}
				src={globeImg}
				alt="globe"
				whileHover={{
					rotate: 360,
					filter: "blur(3px)",
					transition: {
						rotate: {
							duration: 0.2,
							ease: "easeIn",
							repeat: Infinity,
						},
					},
				}}
				onClick={handleClick}
			/>

			<AnimatePresence>
				{showLangs && (
					<motion.div className={styles["globe-container__lang"]} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
						{Array.isArray(i18n.options.supportedLngs) && i18n.options.supportedLngs.filter((lng) => lng !== "cimode").map((language) => <LanguageButton key={language} language={language} onClick={handleClick} />)}
					</motion.div>
				)}
			</AnimatePresence>
			<motion.p className={styles["globe-container__tip"]} animate={{ color: textColor }} style={{ opacity: tipOpacity }} transition={{ duration: 1, ease: "easeIn" }}>
				<Trans>tips.globe</Trans>
			</motion.p>
		</div>
	);
};
