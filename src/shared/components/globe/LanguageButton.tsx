import i18n from "i18next";
import { motion } from "motion/react";
import { LANGUAGE_LABELS } from "~i18n/languageNames";

export const LanguageButton = ({ language, onClick }: { language: string; onClick?: () => void }) => {
	const handleClick = () => {
		i18n.changeLanguage(language);
		onClick?.();
	};

	return (
		<motion.button onClick={handleClick} whileHover={{ scale: 1.1 }}>
			{LANGUAGE_LABELS[language] || language}
		</motion.button>
	);
};
