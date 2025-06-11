import type { MenuButtonStyle } from "./types";

export const menuButtonStyles: MenuButtonStyle = {
	activeBtnSx: {
		"&": {
			color: "primary.light",
			fontWeight: "bold",
		},
		"&:after": {
			content: '""',
			position: "absolute",
			bottom: 0,
			left: "25%",
			width: "50%",
			height: "3px",
			backgroundColor: "primary.light",
			borderRadius: "3px 3px 0 0",
		},
	},
	buttonSx: {
		color: "text.primary",
		display: "flex",
		fontSize: (theme) => theme.typography.body1.fontSize,
		"&:hover": {
			border: (theme) => `0.1px solid ${theme.palette.primary.light}`,
		},
	},
};
