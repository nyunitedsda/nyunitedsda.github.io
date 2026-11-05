import type { RoutedTabsProps } from "@components/RoutedTabs";
import Skeleton from "@mui/material/Skeleton";

import { Tabs } from "antd";
import {
	type FC,
	type ReactNode,
	useCallback,
	useEffect,
	useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router";

const RoutedTabs: FC<RoutedTabsProps> = (props) => {
	const { baseUrl, tabItems } = props;

	const [activeTabKey, setActiveTabKey] = useState<string>('');
	const { tab } = useParams();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		if (tabItems.length === 0) return;

		try {
			let currentTab = tabItems.find((i) => i.tag === tab);

			if (!currentTab) {
				currentTab = tabItems.find((i) => i.tag === pathname.split("/").pop());
			}

			if (currentTab?.id) {
				setActiveTabKey(currentTab.tag);
			} else if (pathname.includes(baseUrl)) {
				// If no matching tab found but we're on the base URL, default to first tab
				navigate(`${baseUrl}/${tabItems[0].tag}`, { replace: true });
				setActiveTabKey(tabItems[0].tag);
			}
		} catch (error) {
			console.error("Error setting selected tab:", error);
			if (pathname.includes(baseUrl) && tabItems.length > 0) {
				navigate(`${baseUrl}/${tabItems[0].tag}`, { replace: true });
				setActiveTabKey(tabItems[0].tag);
			}
		}
	}, [baseUrl, tab, pathname, tabItems, navigate]);

	const _handleChange2 = useCallback((key: string) => {
		try {
			const path = tabItems.find((i) => i.tag === key)?.tag;
			if (path) {
				navigate(`${baseUrl}/${path}`);
				setActiveTabKey(key);
				navigate(`${baseUrl}/${path}`);
			}
		} catch (error) {
			console.error(error);
		}

	}, [tabItems, navigate, baseUrl]);

	return (
		<>
			{activeTabKey ? (
				<Tabs
					activeKey={activeTabKey}
					onChange={_handleChange2}
					items={[
						...tabItems.map((i) =>
						({
							key: i.tag,
							label: i.label,
							children: i.content as ReactNode
						}))]
					} />
			) : (
				<Skeleton variant="rectangular" width="100%" height="100%" />
			)}
		</>
	);
};

export default RoutedTabs;
