import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		clearMocks: true,
		coverage: {
			reporter: ["html"],
			reportsDirectory: "./src/utils/coverage",
			enabled: true,
		},
		css: true,
		environment: "jsdom",
		globals: true,
		mockReset: true,
		name: "nyunitedsda",
		printConsoleTrace: true,
		root: ".",
		setupFiles: ["./src/utils/vitest-setup.ts", "./src/utils/vitest-setup.tsx"],
		unstubEnvs: true,
		unstubGlobals: true,
	},
});
