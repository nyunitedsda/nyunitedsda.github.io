import type { TabProps } from "@mui/material";
import type { TabPanelProps } from "../TabPanel/types";
import type { ReactNode } from "react";

interface RoutedTabsProps {
  tabItems: RouteTabsItem[];
  tabsProps?: Omit<TabProps, 'children' | 'value' | 'onChange'>;
  tabProps?: Omit<TabProps, 'value' | 'label'>;
  tabPanelProps?: Omit<TabPanelProps, 'index' | 'value' | 'children'>;
}

interface RouteTabsItem {
	id: number;
	tag: string;
	label: string;
	content: string | ReactNode;
}

interface RouteTabsWithHrefItem extends RouteTabsItem {
	href: string;
}

export type { RoutedTabsProps, RouteTabsItem, RouteTabsWithHrefItem };
