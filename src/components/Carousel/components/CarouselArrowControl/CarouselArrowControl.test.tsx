
import type { EmblaCarouselType } from "embla-carousel";
import { render } from "../../../../utils/vitest-setup";
import CarouselArrowControl from "./CarouselArrowControl";
import type { CarouselArrowControlProps } from "./types";

const mockButtonClick = vi.fn();
const defaultProps: CarouselArrowControlProps = {
	api: {} as EmblaCarouselType,
	onButtonClick: mockButtonClick,
}

describe("CarouselArrowControl", () => {
	it("renders CarouselArrowControl", () => {
		const { getByText } = render(
			<CarouselArrowControl {...defaultProps} />,
		);

		expect(getByText("CarouselArrowControl Component")).toBeInTheDocument();
	});
});
