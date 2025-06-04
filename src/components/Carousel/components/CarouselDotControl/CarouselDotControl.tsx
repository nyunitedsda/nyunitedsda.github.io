import Stack from "@mui/material/Stack";
import type { FC } from "react";
import type { CarouselControlProps } from "../../types";
import type { CarouselDotButtonProps } from "./types";
import useDotButton from "./useDotButton";

const CarouselDotButton: FC<CarouselDotButtonProps> = (props) => {
	const { children, ...restProps } = props;

	return (
		<button type="button" {...restProps}>
			{children}
		</button>
	);
};

const CarouselDotControl: FC<CarouselControlProps> = ({ api, onButtonClick }) => {

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton({
		api,
		onButtonClick,
	});

	return (
		<Stack
			className="embla__dots"
			direction="row"
		>
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
	);
}

export default CarouselDotControl;
