import { describe, expect, it, render, screen } from "@test/index.ts";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import Carousel from "./Carousel";

// Mock the embla carousel hooks and sub-components
vi.mock("embla-carousel-react", () => ({
	default: () => [vi.fn(), undefined],
}));

vi.mock("embla-carousel-autoplay", () => ({
	default: vi.fn(() => ({})),
}));

vi.mock("./components/CarouselArrowControl/CarouselArrowControl", () => ({
	default: () => <div data-testid="arrow-control">Arrow Control</div>,
}));

vi.mock("./components/CarouselDotControl/CarouselDotControl", () => ({
	default: () => <div data-testid="dot-control">Dot Control</div>,
}));

describe("Carousel", () => {
	it("renders Carousel with children", () => {
		render(
			<Carousel>
				<div>Slide 1</div>
				<div>Slide 2</div>
				<div>Slide 3</div>
			</Carousel>,
		);

		// Check that children are rendered
		expect(screen.getByText("Slide 1")).toBeInTheDocument();
		expect(screen.getByText("Slide 2")).toBeInTheDocument();
		expect(screen.getByText("Slide 3")).toBeInTheDocument();

		// Check that the carousel viewport structure is rendered
		const viewport = document.querySelector(".embla__viewport");
		expect(viewport).toBeInTheDocument();

		// Check that the carousel container is rendered
		const container = document.querySelector(".embla__container");
		expect(container).toBeInTheDocument();
	});

	it("renders with autoplay enabled", () => {
		render(
			<Carousel autoplay>
				<div>Slide 1</div>
				<div>Slide 2</div>
			</Carousel>,
		);

		// Check that the carousel is rendered
		const viewport = document.querySelector(".embla__viewport");
		expect(viewport).toBeInTheDocument();

		// Check that children are rendered
		expect(screen.getByText("Slide 1")).toBeInTheDocument();
		expect(screen.getByText("Slide 2")).toBeInTheDocument();
	});

	it("renders with custom sx styles", () => {
		render(
			<Carousel sx={{ backgroundColor: "red" }}>
				<div>Test Slide</div>
			</Carousel>,
		);

		// Check that the carousel section is rendered
		const section = document.querySelector("section.embla");
		expect(section).toBeInTheDocument();

		// Check that the child is rendered
		expect(screen.getByText("Test Slide")).toBeInTheDocument();
	});

	it("renders controls (arrows and dots)", () => {
		render(
			<Carousel>
				<div>Slide 1</div>
				<div>Slide 2</div>
			</Carousel>,
		);

		// Check that mocked controls are rendered
		expect(screen.getByTestId("arrow-control")).toBeInTheDocument();
		expect(screen.getByTestId("dot-control")).toBeInTheDocument();

		// Check that controls container is rendered
		const controls = document.querySelector(".embla__controls");
		expect(controls).toBeInTheDocument();
	});

	it("renders single child correctly", async () => {
		render(
			<Carousel>
				<div>Single Slide</div>
			</Carousel>,
		);

		expect(screen.getByText("Single Slide")).toBeInTheDocument();
	});

	it("handles multiple children correctly", () => {
		render(
			<Carousel>
				<div>Slide A</div>
				<div>Slide B</div>
				<div>Slide C</div>
			</Carousel>,
		);

		// All children should be rendered
		expect(screen.getByText("Slide A")).toBeInTheDocument();
		expect(screen.getByText("Slide B")).toBeInTheDocument();
		expect(screen.getByText("Slide C")).toBeInTheDocument();
	});
});
