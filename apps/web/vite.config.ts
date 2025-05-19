import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		TanStackRouterVite({
			autoCodeSplitting: true,
			routeToken: "layout",
		}),
		react(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/"),
		},
	},
	server: {
		proxy: {
			"/trpc": {
				target: "http://localhost:3000",
				changeOrigin: true,
			},
			"/api": {
				target: "http://localhost:3000",
				changeOrigin: true,
			},
		},
	},
});
