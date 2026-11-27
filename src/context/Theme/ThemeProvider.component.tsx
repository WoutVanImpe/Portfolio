import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { ThemeContext } from "./theme.context";
import type { ThemeProviderProps } from "./theme.props";
import { isThemeName, type ThemeContextValue, type ThemeName } from "./theme.types";

const STORAGE_KEY = "portfolio-theme";

const readStoredTheme = (): string | null => {
	try {
		return window.localStorage.getItem(STORAGE_KEY);
	} catch {
		return null;
	}
};

const writeStoredTheme = (theme: ThemeName): void => {
	try {
		window.localStorage.setItem(STORAGE_KEY, theme);
	} catch {
		// Storage can be unavailable in privacy modes; the in-memory theme still works.
	}
};

const getInitialTheme = (): ThemeName => {
	const applied = document.documentElement.dataset.theme ?? null;

	if (isThemeName(applied)) return applied;

	const stored = readStoredTheme();

	if (isThemeName(stored)) return stored;

	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState<ThemeName>(getInitialTheme);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		writeStoredTheme(theme);
	}, [theme]);

	const toggleTheme = useCallback(() => {
		setTheme((current) => (current === "light" ? "dark" : "light"));
	}, []);

	const value = useMemo<ThemeContextValue>(() => ({ theme, setTheme, toggleTheme }), [theme, toggleTheme]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
