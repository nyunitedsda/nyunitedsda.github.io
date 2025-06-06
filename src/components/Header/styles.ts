import type { SxProps, Theme } from "@mui/material/styles";
import type { BrandingStyle, HeaderStyle } from "./components/types";

type StyleExport = Record<string, SxProps<Theme>>;
type MenuItemStyleExport = StyleExport & {
	activeMenuItemSx: SxProps<Theme>;
	menuItemSx: SxProps<Theme>;
};

export const headerStyles: HeaderStyle = {
	desktopDisplaySx: {
		display: { xs: "none", md: "flex" },
	},
	desktopMenuSx: {
		display: { xs: "none", md: "flex" },
		flexGrow: 1,
		fontFamily: "Inter",
		justifyContent: "center",
	},
	hamburgerMenuSx: {
		display: {
			xs: "flex",
			md: "none",
		},
	},
	rootSx: {
		backgroundColor: "background.paper",
		height: (theme) => theme.spacing(8),
	},
};

export const brandingStyles: BrandingStyle = {
	brandingSx: {
		color: "primary.light",
		flexGrow: 1,
		fontFamily: "Inter",
		fontWeight: 700,
		textDecoration: "none",
	},
	logoSx: { display: { xs: "none", md: "flex" } },
	rootSx: {
		alignItems: "center",
		display: { xs: "flex" },
		flexGrow: 1,
		gap: 2,
		maxHeight: (theme) => theme.spacing(8),
	},
};

export const menuItemStyles: MenuItemStyleExport = {
	activeMenuItemSx: {
		backgroundColor: (theme) => theme.palette.primary.light,
		color: "primary.contrastText",
		fontWeight: "bold",
		"& svg": {
			color: "primary.contrastText",
		},
	},
	menuItemSx: {
		backgroundColor: "transparent",
		color: "text.primary",
		pl: 3,
		"&:hover": {
			backgroundColor: "action.hover",
		},
		"& svg": {
			color: "text.primary",
		},
	},
};

export const menuDrawerStyles: StyleExport = {
	rootSx: {
		height: "100%",
		p: 1,
		pt: 0,
		textAlign: "center",
		width: "100%",
	},
	titleSx: {
		borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
		height: (theme) => theme.spacing(8),
		justifyContent: "center",
		"& h5": {
			color: "primary.light",
			fontFamily: "inter",
			fontWeight: "bold",
		},
	},
};
