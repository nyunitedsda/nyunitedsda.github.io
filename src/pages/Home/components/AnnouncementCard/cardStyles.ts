import type { SxProps, Theme } from "@mui/material/styles";

const cardStyles: Record<string, SxProps<Theme>> = {
	headerSx: {
		bgcolor: (theme) => theme.palette.primary.main,
		"& .MuiTypography-root": {
			color: (theme) => theme.palette.primary.contrastText,
		},
		width: "100%",
	},
	contentSx: {},
	actionSx: {},
};

export default cardStyles;
