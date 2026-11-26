import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "@home";
import { ThemeProvider } from "@context/Theme";
import "@/i18n";
import "@xyflow/react/dist/style.css";
import "@styles/main.scss";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<HomePage />
		</ThemeProvider>
	</StrictMode>
);
