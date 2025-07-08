import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import type { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { type FC, memo, useCallback } from "react";
import { default as CarouselArrowControl } from "./components/CarouselArrowControl/CarouselArrowControl";
import { default as CarouselDotControl } from "./components/CarouselDotControl/CarouselDotControl";
import styles from "./styles";
import type { CarouselProps } from "./types";

const Carousel: FC<CarouselProps> = memo((props) => {
	const { children, options, sx, autoplay = false } = props;
	const autoplayOptions = autoplay
		? [
				Autoplay({
					playOnInit: true,
					delay: 5000, // 5 seconds between slides
					stopOnInteraction: false, // continue playing after user interaction
					stopOnMouseEnter: true, // pause on mouse hover
				}),
			]
		: [];

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			...options,
			watchDrag: false, // Disable watching drag for better performance
			inViewThreshold: 0.5, // Only consider slide in view when it's 50% visible
		},
		autoplayOptions,
	);

	// Optimize the button click callback
	const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
		const autoPlay = emblaApi?.plugins()?.autoplay;
		if (!autoPlay) return;

		const resetOrStop =
			autoPlay.options.stopOnInteraction === false
				? autoPlay.reset
				: autoPlay.stop;

		resetOrStop();
	}, []);

	return (
		<Box
			component="section"
			className="embla"
			sx={{ ...styles, ...(sx ? sx : {}) } as SxProps<Theme>}
		>
			<Stack direction="row" className="embla__viewport" ref={emblaRef}>
				<Stack direction="row" className="embla__container">
					{children}
				</Stack>
			</Stack>

			<Stack
				className="embla__controls"
				spacing={{ xs: 1, sm: 3 }}
				direction={{ xs: "column", sm: "row" }}
			>
				<CarouselArrowControl api={emblaApi} onButtonClick={onNavButtonClick} />
				<CarouselDotControl api={emblaApi} onButtonClick={onNavButtonClick} />
			</Stack>
		</Box>
	);
});

// Add display name for better debugging experience in React DevTools
Carousel.displayName = "Carousel";

export default Carousel;
