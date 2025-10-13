import { MotionValue, useMotionValue } from "motion/react";
import { createContext, useContext, useMemo, useState } from "react";

type ObjectContextType = {
	lamp: boolean;
	setLamp: (mode: boolean) => void;
	curtain: MotionValue<number> | undefined;
};

const ObjectContext = createContext<ObjectContextType>({
	lamp: false,
	setLamp: () => {},
	curtain: undefined,
});

export const ObjectProvider = ({ children }: { children: React.ReactNode }) => {
	const [lamp, setLamp] = useState<boolean>(false);
	const curtain = useMotionValue(0);

	const value = useMemo(
		() => ({
			lamp,
			setLamp,
			curtain,
		}),
		[lamp, curtain]
	);

	return <ObjectContext.Provider value={value}>{children}</ObjectContext.Provider>;
};

export const useObjects = () => useContext(ObjectContext);
