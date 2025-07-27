import { createElement } from "react";
import type { RouteTabsItem } from "../../components/RoutedTabs/types";
import ArchiveStream from "./components/streamPlayers/ArchiveStream";
import LiveStream from "./components/streamPlayers/LiveStream";

export const TAB_LIST: RouteTabsItem[] = [
	{
		content: createElement(LiveStream),
		id: 1,
		label: "Watch Live",
		tag: "live",
	},
	{
		content: createElement(ArchiveStream),
		id: 2,
		label: "Watch Archive",
		tag: "archive",
	},
	{
		content: createElement(ArchiveStream),
		id: 3,
		label: "Watch Youtube Archive",
		tag: "youtube-archive",
	},
];
