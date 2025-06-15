import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Tab from "@mui/material/Tab";
import Tabs, { type TabsProps } from "@mui/material/Tabs";
import type { SxProps, Theme } from "@mui/material/styles";
import {
	type FC,
	type SyntheticEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useLocation, useNavigate } from "react-router";
import useFormattedRoutes from "../../hooks/routes/useFormattedRoutes";
import TabPanel from "../TabPanel/TabPanel";
import { mapRoutesToTabs } from "./helpers";
import type { RoutedTabsProps } from "./types";

const panelSx: SxProps<Theme> = {
	"& a": {
		color: "primary.light",
	},
};

const tabsSx: SxProps<Theme> = {
	color: "text.primary",
	borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
	"& .MuiTabs-indicator": {
		color: "primary.light",
	},
	"& .Mui-selected": {
		color: (theme) => `${theme.palette.primary.light} !important`,
	},
};

const RoutedTabs: FC<RoutedTabsProps> = (props) => {
	const { tabItems, tabsProps, tabProps, tabPanelProps } = props;

	const [selectedTab, setSelectedTab] = useState<number>();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { routes } = useFormattedRoutes();

	const tabs = useMemo(() => {
		return mapRoutesToTabs(routes, tabItems);
	}, [routes, tabItems]);

	useEffect(() => {
		const currentTab = tabs.find((i) => pathname.indexOf(i.tag) > -1);

		if (currentTab && currentTab.href && selectedTab !== currentTab.id) {
			setSelectedTab(currentTab.id);
		}
	}, [tabs, selectedTab, pathname, navigate]);

	const handleChange = useCallback(
		(_event: SyntheticEvent, newValue: number) => {
			try {
				const path = tabs.find((i) => i.id === newValue)?.href;
				if (path) navigate(path);
			} catch (error) {
				console.error(error);
			}
		},
		[navigate, tabs],
	);

	return (
		<>
			{selectedTab ? (
				<>
					<Tabs
						{...(tabsProps as TabsProps)}
						onChange={handleChange}
						sx={{ ...tabsSx, ...tabsProps?.sx }}
						value={selectedTab}
					>
						{tabs.map((i) => (
							<Tab {...tabProps} key={i.label} label={i.label} value={i.id} />
						))}
					</Tabs>
					{tabs.map((i) => (
						<TabPanel
							{...tabPanelProps}
							index={i.id}
							key={i.label}
							sx={panelSx}
							value={selectedTab}
						>
							{typeof i.content === "string" ? (
								<Box dangerouslySetInnerHTML={{ __html: i.content }} />
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
