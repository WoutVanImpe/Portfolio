import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeContextType = {
	darkmode: boolean;
	setDarkmode: (mode: boolean) => void;
	backgroundColor: "#b89fe7ff" | "#342353ff";
	setBackgroundColor: (mode: "#b89fe7ff" | "#342353ff") => void;
	textBgColor: "#f2f2fa" | "#404044";
	setTextBgColor: (mode: "#f2f2fa" | "#404044") => void;
	textBorderColor: "#e3dfe6" | "#262528";
	setTextBorderColor: (mode: "#e3dfe6" | "#262528") => void;
	textColor: "#fff" | "#252525ff";
	setTextColor: (mode: "#fff" | "#252525ff") => void;
};

const ThemeContext = createContext<ThemeContextType>({
	darkmode: false,
	setDarkmode: () => {},
	backgroundColor: "#b89fe7ff",
	setBackgroundColor: () => {},
	textBgColor: "#f2f2fa",
	setTextBgColor: () => {},
	textBorderColor: "#e3dfe6",
	setTextBorderColor: () => {},
	textColor: "#252525ff",
	setTextColor: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [darkmode, setDarkmode] = useState<boolean>(false);
	const [backgroundColor, setBackgroundColor] = useState<"#b89fe7ff" | "#342353ff">("#b89fe7ff");
	const [textBgColor, setTextBgColor] = useState<"#f2f2fa" | "#404044">("#f2f2fa");
	const [textBorderColor, setTextBorderColor] = useState<"#e3dfe6" | "#262528">("#e3dfe6");
	const [textColor, setTextColor] = useState<"#fff" | "#252525ff">("#252525ff");

	useEffect(() => {
		setBackgroundColor(darkmode ? "#342353ff" : "#b89fe7ff");
		setTextBgColor(darkmode ? "#404044" : "#f2f2fa");
		setTextBorderColor(darkmode ? "#262528" : "#e3dfe6");
		setTextColor(darkmode ? "#fff" : "#252525ff");
	}, [darkmode]);

	const value = useMemo(
		() => ({
			darkmode,
			setDarkmode,
			backgroundColor,
			setBackgroundColor,
			textBgColor,
			setTextBgColor,
			textBorderColor,
			setTextBorderColor,
			textColor,
			setTextColor,
		}),
		[darkmode, backgroundColor, textBgColor, textColor]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
