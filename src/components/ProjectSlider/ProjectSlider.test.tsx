import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectSlider from "./ProjectSlider";

describe("ProjectSlider", () => {
	it("renders ProjectSlider", () => {
		const { getByText } = render(<ProjectSlider />);

		expect(getByText("ProjectSlider Component")).toBeInTheDocument();
	});
});
