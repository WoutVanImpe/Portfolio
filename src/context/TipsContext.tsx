import { createContext, useContext, useMemo, useState } from "react";

type TipsContextType = {
	tips: boolean;
	setTips: (mode: boolean) => void;
};

const TipsContext = createContext<TipsContextType>({
	tips: false,
	setTips: () => {},
});

export const TipsProvider = ({ children }: { children: React.ReactNode }) => {
	const [tips, setTips] = useState<boolean>(false);

	const value = useMemo(
		() => ({
			tips,
			setTips,
		}),
		[tips]
	);

	return <TipsContext.Provider value={value}>{children}</TipsContext.Provider>;
};

export const useTips = () => useContext(TipsContext);
