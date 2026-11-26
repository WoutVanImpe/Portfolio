export type Language = "en" | "nl";

export interface LocalizedText {
	en: string;
	nl: string;
}

export const DEFAULT_LANGUAGE: Language = "en";

export const normalizeLanguage = (language: string | undefined): Language =>
	language?.toLowerCase().startsWith("nl") ? "nl" : "en";

export const localize = (value: LocalizedText, language: string | undefined): string => {
	const resolved = normalizeLanguage(language);

	return value[resolved] ?? value[DEFAULT_LANGUAGE];
};
