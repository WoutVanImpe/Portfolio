import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { ThemeContext } from "./theme.context";
import type { ThemeProviderProps } from "./theme.props";
import { isThemeName, type ThemeContextValue, type ThemeName } from "./theme.types";

const STORAGE_KEY = "portfolio-theme";

const getInitialTheme = (): ThemeName => {
	const stored = window.localStorage.getItem(STORAGE_KEY);

	if (isThemeName(stored)) return stored;

	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState<ThemeName>(getInitialTheme);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		window.localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);

	const toggleTheme = useCallback(() => {
		setTheme((current) => (current === "light" ? "dark" : "light"));
	}, []);

	const value = useMemo<ThemeContextValue>(() => ({ theme, setTheme, toggleTheme }), [theme, toggleTheme]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
