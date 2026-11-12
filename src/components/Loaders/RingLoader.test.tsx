import RingLoader from "@components/Loaders";
import { describe, expect, it, render, screen } from "@test/index.ts";

describe("RingLoader", () => {
	it("renders RingLoader", () => {
		render(<RingLoader />);
		expect(screen.getByTestId("loader")).toBeInTheDocument();
	});

	it("renders with custom size", () => {
		const { getByTestId } = render(<RingLoader />);
		const loader = getByTestId("loader");

		expect(loader).toBeInTheDocument();
		expect(loader).toHaveStyle({ width: "80px" });
	});

	it("does not render when loading is false", () => {
		const { queryByTestId } = render(<RingLoader />);

		expect(queryByTestId("loader")).not.toBeInTheDocument();
	});
});
