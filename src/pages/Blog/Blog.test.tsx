import { describe, expect, it, render, screen } from "@test/index.ts";
import "@testing-library/jest-dom";
import Blog from "./Blog";

describe("Blog", () => {
	it("renders Blog", () => {
		render(<Blog />);

		expect(screen.getByText("Our Blog")).toBeInTheDocument();
	});
});
