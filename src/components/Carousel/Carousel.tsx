import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import type { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { type FC, useCallback } from "react";
import CarouselArrowButton from "./components/CarouselArrowButton/CarouselArrowButton";
import useCarouselArrowButtons from "./components/CarouselArrowButton/useCarouselArrowButton";
import CarouselDotButton from "./components/CarouselDotButton/CarouselDotButton";
import useDotButton from "./components/CarouselDotButton/useDotButton";
import styles from "./styles";
import type { CarouselProps } from "./types";

const Carousel: FC<CarouselProps> = (props) => {
	const { children, options, sx, autoplay = false } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		...(autoplay ? [Autoplay()] : []),
	]);

	const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;

		const resetOrStop =
			autoplay.options.stopOnInteraction === false
				? autoplay.reset
				: autoplay.stop;

		resetOrStop();
	}, []);

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
		emblaApi,
		onNavButtonClick,
	);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = useCarouselArrowButtons(emblaApi, onNavButtonClick);

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
				<Stack direction="row" className="embla__buttons">
					<CarouselArrowButton
						arrowDirection="prev"
						onClick={onPrevButtonClick}
						disabled={prevBtnDisabled}
					/>
					<CarouselArrowButton
						arrowDirection="next"
						onClick={onNextButtonClick}
						disabled={nextBtnDisabled}
					/>
				</Stack>

				<Stack direction="row" className="embla__dots">
					{scrollSnaps.map((_, index) => (
						<CarouselDotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							className={"embla__dot".concat(
								index === selectedIndex ? " embla__dot--selected" : "",
							)}
						/>
					))}
				</Stack>
			</Stack>
		</Box>
	);
};

export default Carousel;
