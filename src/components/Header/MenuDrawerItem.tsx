import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";
import type { FC } from "react";
import type { MenuDrawerItemProps } from "./types";

const activeSx: SxProps<Theme> = {
  "& .MuiTypography-root": {},
  fontWeight: 'bold',
  color: "primary.contrastText",
  bgcolor: "primary.light",
  '& svg': {
    color: "primary.contrastText",
  },
}

const listButtonSx: SxProps<Theme> = {
  borderRadius: 0.5,
  color: "text.secondary",
  bgcolor: "transparent",
  "&:hover": {
    bgcolor: "action.hover",
    // 	color: "primary.contrastText",
    // bgcolor: "primary.light",
  },
  '& svg': {
    color: "text.secondary",
  },
}


const MenuDrawItem: FC<MenuDrawerItemProps> = ({
  disabled,
  icon,
  isActive,
  onClick,
  text,
  expandedIcon,
}) => (
  <ListItemButton
    className={isActive ? 'active-menu' : ''}
    disabled={disabled}
    onClick={onClick}
    sx={{
      ...listButtonSx,
      ...(isActive ? activeSx : {})
    }}
  >

    <ListItemIcon	>{icon}</ListItemIcon>

    <ListItemText primary={text} />

    {expandedIcon && (<ListItemIcon sx={{ justifyContent: 'flex-end' }}>{expandedIcon}</ListItemIcon>)}
  </ListItemButton >
);

export default MenuDrawItem;