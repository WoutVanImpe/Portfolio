import { createContext, useContext, useMemo, useState } from "react";

type ObjectContextType = {
	lamp: boolean;
	setLamp: (mode: boolean) => void;
};

const ObjectContext = createContext<ObjectContextType>({
	lamp: false,
	setLamp: () => {},
});

export const ObjectProvider = ({ children }: { children: React.ReactNode }) => {
	const [lamp, setLamp] = useState<boolean>(false);

	const value = useMemo(
		() => ({
			lamp,
			setLamp,
		}),
		[lamp]
	);

	return <ObjectContext.Provider value={value}>{children}</ObjectContext.Provider>;
};

export const useObjects = () => useContext(ObjectContext);
