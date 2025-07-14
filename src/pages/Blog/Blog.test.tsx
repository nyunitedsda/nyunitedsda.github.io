import "@testing-library/jest-dom";
import { describe, expect, it, screen } from "../../test/index.ts";
import { render } from "../../test/vitest-setup.tsx";
import Blog from "./Blog";

describe("Blog", () => {
	it("renders Blog", () => {
		render(<Blog />);

		expect(screen.getByText("Our Blog")).toBeInTheDocument();
	});
});
