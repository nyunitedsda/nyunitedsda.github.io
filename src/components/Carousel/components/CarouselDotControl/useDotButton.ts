import type { EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";
import type { CarouselControlProps } from "../../types";
import type { UseDotButtonType } from "./types";

const useDotButton = ({
	api,
	onButtonClick,
}: CarouselControlProps): UseDotButtonType => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	const onDotButtonClick = useCallback(
		(index: number) => {
			if (!api) return;
			api.scrollTo(index);
			if (onButtonClick) onButtonClick(api);
		},
		[api, onButtonClick],
	);

	const onInit = useCallback((api: EmblaCarouselType) => {
		setScrollSnaps(api.scrollSnapList());
	}, []);

	const onSelect = useCallback((api: EmblaCarouselType) => {
		setSelectedIndex(api.selectedScrollSnap());
	}, []);

	useEffect(() => {
		if (!api) return;

		onInit(api);
		onSelect(api);
		api.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
	}, [api, onInit, onSelect]);

	return {
		selectedIndex,
		scrollSnaps,
		onDotButtonClick,
	};
};

export default useDotButton;
