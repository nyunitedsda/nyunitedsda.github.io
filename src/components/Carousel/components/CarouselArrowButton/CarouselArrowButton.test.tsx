import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CarouselArrowButton from "./CarouselArrowButton";

describe("CarouselArrowButton", () => {
	it("renders CarouselArrowButton", () => {
		const { getByText } = render(<CarouselArrowButton arrowDirection={"next"} />);

		expect(getByText("CarouselArrowButton Component")).toBeInTheDocument();
	});
});
