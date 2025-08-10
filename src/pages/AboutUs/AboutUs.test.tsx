import { describe, expect, it, render, screen } from "@test/index.ts";
import "@testing-library/jest-dom";
import AboutUs from "./AboutUs";

describe("AboutUs", () => {
	it("renders AboutUs", () => {
		render(<AboutUs />);

		expect(screen.getByText("About Us")).toBeInTheDocument();
	});
});
