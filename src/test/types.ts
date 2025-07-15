import type { RenderOptions } from "@testing-library/react";
import type { PropsWithChildren } from "react";

export type ExcludedProvider =
	| "Authentication"
	| "Router"
	| "QueryClient"
	| "Theme"
	| "Snackbar"
	| "Notification"
	| "All";

export interface DynamicProviderProps extends PropsWithChildren {
	routerOptions?: {
		initialEntries?: string[];
		initialIndex?: number;
	};
	excludeProviders?: ExcludedProvider[];
}

export interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
	routerOptions?: DynamicProviderProps["routerOptions"];
	excludeProviders?: DynamicProviderProps["excludeProviders"];
}
