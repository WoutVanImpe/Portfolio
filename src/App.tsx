import { HomePage } from "@home";
import { ScreenBlock, useScreenBlock } from "@shared/ScreenBlock";

export const App = () => {
	const blocked = useScreenBlock();

	return blocked ? <ScreenBlock /> : <HomePage />;
};
