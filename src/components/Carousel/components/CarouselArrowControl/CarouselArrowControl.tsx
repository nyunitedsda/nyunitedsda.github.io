import ArrowBackIosNewRounded from "@mui/icons-material/ArrowBackIosNewRounded";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import type { FC } from "react";
import type { CarouselControlProps } from "../../types";
import type { CarouselArrowButtonProps } from "./types";
import useCarouselArrowButtons from "./useCarouselArrowButton";

const CarouselArrowButton: FC<CarouselArrowButtonProps> = (props) => {
	const { arrowDirection, children, ...restProps } = props;

	return (
		<IconButton
			className={`embla__button embla__button--${arrowDirection}`}
			type="button"
			color="primary"
			{...restProps}
			size={restProps?.size}
		>
			{children}
		</IconButton>
	);
};

const CarouselArrowControl: FC<CarouselControlProps> = ({
	api,
	onButtonClick,
	prevIcon,
	nextIcon,
	buttonProps,
}) => {
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
				justifyContent: { xs: "space-between", md: "flex-start" },
			}}
		>
			<CarouselArrowButton
				{...buttonProps}
				arrowDirection="prev"
				disabled={prevBtnDisabled}
				onClick={onPrevButtonClick}
				children={prevIcon || <ArrowBackIosNewRounded />}
			/>
			<CarouselArrowButton
				{...buttonProps}
				arrowDirection="next"
				disabled={nextBtnDisabled}
				onClick={onNextButtonClick}
				children={nextIcon || <ArrowBackIosNewRounded sx={{transform: "rotate(180deg)"}} />}
			/>
		</Stack>
	);
};

export default CarouselArrowControl;
