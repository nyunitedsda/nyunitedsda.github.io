import type { ButtonProps } from "@mui/material/Button";

interface CarouselArrowButtonProps extends ButtonProps {
	arrowDirection: "next" | "prev";
}

type UseCarouselArrowButtonsType = {
	prevBtnDisabled: boolean;
	nextBtnDisabled: boolean;
	onPrevButtonClick: () => void;
	onNextButtonClick: () => void;
};

export type { CarouselArrowButtonProps, UseCarouselArrowButtonsType };
