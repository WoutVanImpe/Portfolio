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
});
