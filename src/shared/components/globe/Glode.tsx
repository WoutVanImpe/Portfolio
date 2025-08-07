import styles from "./globe.module.scss";
import globeImg from "../assets/globe.svg";
import baseImg from "../assets/globe-base.svg";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageButton } from "./LanguageButton";

export const Globe = () => {
	const { i18n } = useTranslation();
	const [showLangs, setShowLangs] = useState(false);

	const handleClick = () => {
		setShowLangs((prev) => !prev);
	};

	return (
		<div className={styles["globe-container"]}>
			<img className={styles["globe-container__base"]} src={baseImg} alt="globe base" />
			<p>{i18n.language}</p>

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
		</div>
	);
};
