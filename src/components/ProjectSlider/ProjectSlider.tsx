import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import type { FC } from "react";
import Slider, { type Settings } from "react-slick";
import type { ProjectSliderProps } from "./types";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

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
		bottom: 0, //'-25px',
		position: "relative",
	},
	'& .slick-arrow': {
		background: 'primary.main',
	},
};



const SliderArrow: FC = ({ className, style, onClick }) => {
  
  return (
    <div
      className={className}
      style={{ ...style, backgroundColor: "green" }}
      onClick={onClick}
    />
  );
}

const DEFAULT_SETTINGS: Settings = {
	adaptiveHeight: false,
	autoplaySpeed: 7000,
	dots: true,
	infinite: true,
	slidesToScroll: 1,
	slidesToShow: 1,
	useCSS: true,
	nextArrow: <SliderArrow/>,
	prevArrow: <SliderArrow/>,
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
