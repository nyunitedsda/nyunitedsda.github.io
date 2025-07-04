import { useMemo } from "react";
import type { RouteObject } from "react-router";
import useAuthentication from "../auth/useAuthentication";
import { extractRouteIdAndPath, generateMenuItems } from "./helpers";
import pathlessMenuItems, { protectedMenuItems } from "./pathlessMenuItems";
import siteRoutes, { fallbackRoutes, mainLayoutRoutes } from "./reviewedRoutes";
import type { FormattedRoutes, RouteMenu } from "./types";

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
	const { isAuthenticated } = useAuthentication();

	const { finalRoutes, menuItemList } = useMemo(() => {
		const finalRoutes: RouteObject[] = isAuthenticated
			? siteRoutes
			: [...mainLayoutRoutes, ...fallbackRoutes];

		const menuList = isAuthenticated
			? [...pathlessMenuItems, ...protectedMenuItems]
			: pathlessMenuItems;

		const routeIdAndPath = extractRouteIdAndPath(finalRoutes);

		const menuItemList: RouteMenu[] = generateMenuItems(
			menuList,
			routeIdAndPath,
		);

		return { finalRoutes, menuItemList };
	}, [isAuthenticated]);

	return { menuItems: menuItemList, routes: finalRoutes };
};

export default useFormattedRoutes;
