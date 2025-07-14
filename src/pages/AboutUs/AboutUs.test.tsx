import "@testing-library/jest-dom";
import { describe, expect, it, screen } from "../../test/index.ts";
import { render } from "../../test/vitest-setup.tsx";
import AboutUs from "./AboutUs";

describe("AboutUs", () => {
	it("renders AboutUs", () => {
		render(<AboutUs />);

		expect(screen.getByText("About Us")).toBeInTheDocument();
	});
});
