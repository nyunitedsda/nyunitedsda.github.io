import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		clearMocks: true,
		coverage: {
			reporter: ["html"],
			reportsDirectory: "./src/test/coverage",
			enabled: true,
		},
		include: ["*src/**/*.test.ts", "*src/**/*.test.tsx"],
		css: true,
		environment: "jsdom",
		globals: true,
		mockReset: true,
		name: "nyunitedsda",
		printConsoleTrace: true,
		root: ".",
		setupFiles: ["./src/test/vitest-setup.tsx"],
		unstubEnvs: true,
		unstubGlobals: true,
	},
});
