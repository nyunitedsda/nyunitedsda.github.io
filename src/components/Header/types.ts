import type { ReactNode } from "react";
import type { RouteMenu } from "../../hooks/routes/types";

export interface MenuDrawerProps {
	menuItems: RouteMenu[];
	title: ReactNode;
	isActive: (path: string) => boolean;
	toggleDrawer: () => void;
}
