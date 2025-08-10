import RoutedTabs from "@components/RoutedTabs";
import type { FC } from "react";
import { TAB_LIST } from "./constants";

const LiveBroadcast: FC = () => {
	return (
		<RoutedTabs
			baseUrl="/watch"
			tabsProps={{ "aria-label": "Media streaming" }}
			tabItems={TAB_LIST}
		/>
	);
};

export default LiveBroadcast;
