import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./Home";

describe("Home", () => {
	it("renders Home", () => {
		const { getByText } = render(<Home />);

		expect(getByText("Home Component")).toBeInTheDocument();
	});
});
