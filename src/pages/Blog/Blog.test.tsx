import "@testing-library/jest-dom";
import { render } from "../../utils/vitest-setup";
import Blog from "./Blog";
import { describe, expect, it, screen } from "../../utils/index.ts";

describe("Blog", () => {
	it("renders Blog", () => {
		render(<Blog />);

		expect(screen.getByText("Our Blog")).toBeInTheDocument();
	});
});
