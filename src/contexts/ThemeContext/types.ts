export type Mode = "light" | "dark";

export interface ThemeContextState {
	mode: Mode;
	toggleMode: () => void;
}
