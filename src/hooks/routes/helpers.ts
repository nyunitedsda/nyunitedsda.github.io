import type { RouteObject } from "react-router";
import type { PathlessMenu, RouteMenu } from "./types";

// Type for routes with id property (matching the one in reviewedRoutes)
type RouteWithId = RouteObject & { id?: string };

/**
 * Extracts id and path from routes that have both properties
 * @param routes - The nested routes array (can include RouteWithId types)
 * @returns Array of objects containing only id and path properties
 */
export const extractRouteIdAndPath = (
	routes: (RouteObject | RouteWithId)[],
): Array<{ id: string; path: string }> => {
	const result: Array<{ id: string; path: string }> = [];

	function traverse(route: RouteObject | RouteWithId) {
		// Check if the current route has both id and path
		if ("id" in route && route.id && route.path) {
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
 * Now optimized with a Map for O(1) route lookups instead of O(n) array searches.
 */
export const generateMenuItems = (
	menuList: PathlessMenu[],
	routes: Array<{ id: string; path: string }>,
): RouteMenu[] => {
	// Early return for empty inputs
	if (menuList.length === 0 || routes.length === 0) return [];

	// Create a Map for O(1) route lookups instead of O(n) array searches
	const routeMap = new Map(routes.map((route) => [route.id, route.path]));

	const processMenuItem = (menuItem: PathlessMenu): RouteMenu | null => {
		const { id, name, children, icon } = menuItem;

		if (!id) return null;

		// Get path from the optimized Map lookup
		const path = routeMap.get(id);

		// Skip menu items without matching routes
		if (!path) return null;

		// Create base menu item
		const routeMenuItem: RouteMenu = {
			id,
			name: name || "",
			path,
			...(icon && { icon }),
		};

		// Process children recursively if they exist
		if (children && children.length > 0) {
			const childMenuItems = children
				.map(processMenuItem)
				.filter((item): item is RouteMenu => item !== null);

			if (childMenuItems.length > 0) {
				routeMenuItem.children = childMenuItems;
			}
		}

		return routeMenuItem;
	};

	// Process all menu items and filter out null results
	return menuList
		.map(processMenuItem)
		.filter((item): item is RouteMenu => item !== null);
};

/**
 * Finds a specific route by ID in the routes array
 * @param routes - Array of routes to search
 * @param targetId - ID of the route to find
 * @returns The matching route or undefined if not found
 */
export const findRouteById = (
	routes: (RouteObject | RouteWithId)[],
	targetId: string,
): RouteWithId | undefined => {
	for (const route of routes) {
		// Check current route
		if ("id" in route && route.id === targetId) {
			return route as RouteWithId;
		}

		// Recursively check children
		if (route.children && route.children.length > 0) {
			const found = findRouteById(route.children, targetId);
			if (found) return found;
		}
	}
	return undefined;
};

/**
 * Gets all route IDs from the routes array
 * @param routes - Array of routes to extract IDs from
 * @returns Array of all route IDs
 */
export const getAllRouteIds = (
	routes: (RouteObject | RouteWithId)[],
): string[] => {
	const ids: string[] = [];

	function traverse(route: RouteObject | RouteWithId) {
		if ("id" in route && route.id) {
			ids.push(route.id);
		}

		if (route.children && route.children.length > 0) {
			route.children.forEach(traverse);
		}
	}

	routes.forEach(traverse);
	return ids;
};

/**
 * Validates that all menu items have corresponding routes
 * @param menuList - List of menu items to validate
 * @param routes - Array of routes to validate against
 * @returns Object containing validation results
 */
export const validateMenuRoutes = (
	menuList: PathlessMenu[],
	routes: Array<{ id: string; path: string }>,
): { valid: boolean; missingRoutes: string[]; validCount: number } => {
	const routeIds = new Set(routes.map((route) => route.id));
	const missingRoutes: string[] = [];
	let validCount = 0;

	function validateMenuItem(item: PathlessMenu) {
		if (item.id) {
			if (routeIds.has(item.id)) {
				validCount++;
			} else {
				missingRoutes.push(item.id);
			}
		}

		if (item.children) {
			item.children.forEach(validateMenuItem);
		}
	}

	menuList.forEach(validateMenuItem);

	return {
		valid: missingRoutes.length === 0,
		missingRoutes,
		validCount,
	};
};
