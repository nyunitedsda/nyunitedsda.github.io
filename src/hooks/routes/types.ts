import type { ReactNode } from "react";
import type { RouteObject } from "react-router";

export interface RouteMenu {
	name: string;
	path: string;
	icon?: ReactNode;
	children?: Omit<RouteMenu, "icon">[];
}

export interface FormattedRoutes {
	routes: RouteObject[];
	menuItems: RouteMenu[];
}

export type Route = Omit<RouteObject, "children"> & {
	icon?: ReactNode;
	name?: string;
	children?: Route[];
};
