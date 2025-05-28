import type { ComponentPropsWithRef } from "react";

type CarouselArrowButtonProps = ComponentPropsWithRef<"button"> & {
	arrowDirection: "next" | "prev";
};

type UseCarouselArrowButtonsType = {
	prevBtnDisabled: boolean;
	nextBtnDisabled: boolean;
	onPrevButtonClick: () => void;
	onNextButtonClick: () => void;
};

export type { CarouselArrowButtonProps, UseCarouselArrowButtonsType };
