import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "@home";
import "@styles/main.scss";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<HomePage />
	</StrictMode>
);
