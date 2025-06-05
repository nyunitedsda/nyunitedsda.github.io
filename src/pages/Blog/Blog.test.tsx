import "@testing-library/jest-dom";
import { render, screen } from "../../utils/vitest-setup";
import Blog from "./Blog";

describe("Blog", () => {
	it("renders Blog", () => {
		render(<Blog />);

		expect(screen.getByText("Our Blog")).toBeInTheDocument();
	});
});
