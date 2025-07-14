import { render } from "../../utils/vitest-setup";
import AboutUs from "./AboutUs";
import "@testing-library/jest-dom";
import { describe, expect, it, screen } from "../../utils/index.ts";

describe("AboutUs", () => {
	it("renders AboutUs", () => {
		render(<AboutUs />);

		expect(screen.getByText("About Us")).toBeInTheDocument();
	});
});
