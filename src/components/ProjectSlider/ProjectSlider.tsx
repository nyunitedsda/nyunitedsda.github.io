import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import type { FC } from "react";
import Slider, { type Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import type { ProjectSliderProps } from "./types";

const rootSx: SxProps<Theme> = {
	"& .slick-list": {
		height: "100%",
	},
	"& .slick-slider": {
		height: "100%",
	},
	"& .slick-track": {
		height: "100%",
	},
	"& .slick-dots": {
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		width: "100%",
		textAlign: "center",
		bottom: 0,
		position: "relative",
		"& button::before": {
			color: "text.primary",
			fontSize: (theme) => `${theme.spacing(1)}`,
		},
		"& .slick-active button::before": {
			color: "primary.light",
		},
	},
	"& .slick-arrow": {
		// background: 'primary.light',
	},
	"& .slick-prev": {
		left: "-35px",
	},
	"& .slick-next:before, .slick-prev:before": {
		color: { xs: "unset", md: "primary.light" },
		fontSize: (theme) => `${theme.spacing(4.5)}`,
	},
};

const DEFAULT_SETTINGS: Settings = {
	adaptiveHeight: false,
	autoplaySpeed: 7000,
	dots: true,
	infinite: true,
	slidesToScroll: 1,
	slidesToShow: 1,
	useCSS: true,
};

const ProjectSlider: FC<ProjectSliderProps> = (props) => {
	const { children, settings, sx } = props;

	return (
		<Stack className="slider-container" sx={{ ...rootSx, ...sx }}>
			<Slider {...{ ...DEFAULT_SETTINGS, ...settings }}>{children}</Slider>
		</Stack>
	);
};

export default ProjectSlider;
