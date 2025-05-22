import type { ReactNode } from "react";
import type { RouteObject } from "react-router";

export interface RouteMenu {
	name: string;
	path: string;
	icon: ReactNode;
}

export interface FormattedRoutes {
	routes: RouteObject[];
	menuItems: RouteMenu[];
}

export type Route = RouteObject & {
	icon?: ReactNode;
	name?: string;
};
