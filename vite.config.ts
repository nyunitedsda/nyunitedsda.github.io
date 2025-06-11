/// <reference types="vite/client" />
import fs from "node:fs";
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import generateWebConfig from "./src/constants/webconfigcontent";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	// Correctly check the mode
	const isProd = mode === "production";

	// Determine plugins based on mode
	const plugins = isProd
		? [
				react(),
				{
					name: "generate-web-config",
					closeBundle() {
						fs.writeFileSync(
							path.resolve(__dirname, "dist/web.config"),
							generateWebConfig(),
						);
					},
				},
			]
		: [react()];

	return {
		plugins,
		base: "/",
		build: {
			outDir: "dist",
			emptyOutDir: true,
			assetsDir: "assets",
			rollupOptions: {
				external: [/\.test\./, /\.spec\./, /\/tests\//, /\/\_\_tests\_\_\//],
			},
		},
	};
});
