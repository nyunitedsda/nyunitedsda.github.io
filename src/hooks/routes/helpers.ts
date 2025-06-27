import type { RouteObject } from "react-router";
import type { PathlessMenu, RouteMenu } from "./types";

/**
 * Extracts id and path from routes that have both properties
 * @param routes - The nested routes array
 * @returns Array of objects containing only id and path properties
 */
export const extractRouteIdAndPath = (
	routes: RouteObject[],
): Array<{ id: string; path: string }> => {
	const result: Array<{ id: string; path: string }> = [];

	function traverse(route: RouteObject) {
		// Check if the current route has both id and path
		if (route.id && route.path) {
			result.push({
				id: route.id,
				path: route.path,
			});
		}

		// Recursively check children if they exist
		if (route.children && route.children.length > 0) {
			route.children.forEach((childRoute) => traverse(childRoute));
		}
	}

	// Start traversal for each top-level route
	routes.forEach((route) => traverse(route));

	return result;
};

/**
 * Generates a structured array of menu items by matching a list of menu definitions with corresponding routes.
 *
 * @param menuList - An array of menu items (with potential nested children) that do not contain explicit path values.
 * @param routes - An array of route objects containing "id" and "path" properties, used to find matching route paths for each menu item.
 * @returns An array of RouteMenu items with the matched path from the routes; if no matching route is found for a menu item, that item is omitted.
 *
 * @remarks
 * This function recursively processes the menuList. For each item in the menu list, it finds a matching route by comparing the "id" property.
 * If a matched route is found, the menu item's "path" is set to the corresponding route's path. If the menu item has children, they are processed recursively.
 */
export const generateMenuItems = (
	menuList: PathlessMenu[],
	routes: Pick<RouteObject, "id" | "path">[],
): RouteMenu[] => {
	// base case:
	// menuList is empty || There is no id key and no children, return []
	if (menuList.length === 0 || routes.length === 0) return [];

	return menuList
		.map(({ id, name, children, icon }) => {
			if (!id) return null;

			// Find matching route to get path
			const matchingRoute = routes.find((route) => route.id === id);

			// Create base menu item with a default path value
			const menuItem: RouteMenu = {
				name: name || "",
				...(icon ? { icon } : {}),
				id,
				path: matchingRoute ? (matchingRoute.path as string) : "",
			};

			// Process children recursively if they exist
			if (children && children.length > 0) {
				const childMenuItems = generateMenuItems(children, routes);
				if (childMenuItems.length > 0) {
					menuItem.children = childMenuItems;
				}
			}

			return menuItem;
		})
		.filter(Boolean) as RouteMenu[]; // Filter out null values from missing ids
};
