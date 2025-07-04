import type { IconButtonProps } from "@mui/material/IconButton";

interface CarouselArrowButtonProps extends IconButtonProps {
	arrowDirection: "next" | "prev";
}

type UseCarouselArrowButtonsType = {
	prevBtnDisabled: boolean;
	nextBtnDisabled: boolean;
	onPrevButtonClick: () => void;
	onNextButtonClick: () => void;
};

export type { CarouselArrowButtonProps, UseCarouselArrowButtonsType };
