import { render } from "@testing-library/react";
import type { EmblaCarouselType } from "embla-carousel";
import { describe, expect, it } from "vitest";
import type { CarouselControlProps } from "../../types";
import CarouselDotControl from "./CarouselDotControl";

const mockButtonClick = vi.fn();
const defaultProps: CarouselControlProps = {
	api: {} as EmblaCarouselType,
	onButtonClick: mockButtonClick,
};

describe("CarouselDotControl", () => {
	it("renders CarouselDotControl", () => {
		const { getByText } = render(<CarouselDotControl {...defaultProps} />);

		expect(getByText("CarouselDotControl Component")).toBeInTheDocument();
	});
});
