import type { ReactNode } from "react";
import type { NavItem } from "../../constants/navItems";

export interface MenuDrawerProps {
	menuItems: NavItem[];
	title: ReactNode;
	isActive: (path: string) => boolean;
	toggleDrawer: () => void;
}
