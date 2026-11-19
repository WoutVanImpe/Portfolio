import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "@home";
import "@xyflow/react/dist/style.css";
import "@styles/main.scss";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<HomePage />
	</StrictMode>
);
