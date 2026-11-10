/// <reference types="vite/client" />
import react from "@vitejs/plugin-react";
import path from "path";
// import fs from "node:fs";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, type BuildEnvironmentOptions, type UserConfig, type Plugin } from "vite";
// import generateWebConfig from "./src/constants/webconfigcontent.ts";


const kb = (n: number) => (n / 1024).toFixed(2) + ' kB';

function printModuleSizes(topN = 10): Plugin {
	return {
		name: 'print-module-sizes',
		apply: 'build',
		generateBundle(_options, bundle) {
			for (const file of Object.values(bundle)) {
				if (file.type !== 'chunk') continue;

				const total = Buffer.byteLength(file.code);
				console.log(`\n📦 ${file.fileName}  (${kb(total)})`);

				Object.entries(file.modules)
					.map(([id, info]) => ({ id, size: info.renderedLength }))
					.sort((a, b) => b.size - a.size)
					.slice(0, topN)
					.forEach(({ id, size }) => {
						const short = id.split('node_modules/').pop()!.replace(process.cwd(), '');
						console.log(`   ${kb(size).padStart(10)}  ${short}`);
					});
			}
		},
	};
}

// Resolve the real package name from a module id (works with npm, yarn and pnpm paths)
const getPackageName = (id: string): string => {
	const path = id.split("node_modules/").pop()!;
	const [first, second] = path.split("/");
	return first.startsWith("@") ? `${first}/${second}` : first;
};

// React core must not import from any other chunk
const REACT_CORE = new Set(["react", "react-dom", "scheduler"]);



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
			printModuleSizes(10),
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
				// manualChunks: (id: string) => {
				// 	if (id.includes("node_modules")) {
				// 		if (id.includes("@mui")) {
				// 			return "vendor_mui_icon";
				// 		}
				// 		if (id.includes("@mui/material")) {
				// 			return "vendor_mui_material";
				// 		}
				// 		if (id.includes("@mui/system")) {
				// 			return "vendor_mui_system";
				// 		}
				// 		if (id.includes("@emotion/styled")) {
				// 			return "vendor_emo_styled";
				// 		}
				// 		if (id.includes("@tanstack")) {
				// 			return "vendor_tanstack";
				// 		}
				// 		if (id.includes("embla")) {
				// 			return "vendor_embla";
				// 		}
				// 		if (id.includes("notistack")) {
				// 			return "vendor_notistack";
				// 		}
				// 		if (id.includes("@storybook")) {
				// 			return "vendor_storybook";
				// 		}							
				// 		if (id.includes("formik")) {
				// 			return "vendor_formik";
				// 		}
				// 		if (id.includes("axios")) {
				// 			return "vendor_axios";
				// 		}
				// 		if (id.includes("antd")) {
				// 			return "vendor_antd";
				// 		}
				// 		if (id.includes("stylis")) {
				// 			return "vendor_stylis";
				// 		}
				// 		if (id.includes("lodash-es")) {
				// 			return "vendor_lodash-es";
				// 		}
				// 		if (id.includes("@popperjs")) {
				// 			return "vendor_@popperjs";
				// 		}
				// 		if (id.includes("dayjs")) {
				// 			return "vendor_dayjs";
				// 		}
				// 		if (id.includes("react-fast-marquee")) {
				// 			return "vendor_react-fast-marquee";
				// 		}
				// 		if (id.includes("react-spinners")) {
				// 			return "vendor_react-spinners";
				// 		}
				// 		if (id.includes("react-router")) {
				// 			return "vendor_react-router";
				// 		}
				// 		if (id.includes("react-dom") || id.includes("react") || id.includes("@rc-component")) {
				// 			return "vendor_react";
				// 		}

				// 		console.log("id", id);

				// 		return "vendor"; // other dependencies
				// 	}
				// },

				manualChunks: (id: string) => {
					if (!id.includes("node_modules")) return;

					const pkg = getPackageName(id);

					// 1. React core only: the root of the dependency graph
					if (REACT_CORE.has(pkg)) return "vendor_react";

					// 2. Router
					if (pkg === "react-router" || pkg === "react-router-dom") {
						return "vendor_react-router";
					}

					// 3. Emotion + stylis together (cache -> stylis, serialize -> utils, ...)
					if (pkg.startsWith("@emotion/") || pkg === "stylis") {
						return "vendor_emotion";
					}

					// 4. MUI: icons depend on material, never the other way around - delete after mui change
					if (pkg === "@mui/icons-material") return "vendor_mui_icons";
					if (pkg.startsWith("@mui/")) return "vendor_mui"; // material, system, utils, styled-engine, x-*...
					if (pkg === "@popperjs/core") return "vendor_mui";

					// 5. antd ecosystem
					if (
						pkg === "antd" ||
						pkg.startsWith("@ant-design/") ||
						pkg.startsWith("@rc-component/") ||
						pkg.startsWith("rc-")
					) {
						return "vendor_antd";
					}

					// 6. Independent libraries
					if (pkg.startsWith("@tanstack/")) return "vendor_tanstack";
					if (pkg.startsWith("embla-carousel")) return "vendor_embla";
					if (pkg === "notistack") return "vendor_notistack";
					if (pkg === "formik") return "vendor_formik";
					if (pkg === "axios") return "vendor_axios";
					if (pkg === "lodash-es") return "vendor_lodash-es";
					if (pkg === "dayjs") return "vendor_dayjs";
					if (pkg === "react-fast-marquee") return "vendor_react-fast-marquee";
					if (pkg === "react-spinners") return "vendor_react-spinners";

					// 7. Everything else: let Rollup place it
					return undefined;
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
