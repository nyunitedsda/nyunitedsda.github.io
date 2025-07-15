import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined";
import ArticleRounded from "@mui/icons-material/ArticleRounded";
import ContactMailRounded from "@mui/icons-material/ContactMailRounded";
import Diversity3Rounded from "@mui/icons-material/Diversity3Rounded";
import HomeRounded from "@mui/icons-material/HomeRounded";
import LiveTvRounded from "@mui/icons-material/LiveTvRounded";
import LoginRounded from "@mui/icons-material/LoginRounded";
import VolunteerActivismRounded from "@mui/icons-material/VolunteerActivismRounded";
import type { FC, ReactNode } from "react";
import type { RouteMenu } from "../../../../hooks/routes/types";
import MenuDrawerItem from "../MenuDrawerItem";
import SubMenuDrawerItem from "../SubMenuDrawerItem";

interface MenuItemRendererProps {
	item: RouteMenu;
	isActive: (path: string) => boolean;
	handleClick: (path: string) => void;
}

const MENU_ICON_LIST: Record<string, ReactNode> = {
	ArticleRounded: <ArticleRounded />,
	ContactMailRounded: <ContactMailRounded />,
	Diversity3Rounded: <Diversity3Rounded />,
	HomeRounded: <HomeRounded />,
	LiveTvRounded: <LiveTvRounded />,
	LoginRounded: <LoginRounded />,
	VolunteerActivismRounded: <VolunteerActivismRounded />,
	AdminPanelSettingsOutlined: <AdminPanelSettingsOutlined />,
};

const MenuItemRenderer: FC<MenuItemRendererProps> = ({
	item,
	isActive,
	handleClick,
}) => {
	return item?.children ? (
		<SubMenuDrawerItem
			{...item}
			key={item.name}
			isActiveChild={(path: string) => isActive(path)}
			isActiveParent={
				item?.children?.some((child) => isActive(child.path)) || false
			}
			onClick={handleClick}
			icon={MENU_ICON_LIST[item?.icon as string]}
		/>
	) : (
		<MenuDrawerItem
			key={item.name}
			isActive={isActive(item.path)}
			disabled={item.name === "Login"}
			onClick={() => handleClick(item.path)}
			icon={MENU_ICON_LIST[item?.icon as string]}
			text={item.name}
		/>
	);
};

export default MenuItemRenderer;
