import Home from "@pages/Home";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Home", () => {
	it("renders Home", () => {
		const { getByText } = render(<Home />);

		expect(getByText("Home Component")).toBeInTheDocument();
	});
});
