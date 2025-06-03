import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { type FC, memo, useCallback } from "react";
import { useNavigate } from "react-router";
import MenuDrawItem from "./MenuDrawerItem";
import SubMenuDrawerItem from "./SubMenuDrawerItem";
import type { MenuDrawerProps } from "./types";

const rootSx: SxProps<Theme> = {
	textAlign: "center",
	width: 350,
	height: "100%",
	p: 1,
	pt: 0,
};

const titleSx: SxProps<Theme> = {
	height: (theme) => `${theme.spacing(8)}`,
	borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
	justifyContent: "center",
	'& h5': {
		fontWeight: "bold",
		color: "primary.light",
		fontFamily: "inter",
	},
}


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
			<Stack sx={titleSx}	>
				<Typography variant="h5" >{title}</Typography>
			</Stack>

			{/* Menu List */}
			<List>
				{
					menuItems.map((item) => item?.children ?
						(
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
							<MenuDrawItem
								key={item.name}
								isActive={isActive(item.path)}
								disabled={item.name === "Login"}
								onClick={() => handleClick(item.path)}
								icon={item?.icon}
								text={item.name}
							/>
						)
					)}

				{/* TODO: Update menuItems with login  */}
			</List>
		</Stack>
	);
};

export default memo(MenuDrawer);
