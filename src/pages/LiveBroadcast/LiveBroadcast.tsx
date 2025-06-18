import { type FC, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import RoutedTabs from "../../components/RoutedTabs/RoutedTabs";
import type { RouteTabsItem } from "../../components/RoutedTabs/types";
import useFormattedRoutes from "../../hooks/routes/useFormattedRoutes";
import ArchiveStream from "./components/streamPlayers/ArchiveStream";
import LiveStream from "./components/streamPlayers/LiveStream";

const TAB_LIST: RouteTabsItem[] = [
	{
		content: <LiveStream />,
		id: 1,
		label: "Watch Live",
		tag: "live",
	},
	{
		content: <ArchiveStream />,
		id: 2,
		label: "Watch Archive",
		tag: "archive",
	},
];

const LiveBroadcast: FC = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { routes } = useFormattedRoutes();

	const watchRouteList = useMemo(() => {
		const results: string[] = [];
		routes
			.filter((i) => i?.path && i?.path.indexOf("watch") > -1)
			.forEach((i) => {
				if (i.children)
					i.children.forEach((ch) => ch?.path && results.push(ch?.path));
				else if (i.path) results.push(i.path);
			});
		return results;
	}, [routes]);

	useEffect(() => {
		if (pathname.indexOf("watch") > -1) {
			const filteredRoutes = watchRouteList.filter((i) => pathname.endsWith(i));
			if (filteredRoutes.length === 0)
				navigate(watchRouteList[0], { replace: true });
		}
	}, [watchRouteList, pathname]);

	return (
		<RoutedTabs
			tabsProps={{ "aria-label": "Terms and policies" }}
			tabItems={TAB_LIST}
		/>
	);
};

export default LiveBroadcast;
