import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";

const syncHtmlLang = (): void => {
	document.documentElement.lang = i18n.resolvedLanguage ?? "en";
};

void i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "en",
		supportedLngs: ["en", "nl"],
		load: "languageOnly",
		keySeparator: false,
		nsSeparator: false,
		interpolation: { escapeValue: false },
		detection: {
			order: ["localStorage", "navigator"],
			lookupLocalStorage: "portfolio-language",
			caches: ["localStorage"],
		},
	});

syncHtmlLang();
i18n.on("languageChanged", syncHtmlLang);

export default i18n;
