/// <reference types="vite/client" />
import react from "@vitejs/plugin-react";
// import fs from "node:fs";
// import path from "node:path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
// import generateWebConfig from "./src/constants/webconfigcontent.ts";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	// Correctly check the mode
	const isProd = mode === "production";

	// Check if bundle analysis is requested
	const shouldAnalyze = process.env.ANALYZE === "true";

	// Determine plugins based on mode
	const plugins = isProd
		? [
				react(),
				// {
				// 	name: "generate-web-config",
				// 	closeBundle() {
				// 		fs.writeFileSync(
				// 			path.resolve(__dirname, "dist/web.config"),
				// 			generateWebConfig,
				// 		);
				// 	},
				// },
				// Add visualizer plugin when analysis is requested
				shouldAnalyze && visualizer({
					filename: "dist/stats.html",
					open: true,
					gzipSize: true,
					brotliSize: true,
				}),
			].filter(Boolean)
		: [react()];

	return {
		plugins,
		base: "/",
		build: {
			outDir: "dist",
			emptyOutDir: true,
			assetsDir: "assets",
			// Optimize chunks and assets
			cssCodeSplit: true,
			minify: isProd ? 'terser' : false,
			terserOptions: isProd ? {
				compress: {
					drop_console: true,
					drop_debugger: true,
				}
			} : undefined,
			rollupOptions: {
				external: [/\.test\./, /\.spec\./, /\/tests\//, /\/\_\_tests\_\_\//],
				output: {
					// Chunk files by type
					manualChunks: (id) => {
						if (id.includes("node_modules")) {
							if (id.includes("@mui")) {
								return "vendor_mui";
							}
							if (id.includes("react") || id.includes("react-dom")) {
								return "vendor_react";
							}
							if (id.includes("@tanstack")) {
								return "vendor_tanstack";
							}
							return "vendor"; // other dependencies
						}
					},
					// Hashed filenames for better caching
					entryFileNames: isProd ? 'assets/[name].[hash].js' : 'assets/[name].js',
					chunkFileNames: isProd ? 'assets/[name].[hash].js' : 'assets/[name].js',
					assetFileNames: isProd ? 'assets/[name].[hash].[ext]' : 'assets/[name].[ext]',
				}
			},
		},
	};
});
