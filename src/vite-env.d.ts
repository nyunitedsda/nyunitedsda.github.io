/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_BASE_URL: string;
	readonly VITE_WEBSITE_TITLE: string;
	readonly VITE_PROD_DOMAIN: string;
	readonly VITE_API_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
