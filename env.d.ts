/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_BASE_URL: string;
  
  // Add more Vite environment variables below as needed
  // readonly VITE_ANOTHER_VARIABLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}