import type { RouteObject } from "react-router";
import type { Route, RouteMenu } from "./types";

export const formatRoutes = (routes: Route[]): RouteObject[] => {
	const formattedRoutes: RouteObject[] = [];

	routes.forEach((route) => {
		const { path, element, children, index, caseSensitive, errorElement } =
			route;

		// Process children routes separately
		if (children && children.length > 0) {
			formattedRoutes.push(...formatRoutes(children));
		}

		// Handle index routes
		else if (index === true) {
			formattedRoutes.push({
				index: true,
				element,
				errorElement,
			});
		}
		// Handle regular routes
		else {
			formattedRoutes.push({
				path,
				element,
				caseSensitive: caseSensitive ?? false,
				errorElement,
			});
		}

		// // Process children routes separately
		// if (children && children.length > 0) {
		//   formattedRoutes.push(...formatRoutes(children));
		// }
	});

	return formattedRoutes;
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
