import type { SxProps, Theme } from "@mui/material/styles";
import type { BrandingStyle, HeaderStyle } from "./components/types";

type StyleExport = Record<string, SxProps<Theme>>;
type MenuItemStyleExport = StyleExport & {
	menuItemSx: SxProps<Theme>;
	activeMenuItemSx: SxProps<Theme>;
};

export const headerStyles: HeaderStyle = {
	hamburgerMenuSx: {
		display: {
			xs: "flex",
			md: "none",
		},
	},
	rootSx: {
		backgroundColor: "background.paper",
		height: (theme) => `${theme.spacing(8)}`,
	},
	desktopMenuSx: {
		flexGrow: 1,
		justifyContent: "center",
		fontFamily: "Inter",
		display: { xs: "none", md: "flex" },
	},
	desktopDisplaySx: {
		display: { xs: "none", md: "flex" },
	},
};

export const brandingStyles: BrandingStyle = {
	logoSx: { display: { xs: "none", md: "flex" } },
	rootSx: {
		flexGrow: 1,
		display: { xs: "flex" },
		alignItems: "center",
		gap: 2,
		maxHeight: (theme) => `${theme.spacing(8)}`,
	},
	brandingSx: {
		flexGrow: 1,
		fontWeight: 700,
		textDecoration: "none",
		fontFamily: "Inter",
		color: "primary.light",
	},
};

export const menuItemStyles: MenuItemStyleExport = {
	menuItemSx: {
		borderRadius: 0.5,
		color: "text.secondary",
		backgroundColor: "transparent",
		"&:hover": {
			backgroundColor: "action.hover",
			// 	color: "primary.contrastText",
			// backgroundColor: "primary.light",
		},
		"& svg": {
			color: "text.secondary",
		},
	},
	activeMenuItemSx: {
		fontWeight: "bold",
		color: "primary.contrastText",
		backgroundColor: (theme) => `${theme.palette.primary.light}`,
		"& svg": {
			color: "primary.contrastText",
		},
	},
};

export const menuDrawerStyles: StyleExport = {
	titleSx: {
		height: (theme) => `${theme.spacing(8)}`,
		borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
		justifyContent: "center",
		"& h5": {
			fontWeight: "bold",
			color: "primary.light",
			fontFamily: "inter",
		},
	},
	rootSx: {
		textAlign: "center",
		width: '100%',
		height: "100%",
		p: 1,
		pt: 0,
	},
};
