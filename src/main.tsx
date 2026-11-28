import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@context/Theme";
import { App } from "./App";
import "@/i18n";
import "@xyflow/react/dist/style.css";
import "@styles/main.scss";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</StrictMode>
);
