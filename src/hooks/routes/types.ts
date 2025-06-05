import type { ReactNode } from "react";
import type { RouteObject } from "react-router";

export interface BasicMenu {
	id: string;
	name: string;
}

export interface PathlessMenu extends BasicMenu {
	icon?: ReactNode;
	children?: Omit<PathlessMenu, "icon">[];
}

export interface RouteMenu extends Omit<PathlessMenu, "children"> {
	path: string;
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
