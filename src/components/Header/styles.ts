import type { SxProps, Theme } from "@mui/material/styles";

export const activeMenuSx: SxProps<Theme> = {
	"& .MuiTypography-root": {},
	fontWeight: "bold",
	color: "primary.contrastText",
	backgroundColor: "primary.light",
	"& svg": {
		color: "primary.contrastText",
	},
};

export const menuDefaultSx: SxProps<Theme> = {
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
};

export const menuDrawerStyles: Record<string, SxProps<Theme>> = {
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
		width: 350,
		height: "100%",
		p: 1,
		pt: 0,
	},
};
