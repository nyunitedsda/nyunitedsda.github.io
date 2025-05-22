import type { RouteObject } from "react-router";
import { formatRoutes, generateMenuItems } from "./helpers";
import siteRoutes from "./siteRoutes";
import type { FormattedRoutes, RouteMenu } from "./types";

const useFormattedRoutes = (): FormattedRoutes => {
	const routes: RouteObject[] = formatRoutes(siteRoutes);
	const menuItems: RouteMenu[] = generateMenuItems(siteRoutes);

	return { menuItems, routes };
};

export default useFormattedRoutes;
