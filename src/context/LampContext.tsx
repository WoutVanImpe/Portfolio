import { createContext, useContext, useMemo, useState } from "react";

type LampContextType = {
	lamp: boolean;
	setLamp: (mode: boolean) => void;
};

const LampContext = createContext<LampContextType>({
	lamp: false,
	setLamp: () => {},
});

export const LampProvider = ({ children }: { children: React.ReactNode }) => {
	const [lamp, setLamp] = useState<boolean>(false);

	const value = useMemo(
		() => ({
			lamp,
			setLamp,
		}),
		[lamp]
	);

	return <LampContext.Provider value={value}>{children}</LampContext.Provider>;
};

export const useLamp = () => useContext(LampContext);
