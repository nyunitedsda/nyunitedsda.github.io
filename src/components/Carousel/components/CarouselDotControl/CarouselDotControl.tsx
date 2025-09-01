import {
	type CarouselControlProps,
	type CarouselDotButtonProps,
	useDotButton,
} from "@components/Carousel";
import Stack from "@mui/material/Stack";
import type { FC } from "react";

const CarouselDotButton: FC<CarouselDotButtonProps> = (props) => {
	const { children, ...restProps } = props;

	return (
		<button type="button" {...restProps}>
			{children}
		</button>
	);
};

const CarouselDotControl: FC<CarouselControlProps> = ({
	api,
	onButtonClick,
}) => {
	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton({
		api,
		onButtonClick,
	});

	return (
		<Stack className="embla__dots" direction="row">
			{scrollSnaps.map((snap, index) => (
				<CarouselDotButton
					// biome-ignore lint/suspicious/noArrayIndexKey: Using index as key for simplicity in this example
					key={`${snap}-${index}`}
					onClick={() => onDotButtonClick(index)}
					className={"embla__dot".concat(
						index === selectedIndex ? " embla__dot--selected" : "",
					)}
				/>
			))}
		</Stack>
	);
};

export default CarouselDotControl;
