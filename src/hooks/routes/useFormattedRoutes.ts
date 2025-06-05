import type { RouteObject } from "react-router";
import { extractRouteIdAndPath, generateMenuItems } from "./helpers";
import type { FormattedRoutes, RouteMenu } from "./types";
import pathlessMenuItems from "./pathlessMenuItems";
import siteRoutes from "./reviewedRoutes";
import { useMemo } from "react";

/**
 * Custom hook to retrieve formatted routes and corresponding menu items for the application.
 *
 * This hook performs the following operations:
 * - Memoizes the application's site routes.
 * - Extracts a mapping from route IDs to their respective paths.
 * - Generates menu items based on the extracted route data and predefined pathless menu items.
 *
 * @returns A FormattedRoutes object containing:
 *   - routes: The memoized array of RouteObject representing the application routes.
 *   - menuItems: An array of RouteMenu items for use in navigation components.
 */
const useFormattedRoutes = (): FormattedRoutes => {
	const routes: RouteObject[] = useMemo(() => siteRoutes, []);
	const routeIdAndPath = extractRouteIdAndPath(siteRoutes);

	const menuItems: RouteMenu[] = generateMenuItems(
		pathlessMenuItems,
		routeIdAndPath,
	);

	return { menuItems, routes };
};

export default useFormattedRoutes;
