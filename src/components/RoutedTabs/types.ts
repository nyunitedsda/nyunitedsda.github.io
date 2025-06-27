import type { TabProps } from "@mui/material";
import type { FC, ReactNode } from "react";
import type { TabPanelProps } from "../TabPanel/types";

interface RoutedTabsProps {
	baseUrl?: string;
	tabItems: RouteTabsItem[];
	tabsProps?: Omit<TabProps, "children" | "value" | "onChange">;
	tabProps?: Omit<TabProps, "value" | "label">;
	tabPanelProps?: Omit<TabPanelProps, "index" | "value" | "children">;
}

interface RouteTabsItem {
	id: number;
	tag: string;
	label: string;
	content: string | ReactNode | FC;
}

interface RouteTabsWithHrefItem extends RouteTabsItem {
	href: string;
}

export type { RoutedTabsProps, RouteTabsItem, RouteTabsWithHrefItem };
