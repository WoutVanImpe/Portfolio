import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@nodes": path.resolve(__dirname, "./src/shared/nodes"),
			"@styles": path.resolve(__dirname, "./src/styles"),
			"@shared": path.resolve(__dirname, "./src/shared"),
			"@context": path.resolve(__dirname, "./src/context"),
			"@home": path.resolve(__dirname, "./src/pages/Home"),
			"@": path.resolve(__dirname, "./src"),
		},
	},
	base: "/Portfolio/",
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules/@xyflow/")) return "flow-vendor";
					if (id.includes("node_modules/lucide-react/")) return "icons";
					if (
						id.includes("node_modules/react/") ||
						id.includes("node_modules/react-dom/") ||
						id.includes("node_modules/scheduler/")
					) {
						return "react-vendor";
					}
					if (id.includes("node_modules/i18next") || id.includes("node_modules/react-i18next")) {
						return "i18n-vendor";
					}
					return undefined;
				},
			},
		},
	},
});
