import type { ComponentPropsWithRef } from "react";

type CarouselDotButtonProps = ComponentPropsWithRef<"button">;

type UseDotButtonType = {
	selectedIndex: number;
	scrollSnaps: number[];
	onDotButtonClick: (index: number) => void;
};

export type { CarouselDotButtonProps, UseDotButtonType };
