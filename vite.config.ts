/// <reference types="vite/client" />
import react from "@vitejs/plugin-react";
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from "vite";

const BASE_URL = process.env.VITE_BASE_URL || "/"; // "/nyunitedsda/";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        visualizer()
    ],
    base: BASE_URL,
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // React and related libraries
                    if (
                        id.includes('node_modules/react') ||
                        id.includes('node_modules/react-dom') ||
                        id.includes('node_modules/react-router-dom') ||
                        id.includes('node_modules/react-router')
                    ) {
                        return 'vendor-react';
                    }
                    
                    // UI component libraries
                    if (id.includes('node_modules/react-scroll-to-top')) {
                        return 'vendor-react-scroll';
                    }
                    if (id.includes('node_modules/react-spinners')) {
                        return 'vendor-spinners';
                    }
                    
                    // MUI and its dependencies
                    if (
                        id.includes('node_modules/@mui') ||
                        id.includes('node_modules/@emotion')
                    ) {
                        return 'vendor-mui';
                    }
                    
                    // Utilities
                    if (
                        id.includes('node_modules/dayjs')
                    ) {
                        return 'vendor-utils';
                    }
                    
                    // Carousel related
                    if (
                        id.includes('node_modules/embla-carousel') ||
                        id.includes('node_modules/embla-carousel-autoplay') ||
                        id.includes('node_modules/embla-carousel-react')
                    ) {
                        return 'vendor-carousel';
                    }
                    
                    // App code organization
                    if (id.includes('src/components')) {
                        return 'components';
                    }
                    if (id.includes('src/pages')) {
                        return 'pages';
                    }
                    if (id.includes('src/hooks')) {
                        return 'hooks';
                    }
                }
            }
        },
        chunkSizeWarningLimit: 500,
    }
});
