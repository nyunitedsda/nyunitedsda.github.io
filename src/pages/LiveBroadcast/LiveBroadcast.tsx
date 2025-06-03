"use client";

import { type FC } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import RoutedTabs from "../../components/RoutedTabs/RoutedTabs";
import type { RouteTabsItem } from "../../components/RoutedTabs/types";
import ArchiveStream from "./components/streamPlayers/ArchiveStream";
import LiveStream from "./components/streamPlayers/LiveStream";

// const LIVE_SERVICE = "Live Worship Service";
// const NEXT_SERVICE = "Join Us for Our Next Service";
const TAB_LIST: RouteTabsItem[] = [
	{
		content: <LiveStream />,
		id: 1,
		label: 'Watch Live',
		tag: 'live',
	},
	{
		content: <ArchiveStream />,
		id: 2,
		label: 'Watch Archives',
		tag: 'archive',
	},
]

const LiveBroadcast: FC = () => {

	return (
		<PageWrapper >
			<RoutedTabs
				tabsProps={{ "aria-label": "Terms and policies" }}
				tabItems={TAB_LIST}
			/>

		</PageWrapper>
	);
};

export default LiveBroadcast;
