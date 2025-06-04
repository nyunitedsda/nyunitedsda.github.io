import type { SxProps, Theme } from "@mui/material/styles";

const carouselStyle: SxProps<Theme> = {
	overflow: "hidden",

	"& .embla__controls": {
		width: "100%",
		justifyContent: "space-between",
		flexWrap: "nowrap",
		gap: { xs: 1, sm: 3 },
		p: 2,

		// "& .embla__buttons": {
		// 	alignItems: "center",
		// 	justifyContent: {
		// 		xs: "space-around",
		// 		sm: "flex-start",
		// 	},

		// 	"& .MuiButtonBase-root:not(.Mui-disabled)": {
		// 		// Insert your styles for elements without the .Mui-disabled class here.
		// 		color: "primary.main",
		// 	},

		// 	"& .embla__button__svg": {
		// 		// width: (theme) => `${theme.spacing(2)}`,
		// 		// height: (theme) => `${theme.spacing(2)}`,
		// 	},
		// },

		"& .embla__dots": {
			flexGrow: 1,
			justifyContent: { xs: "center", sm: "flex-end" },
			alignItems: "center",
			gap: 1,
			overflow: "clip", // TODO: investigate

			"& .embla__dot": {
				touchAction: "manipulation",
				display: "inline-flex",
				textDecoration: "none",
				cursor: "pointer",
				p: 0.5,
				height: (theme) => `${theme.spacing(1.5)}`,
				width: (theme) => `${theme.spacing(1.5)}`,
				borderRadius: "50%",
				border: (theme) => `1px solid ${theme.palette.action.active}`,
				backgroundColor: "transparent",
			},
			"& .embla__dot--selected": {
				backgroundColor: "primary.light",
				boxShadow: 3,
				border: 0,
			},
		},
	},
	"& .embla__viewport": {
		overflow: "hidden",

		"& .embla__container": {
			touchAction: "pan-y pinch-zoom",

			"& .embla__slide": {
				flex: "0 0 100%",
				width: "100%",
				mx: "auto",
				"& img": {
					height: { xs: "auto", md: "100%" },
					width: { xs: "100%", md: "auto" },
				},
			},
		},
	},
};

export default carouselStyle;

/*
xs, extra-small: 0px
sm, small: 600px
md, medium: 900px
lg, large: 1200px
xl, extra-large: 1536px

*/
