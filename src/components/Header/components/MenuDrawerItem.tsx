import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";
import { type FC, type MouseEvent, useCallback } from "react";
import { menuItemStyles } from "../styles";
import type { MenuDrawerItemProps } from "./types";

const { activeMenuItemSx, menuItemSx } = menuItemStyles;

const MenuDrawerItem: FC<MenuDrawerItemProps> = ({
	disabled = false,
	icon,
	isActive,
	onClick,
	text,
	expandedIcon,
}) => {
	const handleClick = useCallback(
		(event: MouseEvent) => {
			event.stopPropagation();
			if (!disabled) onClick(event);
		},
		[onClick],
	);

	return (
		<ListItemButton
			disabled={disabled}
			onClick={handleClick}
			sx={
				{
					...menuItemSx,
					...(isActive ? activeMenuItemSx : {}),
				} as SxProps<Theme>
			}
			aria-current={isActive ? "page" : undefined}
		>
			<ListItemIcon>{icon}</ListItemIcon>
			<ListItemText primary={text} />
			{expandedIcon && (
				<ListItemIcon sx={{ justifyContent: "flex-end" }}>
					{expandedIcon}
				</ListItemIcon>
			)}
		</ListItemButton>
	);
};
export default MenuDrawerItem;
