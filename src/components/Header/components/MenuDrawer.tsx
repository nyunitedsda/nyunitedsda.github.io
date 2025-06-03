import ArticleRounded from "@mui/icons-material/ArticleRounded";
import ContactMailRounded from "@mui/icons-material/ContactMailRounded";
import Diversity3Rounded from "@mui/icons-material/Diversity3Rounded";
import HomeRounded from "@mui/icons-material/HomeRounded";
import LiveTvRounded from "@mui/icons-material/LiveTvRounded";
import LoginRounded from "@mui/icons-material/LoginRounded";
import VolunteerActivismRounded from "@mui/icons-material/VolunteerActivismRounded";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import { type FC, type ReactNode, memo, useCallback } from "react";
import { useNavigate } from "react-router";
import { menuDrawerStyles } from "../styles";
import MenuDrawerItem from "./MenuDrawerItem";
import SubMenuDrawerItem from "./SubMenuDrawerItem";
import type { MenuDrawerProps } from "./types";
import OrganizationBranding from "./OrganizationBranding";

const { rootSx } = menuDrawerStyles;

const MENU_ICON_LIST: Record<string, ReactNode> = {
	ArticleRounded: <ArticleRounded />,
	ContactMailRounded: <ContactMailRounded />,
	Diversity3Rounded: <Diversity3Rounded />,
	HomeRounded: <HomeRounded />,
	LiveTvRounded: <LiveTvRounded />,
	LoginRounded: <LoginRounded />,
	VolunteerActivismRounded: <VolunteerActivismRounded />,
};

const MenuDrawer: FC<MenuDrawerProps> = ({
	isActive,
	toggleDrawer,
	menuItems,
}) => {
	const navigate = useNavigate();

	const handleClick = useCallback((path: string) => {
		navigate(path);
		toggleDrawer();
	}, []);

	return (
		<Stack onClick={toggleDrawer} sx={rootSx}>
			<OrganizationBranding isLogoVisible={false} />

			{/* Menu List */}
			<List>
				{menuItems.map((item) =>
					item?.children ? (
						<SubMenuDrawerItem
							{...item}
							key={item.name}
							isActiveChild={isActive}
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
					),
				)}
			</List>
		</Stack>
	);
};

export default memo(MenuDrawer);
