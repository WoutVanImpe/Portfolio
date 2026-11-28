export const THEME_NAMES = ["light", "dark"] as const;

export type ThemeName = (typeof THEME_NAMES)[number];

export interface ThemeContextValue {
	theme: ThemeName;
	setTheme: (theme: ThemeName) => void;
	toggleTheme: () => void;
}

export const isThemeName = (value: string | null): value is ThemeName =>
	value !== null && (THEME_NAMES as readonly string[]).includes(value);
