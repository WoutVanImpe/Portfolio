import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeContextType = {
	darkmode: boolean;
	setDarkmode: (mode: boolean) => void;
	backgroundColor: "#fff" | "#1b1a1aff";
	setBackgroundColor: (mode: "#fff" | "#1b1a1aff") => void;
};

const ThemeContext = createContext<ThemeContextType>({
	darkmode: false,
	setDarkmode: () => {},
	backgroundColor: "#fff",
	setBackgroundColor: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [darkmode, setDarkmode] = useState<boolean>(false);
	const [backgroundColor, setBackgroundColor] = useState<"#fff" | "#1b1a1aff">("#fff");

	useEffect(() => {
		setBackgroundColor(darkmode ? "#1b1a1aff" : "#fff");
	}, [darkmode]);

	const value = useMemo(
		() => ({
			darkmode,
			setDarkmode,
			backgroundColor,
			setBackgroundColor,
		}),
		[darkmode, backgroundColor]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
