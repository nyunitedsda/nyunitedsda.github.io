import { render, screen } from "../../utils/vitest-setup";
import AboutUs from "./AboutUs";
import "@testing-library/jest-dom";

describe("AboutUs", () => {
	it("renders AboutUs", () => {
		render(<AboutUs />);

		expect(screen.getByText("About Us")).toBeInTheDocument();
	});
});
