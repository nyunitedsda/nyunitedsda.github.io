import type { MouseEvent, ReactNode } from "react";
import type { RouteMenu } from "../../hooks/routes/types";

export interface MenuDrawerProps {
	menuItems: RouteMenu[];
	title: ReactNode;
	isActive: (path: string) => boolean;
	toggleDrawer: () => void;
}

export interface MenuDrawerItemProps {
	disabled?: boolean;
	icon?: ReactNode;
	expandedIcon?: ReactNode;
	isActive: boolean;
	text: string;
	onClick: (event?: MouseEvent) => void;
}

export interface SubMenuDrawerItemProps extends RouteMenu {
	isActiveChild: (path: string) => boolean;
	isActiveParent: boolean;
	onClick: (path: string) => void;
}
