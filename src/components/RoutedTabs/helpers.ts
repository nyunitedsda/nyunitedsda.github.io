import type { RouteObject } from "react-router";
import type { RouteTabsItem, RouteTabsWithHrefItem } from "./types";

const flattenRoutes = (routes: RouteObject[]): RouteObject[] => {
	const result: RouteObject[] = [];

	routes.forEach((route) => {
		if (route.path) {
			result.push(route);
		}

		if (route.children) {
			result.push(...flattenRoutes(route.children));
		}
	});

	return result;
};

/**
 * 
 * @param routes 
 * @param tabList 
 * @returns 
 */
const mapRoutesToTabs = (routes: RouteObject[], tabList: RouteTabsItem[]) => {
	const flatRoutes = flattenRoutes(routes);

	return tabList
		.map((x) => {
			const route = flatRoutes.find((i) => i.path?.includes(x.tag));
			return route ? { ...x, href: route.path } : undefined;
		})
		.filter(
			(x): x is RouteTabsWithHrefItem =>
				x !== undefined && x.href !== undefined,
		);
};

export { mapRoutesToTabs };
