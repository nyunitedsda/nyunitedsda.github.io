import type { ButtonProps } from "@mui/material";
import type { EmblaCarouselType } from "embla-carousel";

interface CarouselArrowButtonProps extends ButtonProps {
	arrowDirection: "next" | "prev";
}

type UseCarouselArrowButtonsType = {
	prevBtnDisabled: boolean;
	nextBtnDisabled: boolean;
	onPrevButtonClick: () => void;
	onNextButtonClick: () => void;
};

interface CarouselArrowControlProps {
	api: EmblaCarouselType | undefined; //emblaApi
	onButtonClick?: (emblaApi: EmblaCarouselType) => void;
}

export type {
	CarouselArrowButtonProps,
	CarouselArrowControlProps,
	UseCarouselArrowButtonsType,
};
