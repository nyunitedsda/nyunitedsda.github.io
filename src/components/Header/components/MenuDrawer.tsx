import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, memo, useCallback } from "react";
import { useNavigate } from "react-router";
import { menuDrawerStyles } from "../styles";
import MenuDrawerItem from "./MenuDrawerItem";
import SubMenuDrawerItem from "./SubMenuDrawerItem";
import type { MenuDrawerProps } from "./types";


const { rootSx, titleSx } = menuDrawerStyles;


const MenuDrawer: FC<MenuDrawerProps> = ({
	isActive,
	toggleDrawer,
	title,
	menuItems,
}) => {
	const navigate = useNavigate();

	const handleClick = useCallback((path: string) => {
		navigate(path);
		toggleDrawer();
	}, []);

	return (
		<Stack onClick={toggleDrawer} sx={rootSx}>
			{/* Title block */}
			<Stack sx={titleSx}>
				<Typography variant="h5">{title}</Typography>
			</Stack>

			{/* Menu List */}
			<List>
				{menuItems.map((item) =>
					item?.children ? (
						<SubMenuDrawerItem
							key={item.name}
							isActiveChild={isActive}
							isActiveParent={
								item?.children?.some((child) => isActive(child.path)) || false
							}
							onClick={handleClick}
							{...item}
						/>
					) : (
						<MenuDrawerItem
							key={item.name}
							isActive={isActive(item.path)}
							disabled={item.name === "Login"}
							onClick={() => handleClick(item.path)}
							icon={item?.icon}
							text={item.name}
						/>
					),
				)}

				{/* TODO: Update menuItems with login  */}
			</List>
		</Stack>
	);
};

export default memo(MenuDrawer);
