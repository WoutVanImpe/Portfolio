import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeContextType = {
	darkmode: boolean;
	setDarkmode: (mode: boolean) => void;
	backgroundColor: "#b89fe7ff" | "#342353ff";
	setBackgroundColor: (mode: "#b89fe7ff" | "#342353ff") => void;
};

const ThemeContext = createContext<ThemeContextType>({
	darkmode: false,
	setDarkmode: () => {},
	backgroundColor: "#b89fe7ff",
	setBackgroundColor: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [darkmode, setDarkmode] = useState<boolean>(false);
	const [backgroundColor, setBackgroundColor] = useState<"#b89fe7ff" | "#342353ff">("#b89fe7ff");

	useEffect(() => {
		setBackgroundColor(darkmode ? "#342353ff" : "#b89fe7ff");
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
