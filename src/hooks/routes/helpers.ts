import type { RouteObject } from "react-router";
import type { RouteMenu } from "./types";

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

export const generateMenuItems = (routes: any[]): RouteMenu[] => {
	return routes.reduce<RouteMenu[]>((acc, i) => {
		if (i.name || i.icon || i.path) {
			acc.push({
				name: i.name ?? "",
				path: i.path ?? "",
				icon: i.icon,
			});
		}
		if (i.children) {
			acc.push(...generateMenuItems(i.children));
		}
		return acc;
	}, []);
};
