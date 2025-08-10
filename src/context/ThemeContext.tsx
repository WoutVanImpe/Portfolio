import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeContextType = {
	darkmode: boolean;
	setDarkmode: (mode: boolean) => void;
	backgroundColor: "#f8f1e9" | "#2E2A26";
	setBackgroundColor: (mode: "#f8f1e9" | "#2E2A26") => void;
	patternColor: "#C2A083 " | "#A38C7A";
	setPatternColor: (mode: "#C2A083 " | "#A38C7A") => void;
};

const ThemeContext = createContext<ThemeContextType>({
	darkmode: false,
	setDarkmode: () => {},
	backgroundColor: "#f8f1e9",
	setBackgroundColor: () => {},
	patternColor: "#C2A083 ",
	setPatternColor: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [darkmode, setDarkmode] = useState<boolean>(false);
	const [backgroundColor, setBackgroundColor] = useState<"#f8f1e9" | "#2E2A26">("#f8f1e9");
	const [patternColor, setPatternColor] = useState<"#C2A083 " | "#A38C7A">("#C2A083 ");

	useEffect(() => {
		setBackgroundColor(darkmode ? "#2E2A26" : "#f8f1e9");
		setPatternColor(darkmode ? "#A38C7A" : "#C2A083 ");
	}, [darkmode]);

	const value = useMemo(
		() => ({
			darkmode,
			setDarkmode,
			backgroundColor,
			setBackgroundColor,
			patternColor,
			setPatternColor,
		}),
		[darkmode, backgroundColor, patternColor]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
