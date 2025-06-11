/// <reference types="vite/client" />
import fs from "node:fs";
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import webConfigContent from "./src/constants/webconfigcontent";

// htt11ps://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		{
			name: "generate-web-config",
			closeBundle() {
				if (import.meta.env.VITE_PROD_DOMAIN) {
					fs.writeFileSync(
						path.resolve(__dirname, "dist/web.config"),
						webConfigContent,
					);
				}
			},
		},
	],
	base: "/",
	build: {
		outDir: "dist",
		emptyOutDir: true,
		assetsDir: "assets",
		rollupOptions: {
			external: [/\.test\./, /\.spec\./, /\/tests\//, /\/\_\_tests\_\_\//],
		},
	},
});
