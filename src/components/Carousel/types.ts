import type { IconButtonProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import type { AutoplayOptionsType } from "embla-carousel-autoplay";
import type { PropsWithChildren, ReactNode } from "react";

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
	api: EmblaCarouselType | undefined;
	onButtonClick?: (emblaApi: EmblaCarouselType) => void;
	prevIcon?: ReactNode;
	nextIcon?: ReactNode;
	buttonProps?: Exclude<IconButtonProps, "children">;
}
export type { CarouselProps, CarouselControlProps };
