import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";
import { useCallback, type FC, type MouseEvent } from "react";
import type { MenuDrawerItemProps } from "./types";

const activeSx: SxProps<Theme> = {
	fontWeight: "bold",
	color: "primary.contrastText",
	bgcolor: "primary.light",
	"& svg": {
		color: "primary.contrastText",
	},
};

const listButtonSx: SxProps<Theme> = {
	borderRadius: 0.5,
	color: "text.secondary",
	bgcolor: "transparent",
	"&:hover": {
		// color: "primary.contrastText",
		bgcolor: "action.hover",
	},
	"& svg": {
		color: "text.secondary",
	},
};

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
			sx={{
				...listButtonSx,
				...(isActive ? activeSx : {}),
			}}
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
