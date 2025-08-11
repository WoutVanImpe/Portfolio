import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeContextType = {
	darkmode: boolean;
	setDarkmode: (mode: boolean) => void;
	backgroundColor: "#aa88e7ff" | "#342353ff";
	setBackgroundColor: (mode: "#aa88e7ff" | "#342353ff") => void;
};

const ThemeContext = createContext<ThemeContextType>({
	darkmode: false,
	setDarkmode: () => {},
	backgroundColor: "#aa88e7ff",
	setBackgroundColor: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [darkmode, setDarkmode] = useState<boolean>(false);
	const [backgroundColor, setBackgroundColor] = useState<"#aa88e7ff" | "#342353ff">("#aa88e7ff");

	useEffect(() => {
		setBackgroundColor(darkmode ? "#342353ff" : "#aa88e7ff");
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
