import i18n from "i18next";
import { LANGUAGE_LABELS } from "~i18n/languageNames";

export const LanguageButton = ({ language, onClick }: { language: string; onClick?: () => void }) => {
	const handleClick = () => {
		i18n.changeLanguage(language);
		onClick?.();
	};

	return <button onClick={handleClick}>{LANGUAGE_LABELS[language] || language}</button>;
};
