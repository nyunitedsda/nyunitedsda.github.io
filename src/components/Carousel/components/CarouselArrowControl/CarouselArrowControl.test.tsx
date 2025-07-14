import type { EmblaCarouselType } from "embla-carousel";
import {
    beforeEach,
    describe,
    expect,
    fireEvent,
    it,
    screen,
    vi,
} from "../../../../test/index.ts";
import { render } from "../../../../test/vitest-setup.tsx";
import type { CarouselControlProps } from "../../types.ts";
import CarouselArrowControl from "./CarouselArrowControl.tsx";

// Mock the hook at the module level
const mockUseCarouselArrowButtons = vi.fn();
vi.mock("./useCarouselArrowButton", () => ({
	default: mockUseCarouselArrowButtons,
}));

describe("CarouselArrowControl", () => {
	const mockButtonClick = vi.fn();
	const mockOnPrevButtonClick = vi.fn();
	const mockOnNextButtonClick = vi.fn();

	// Create a more complete mock API
	const createMockApi = (
		canScrollPrev = true,
		canScrollNext = true,
	): EmblaCarouselType =>
		({
			canScrollPrev: () => canScrollPrev,
			canScrollNext: () => canScrollNext,
			scrollPrev: vi.fn(),
			scrollNext: vi.fn(),
			on: vi.fn().mockReturnThis(),
			off: vi.fn().mockReturnThis(),
			selectedScrollSnap: vi.fn(() => 0),
			scrollSnapList: vi.fn(() => [0, 1, 2]),
			// Add other required methods as minimal mocks
			containerNode: vi.fn(() => document.createElement("div")),
			slideNodes: vi.fn(() => []),
			rootNode: vi.fn(() => document.createElement("div")),
			scrollTo: vi.fn(),
			destroy: vi.fn(),
			reInit: vi.fn().mockReturnThis(),
			emit: vi.fn().mockReturnThis(),
			previousScrollSnap: vi.fn(() => 0),
			scrollProgress: vi.fn(() => 0),
			slidesInView: vi.fn(() => []),
			slidesNotInView: vi.fn(() => []),
			internalEngine: vi.fn(() => ({}) as any),
			plugins: vi.fn(() => ({ autoplay: {} as any })),
		}) as EmblaCarouselType;

	const defaultProps: CarouselControlProps = {
		api: createMockApi(),
		onButtonClick: mockButtonClick,
	};

	beforeEach(() => {
		vi.clearAllMocks();

		// Mock the hook to return controlled values
		mockUseCarouselArrowButtons.mockReturnValue({
			prevBtnDisabled: false,
			nextBtnDisabled: false,
			onPrevButtonClick: mockOnPrevButtonClick,
			onNextButtonClick: mockOnNextButtonClick,
		});
	});

	it("renders both arrow buttons", () => {
		render(<CarouselArrowControl {...defaultProps} />);

		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(2);

		// Check for the CSS classes that identify the buttons
		const prevButton = document.querySelector(".embla__button--prev");
		const nextButton = document.querySelector(".embla__button--next");

		expect(prevButton).toBeInTheDocument();
		expect(nextButton).toBeInTheDocument();
	});

	it("renders with correct CSS classes", () => {
		render(<CarouselArrowControl {...defaultProps} />);

		const buttonsContainer = document.querySelector(".embla__buttons");
		const prevButton = document.querySelector(".embla__button--prev");
		const nextButton = document.querySelector(".embla__button--next");

		expect(buttonsContainer).toBeInTheDocument();
		expect(prevButton).toBeInTheDocument();
		expect(nextButton).toBeInTheDocument();
	});

	it("calls onPrevButtonClick when previous button is clicked", () => {
		render(<CarouselArrowControl {...defaultProps} />);

		const prevButton = document.querySelector(
			".embla__button--prev",
		) as HTMLElement;
		fireEvent.click(prevButton);

		expect(mockOnPrevButtonClick).toHaveBeenCalledTimes(1);
	});

	it("calls onNextButtonClick when next button is clicked", () => {
		render(<CarouselArrowControl {...defaultProps} />);

		const nextButton = document.querySelector(
			".embla__button--next",
		) as HTMLElement;
		fireEvent.click(nextButton);

		expect(mockOnNextButtonClick).toHaveBeenCalledTimes(1);
	});

	it("disables previous button when prevBtnDisabled is true", () => {
		mockUseCarouselArrowButtons.mockReturnValue({
			prevBtnDisabled: true,
			nextBtnDisabled: false,
			onPrevButtonClick: mockOnPrevButtonClick,
			onNextButtonClick: mockOnNextButtonClick,
		});

		render(<CarouselArrowControl {...defaultProps} />);

		const prevButton = document.querySelector(
			".embla__button--prev",
		) as HTMLButtonElement;
		const nextButton = document.querySelector(
			".embla__button--next",
		) as HTMLButtonElement;

		expect(prevButton).toBeDisabled();
		expect(nextButton).not.toBeDisabled();
	});

	it("disables next button when nextBtnDisabled is true", () => {
		mockUseCarouselArrowButtons.mockReturnValue({
			prevBtnDisabled: false,
			nextBtnDisabled: true,
			onPrevButtonClick: mockOnPrevButtonClick,
			onNextButtonClick: mockOnNextButtonClick,
		});

		render(<CarouselArrowControl {...defaultProps} />);

		const prevButton = document.querySelector(
			".embla__button--prev",
		) as HTMLButtonElement;
		const nextButton = document.querySelector(
			".embla__button--next",
		) as HTMLButtonElement;

		expect(prevButton).not.toBeDisabled();
		expect(nextButton).toBeDisabled();
	});

	it("disables both buttons when both are disabled", () => {
		mockUseCarouselArrowButtons.mockReturnValue({
			prevBtnDisabled: true,
			nextBtnDisabled: true,
			onPrevButtonClick: mockOnPrevButtonClick,
			onNextButtonClick: mockOnNextButtonClick,
		});

		render(<CarouselArrowControl {...defaultProps} />);

		const prevButton = document.querySelector(
			".embla__button--prev",
		) as HTMLButtonElement;
		const nextButton = document.querySelector(
			".embla__button--next",
		) as HTMLButtonElement;

		expect(prevButton).toBeDisabled();
		expect(nextButton).toBeDisabled();
	});

	it("passes api and onButtonClick to the hook", () => {
		const mockApi = { test: "api" } as unknown as EmblaCarouselType;
		const mockCallback = vi.fn();

		render(<CarouselArrowControl api={mockApi} onButtonClick={mockCallback} />);

		expect(mockUseCarouselArrowButtons).toHaveBeenCalledWith(
			mockApi,
			mockCallback,
		);
	});

	it("renders correct icons for each button", () => {
		render(<CarouselArrowControl {...defaultProps} />);

		// Check if the MUI icons are rendered
		const prevButton = document.querySelector(".embla__button--prev");
		const nextButton = document.querySelector(".embla__button--next");

		// Check if the buttons contain the icon elements (SVG elements from MUI icons)
		expect(prevButton?.querySelector("svg")).toBeInTheDocument();
		expect(nextButton?.querySelector("svg")).toBeInTheDocument();
	});

	it("renders custom icons when provided", () => {
		const CustomPrevIcon = () => <span data-testid="custom-prev">Prev</span>;
		const CustomNextIcon = () => <span data-testid="custom-next">Next</span>;

		render(
			<CarouselArrowControl
				{...defaultProps}
				prevIcon={<CustomPrevIcon />}
				nextIcon={<CustomNextIcon />}
			/>,
		);

		expect(screen.getByTestId("custom-prev")).toBeInTheDocument();
		expect(screen.getByTestId("custom-next")).toBeInTheDocument();
	});

	it("applies responsive styling", () => {
		render(<CarouselArrowControl {...defaultProps} />);

		const buttonsContainer = document.querySelector(".embla__buttons");

		// The component should render the Stack with responsive styling
		expect(buttonsContainer).toBeInTheDocument();
		// The actual responsive styles are applied via Material-UI's sx prop
		// which would be tested in integration tests rather than unit tests
	});
});
