import { useCallback, useEffect, useState } from "react";
import type { UseCarouselArrowButtonsType } from "./types";
import type { EmblaCarouselType } from "embla-carousel";

const useCarouselArrowButtons = (
	emblaApi: EmblaCarouselType | undefined,
	onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UseCarouselArrowButtonsType => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState<boolean>(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(true);

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollPrev();
		if (onButtonClick) onButtonClick(emblaApi);
	}, [emblaApi, onButtonClick]);

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollNext();
		if (onButtonClick) onButtonClick(emblaApi);
	}, [emblaApi, onButtonClick]);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on("reInit", onSelect).on("select", onSelect);
	}, [emblaApi, onSelect]);

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	};
};

export default useCarouselArrowButtons;
