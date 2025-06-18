import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import type { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { type FC, useCallback } from "react";
import { default as CarouselArrowControl } from "./components/CarouselArrowControl/CarouselArrowControl";
import { default as CarouselDotControl } from "./components/CarouselDotControl/CarouselDotControl";
import styles from "./styles";
import type { CarouselProps } from "./types";

const Carousel: FC<CarouselProps> = (props) => {
	const { children, options, sx, autoplay = false } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		...(autoplay ? [Autoplay()] : []),
	]);

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
};

export default Carousel;
