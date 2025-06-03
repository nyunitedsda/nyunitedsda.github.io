import type { RouteObject } from "react-router";
import type { Route, RouteMenu } from "./types";

export const formatRoutes = (routes: any[]): RouteObject[] => {
	return routes.map((i) => {
		const { path, element, children, index, caseSensitive, errorElement } = i;
		const formattedRoute: any =
			index === true
				? { index: true, element, errorElement }
				: {
						path,
						element,
						caseSensitive: caseSensitive ?? false,
						errorElement,
					};
		if (children) {
			formattedRoute.children = formatRoutes(children);
		}
		return formattedRoute;
	});
};

export const generateMenuItems = (routes: Route[]): RouteMenu[] => {
	return routes.reduce<RouteMenu[]>((acc, route) => {
		// Skip routes without name or path
		if (!route.path || (!route.name && !route?.icon)) {
			return acc;
		}

		// Create the menu item
		const menuItem: RouteMenu = {
			name: route.name ?? "",
			path: route.path,
			icon: route?.icon,
		};

		// Add children if they exist
		if (route.children && route.children.length > 0) {
			const subMenuItems = generateMenuItems(route.children);
			if (subMenuItems.length > 0) {
				menuItem.children = subMenuItems;
			}
		}

		acc.push(menuItem);
		return acc;
	}, []);
};
