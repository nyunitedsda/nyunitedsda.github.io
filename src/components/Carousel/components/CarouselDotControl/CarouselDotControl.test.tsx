import type { EmblaCarouselType } from "embla-carousel";
import {
	beforeEach,
	describe,
	expect,
	it,
	screen,
} from "../../../../utils/index.ts";
import { render } from "../../../../utils/vitest-setup.tsx";
import type { CarouselControlProps } from "../../types";
import CarouselDotControl from "./CarouselDotControl";
import { vi } from "vitest";

// Mock the useDotButton hook
vi.mock("./useDotButton", () => ({
	default: vi.fn(() => ({
		selectedIndex: 0,
		scrollSnaps: [0, 1, 2],
		onDotButtonClick: vi.fn(),
	})),
}));

const mockApi: Partial<EmblaCarouselType> = {
	scrollTo: vi.fn(),
	selectedScrollSnap: vi.fn(() => 0),
	scrollSnapList: vi.fn(() => [0, 1, 2]),
	on: vi.fn().mockReturnThis(),
};

const mockButtonClick = vi.fn();
const defaultProps: CarouselControlProps = {
	api: mockApi as EmblaCarouselType,
	onButtonClick: mockButtonClick,
};

describe("CarouselDotControl", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders the correct number of dot buttons", () => {
		render(<CarouselDotControl {...defaultProps} />);

		const dotButtons = screen.getAllByRole("button");
		expect(dotButtons).toHaveLength(3);
	});

	it("applies the correct CSS classes to dot buttons", () => {
		render(<CarouselDotControl {...defaultProps} />);

		const dotButtons = screen.getAllByRole("button");

		// First button should be selected
		expect(dotButtons[0]).toHaveClass("embla__dot", "embla__dot--selected");

		// Other buttons should not be selected
		expect(dotButtons[1]).toHaveClass("embla__dot");
		expect(dotButtons[1]).not.toHaveClass("embla__dot--selected");

		expect(dotButtons[2]).toHaveClass("embla__dot");
		expect(dotButtons[2]).not.toHaveClass("embla__dot--selected");
	});

	it("renders with no api provided", () => {
		render(<CarouselDotControl api={undefined} />);

		const dotButtons = screen.getAllByRole("button");
		expect(dotButtons).toHaveLength(3);
	});

	it("renders container with correct class", () => {
		const { container } = render(<CarouselDotControl {...defaultProps} />);

		const dotsContainer = container.querySelector(".embla__dots");
		expect(dotsContainer).toBeInTheDocument();
	});

	it("applies button type attribute correctly", () => {
		render(<CarouselDotControl {...defaultProps} />);

		const dotButtons = screen.getAllByRole("button");
		dotButtons.forEach((button) => {
			expect(button).toHaveAttribute("type", "button");
		});
	});
});
