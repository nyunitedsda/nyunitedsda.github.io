import type { Route } from "../../hooks/routes/types";
import type { RouteTabsItem, RouteTabsWithHrefItem } from "./types";

const mapRoutesToTabs = (routes: Route[], tabList: RouteTabsItem[]) => {
	return tabList
		.map((x) => {
			const route = routes.find((i) => i.path?.includes(x.tag));
			return route ? { ...x, href: route.path } : undefined;
		})
		.filter(
			(x): x is RouteTabsWithHrefItem =>
				x !== undefined && x.href !== undefined,
		);
};

export { mapRoutesToTabs };
