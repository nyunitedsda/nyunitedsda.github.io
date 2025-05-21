import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutUs from "./AboutUs";
import "@testing-library/jest-dom";

describe("AboutUs", () => {
	it("renders AboutUs", () => {
		const { getByText } = render(<AboutUs />);

		expect(getByText("AboutUs Component")).toBeInTheDocument();
	});
});
