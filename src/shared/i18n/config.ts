import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

import header_nl from "./translations/homepage/header/header_nl.json";
import header_en from "./translations/homepage/header/header_en.json";
import about_nl from "./translations/homepage/about/about_nl.json";
import about_en from "./translations/homepage/about/about_en.json";
import works_nl from "./translations/homepage/works/works_nl.json";
import works_en from "./translations/homepage/works/works_en.json";
import contact_nl from "./translations/homepage/contact/contact_nl.json";
import contact_en from "./translations/homepage/contact/contact_en.json";
import nav_nl from "./translations/homepage/nav/nav_nl.json";
import nav_en from "./translations/homepage/nav/nav_en.json";

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			nl: {
				translation: {
					header: header_nl,
					about: about_nl,
					works: works_nl,
					contact: contact_nl,
					nav: nav_nl,
				},
			},
			en: {
				translation: {
					header: header_en,
					about: about_en,
					works: works_en,
					contact: contact_en,
					nav: nav_en,
				},
			},
		},
		supportedLngs: ["nl", "en"],
		fallbackLng: "en",
		debug: true,
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
