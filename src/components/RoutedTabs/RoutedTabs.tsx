import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import type { SxProps, Theme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs, { type TabsProps } from "@mui/material/Tabs";
import {
	type FC,
	type SyntheticEvent,
	useCallback,
	useEffect,
	useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import TabPanel from "../TabPanel/TabPanel";
import type { RoutedTabsProps } from "./types";

const panelSx: SxProps<Theme> = {
	"& a": {
		color: "primary.light",
	},
};

const tabsSx: SxProps<Theme> = {
	color: "text.primary",

	borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
	"& .MuiTab-root": {
		fontSize: "1rem",
	},
	"& .MuiTabs-indicator": {
		color: "primary.light",
	},
	"& .Mui-selected": {
		fontWeight: "bold",
		color: (theme) => `${theme.palette.primary.light} !important`,
	},
};

const RoutedTabs: FC<RoutedTabsProps> = (props) => {
	const { baseUrl, tabItems, tabsProps, tabProps, tabPanelProps } = props;

	const [selectedTabId, setSelectedTabId] = useState<number>();
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
				setSelectedTabId(currentTab.id);
			} else if (pathname.includes(baseUrl)) {
				// If no matching tab found but we're on the base URL, default to first tab
				navigate(`${baseUrl}/${tabItems[0].tag}`, { replace: true });
				setSelectedTabId(tabItems[0].id);
			}
		} catch (error) {
			console.error("Error setting selected tab:", error);
			if (pathname.includes(baseUrl) && tabItems.length > 0) {
				navigate(`${baseUrl}/${tabItems[0].tag}`, { replace: true });
				setSelectedTabId(tabItems[0].id);
			}
		}
	}, [baseUrl, tab, pathname, tabItems, navigate]);

	const handleChange = useCallback(
		(_event: SyntheticEvent, newValue: number) => {
			try {
				const path = tabItems.find((i) => i.id === newValue)?.tag;
				if (path) navigate(`${baseUrl}/${path}`);
			} catch (error) {
				console.error(error);
			}
		},
		[navigate, tabItems, baseUrl],
	);

	return (
		<>
			{selectedTabId ? (
				<>
					<Tabs
						{...(tabsProps as TabsProps)}
						onChange={handleChange}
						sx={{ ...tabsSx, ...tabsProps?.sx }}
						value={selectedTabId}
						variant="scrollable"
					>
						{tabItems.map((i) => (
							<Tab {...tabProps} key={i.label} label={i.label} value={i.id} />
						))}
					</Tabs>
					{tabItems.map((i) => (
						<TabPanel
							{...tabPanelProps}
							index={i.id}
							key={i.label}
							sx={panelSx}
							value={selectedTabId}
						>
							{typeof i.content === "string" ? (
								<Box dangerouslySetInnerHTML={{ __html: i.content }} />
							) : typeof i.content === "function" ? (
								<i.content />
							) : (
								i.content
							)}
						</TabPanel>
					))}
				</>
			) : (
				<Skeleton variant="rectangular" width="100%" height="100%" />
			)}
		</>
	);
};

export default RoutedTabs;
