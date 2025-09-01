/// <reference types="vite/client" />
import react from "@vitejs/plugin-react";
import path from "path";
// import fs from "node:fs";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, type BuildEnvironmentOptions, type UserConfig } from "vite";
// import generateWebConfig from "./src/constants/webconfigcontent.ts";

// https://vite.dev/config/
export default defineConfig((props: UserConfig) => {
	// Correctly check the mode
	const isProd = props.mode === "production";

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

	const build = {
			outDir: "dist",
			emptyOutDir: true,
			assetsDir: "assets",
			// Optimize chunks and assets
			cssCodeSplit: true,
			minify: (isProd ? 'terser' : false) as BuildEnvironmentOptions["minify"],
			terserOptions: isProd ? {
				compress: {
					// drop_console: false,
					drop_console: true,
					drop_debugger: true,
					// drop_debugger: false,
				}
			} : undefined,
			rollupOptions: {
				external: [/\.test\./, /\.spec\./, /\/tests\//, /\/\_\_tests\_\_\//],
				output: {
					// Chunk files by type
					manualChunks: (id: string) => {
						if (id.includes("node_modules")) {
							if (id.includes("@mui")) {
								return "vendor_mui_icon";
							}
							if (id.includes("@mui/material")) {
								return "vendor_mui_material";
							}
							if (id.includes("@mui/system")) {
								return "vendor_mui_system";
							}
							if (id.includes("@emotion")) {
								return "vendor_emo_react";
							}
							if (id.includes("@emotion/styled")) {
								return "vendor_emo_styled";
							}
							if (id.includes("react") || id.includes("react-dom")) {
								return "vendor_react";
							}
							if (id.includes("@tanstack")) {
								return "vendor_tanstack";
							}
							if (id.includes("embla")) {
								return "vendor_embla";
							}
							if (id.includes("notistack")) {
								return "vendor_notistack";
							}
							if (id.includes("@storybook")) {
								return "vendor_storybook";
							}							
							if (id.includes("formik")) {
								return "vendor_formik";
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
		};

	const resolve = {
		alias: {
			"@": path.resolve(__dirname, "./src/"),
			"@api": path.resolve(__dirname, "./src/api/"),
			"@assets": path.resolve(__dirname, "./src/assets/"),
			"@components": path.resolve(__dirname, "./src/components/"),
			"@contexts": path.resolve(__dirname, "./src/contexts/"),
			"@constants": path.resolve(__dirname, './src/constants/'),
			// "@docs": path.resolve(__dirname, "./src/docs/"),
			"@forms": path.resolve(__dirname, "./src/forms/"),
			"@hooks": path.resolve(__dirname, "./src/hooks/"),
			// "@msw": path.resolve(__dirname, "./src/msw/"),
			"@pages": path.resolve(__dirname, "./src/pages/"),
			"@test": path.resolve(__dirname, "./src/test/"),
			// "@utils": path.resolve(__dirname, "./src/utils/"),
			// "@public": path.resolve(__dirname, "./src/public/"),
			// "@storybook": path.resolve(__dirname, "./.storybook/"),
		}
	};

	return {
		plugins,
		base: "/",
		build,
		resolve,
	} satisfies UserConfig
});
