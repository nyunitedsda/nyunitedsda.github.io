import ArrowBackIosNewRounded from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRounded from "@mui/icons-material/ArrowForwardIosRounded";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { type FC } from "react";
import type { CarouselArrowButtonProps, CarouselArrowControlProps } from "./types";
import useCarouselArrowButtons from "./useCarouselArrowButton";

const CarouselArrowButton: FC<CarouselArrowButtonProps> = (props) => {
	const { arrowDirection, children, ...restProps } = props;

	return (
		<IconButton
			className={`embla__button embla__button--${arrowDirection}`}
			type="button"
			color="primary"
			{...restProps}
		>
			{arrowDirection === "next" ? (
				<ArrowForwardIosRounded />
			) : (
				<ArrowBackIosNewRounded />
			)}
			{children}
		</IconButton>
	);
};


const CarouselArrowControl: FC<CarouselArrowControlProps> = ({ api, onButtonClick }) => {
	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = useCarouselArrowButtons(api, onButtonClick);

	return (
		<Stack
			className="embla__buttons"
			direction="row"
			sx={{
				justifyContent: { xs: 'space-between', md: 'flex-start' },
			}}
		>
			<CarouselArrowButton
				arrowDirection="prev"
				disabled={prevBtnDisabled}
				onClick={onPrevButtonClick}
			/>
			<CarouselArrowButton
				arrowDirection="next"
				disabled={nextBtnDisabled}
				onClick={onNextButtonClick}
			/>
		</Stack>
	);
}

export default CarouselArrowControl;