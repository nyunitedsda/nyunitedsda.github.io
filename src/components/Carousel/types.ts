import type { SxProps, Theme } from "@mui/material/styles";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import type { AutoplayOptionsType } from "embla-carousel-autoplay";
import type { PropsWithChildren } from "react";

type CarouselProps = PropsWithChildren<
	| {
			options?: EmblaOptionsType;
			sx?: SxProps<Theme>;
			autoplay?: boolean;
	  }
	| {
			options?: EmblaOptionsType;
			sx?: SxProps<Theme>;
			autoplay: true;
			userOptions: Partial<AutoplayOptionsType>;
	  }
>;

interface CarouselControlProps {
	api: EmblaCarouselType | undefined; //emblaApi
	onButtonClick?: (emblaApi: EmblaCarouselType) => void;
}
export type { CarouselProps, CarouselControlProps };
