import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeContextType = {
	darkmode: boolean;
	setDarkmode: (mode: boolean) => void;
	backgroundColor: "#b89fe7ff" | "#342353ff";
	textBgColor: "#f2f2fa" | "#404044";
	textBorderColor: "#e3dfe6" | "#262528";
	textColor: "#fff" | "#252525ff";
};

const ThemeContext = createContext<ThemeContextType>({
	darkmode: false,
	setDarkmode: () => {},
	backgroundColor: "#b89fe7ff",
	textBgColor: "#f2f2fa",
	textBorderColor: "#e3dfe6",
	textColor: "#252525ff",
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
			textBgColor,
			textBorderColor,
			textColor,
		}),
		[darkmode, backgroundColor, textBgColor, textColor]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
