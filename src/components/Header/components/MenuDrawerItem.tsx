import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { type FC, type MouseEvent, useCallback } from "react";
import type { MenuDrawerItemProps } from "./types";

const MenuDrawerItem: FC<MenuDrawerItemProps> = ({
	disabled = false,
	icon,
	isActive,
	onClick,
	text,
	expandedIcon,
	path = "",
}) => {
	const handleClick = useCallback(
		(event: MouseEvent) => {
			event.stopPropagation();
			if (!disabled) onClick(event);
		},
		[onClick],
	);

	return (
		<MenuItem
			disabled={disabled}
			onClick={handleClick}
			selected={isActive}
			aria-current={isActive ? "page" : undefined}
			data-path={path}
		>
			<ListItemIcon>{icon}</ListItemIcon>
			<ListItemText primary={text} />
			{expandedIcon && (
				<ListItemIcon sx={{ justifyContent: "flex-end" }}>
					{expandedIcon}
				</ListItemIcon>
			)}
		</MenuItem>
	);
};
export default MenuDrawerItem;
