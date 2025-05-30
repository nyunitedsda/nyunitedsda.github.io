/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const BASE_URL = process.env.VITE_BASE_URL || "/"; // "/nyunitedsda/";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: BASE_URL,
});
