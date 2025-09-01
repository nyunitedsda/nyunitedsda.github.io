import type { SxProps, Theme } from "@mui/material/styles";

const imageRootSx: SxProps<Theme> = {
	width: "100%",
	display: "flex",
	justifyContent: "center",
	height: (theme) => `${theme.spacing(11)}`,
	p: 1,
};

const cardContainerSx: SxProps<Theme> = {
	alignItems: { xs: "center", md: "flex-start" },
	flexWrap: "wrap",
	gap: 2,
	width: "100%",
	"& .MuiPaper-root": {
		height: (theme) => `${theme.spacing(36)}`,
		maxWidth: { md: "32%" },
	},
	"& .MuiCardActions-root": {
		p: 0,
		justifyContent: "center",
		maxHeight: (theme) => `${theme.spacing(9)}`,
		width: "100%",
	},
};

const rootSx: SxProps<Theme> = {
	flexGrow: 1,
	width: "100%",
	gap: 5,
	pb: 2,
};

const HOME_CONSTANTS = {
	MINISTRIES_HEADER: "Ministries Links",
	imageRootSx,
	cardContainerSx,
	rootSx,
};

export { HOME_CONSTANTS };
