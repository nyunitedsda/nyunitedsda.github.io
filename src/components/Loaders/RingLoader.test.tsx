import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RingLoader from "./RingLoader";

describe("RingLoader", () => {
	it("renders RingLoader", () => {
		const { getByText } = render(<RingLoader />);

		expect(getByText("RingLoader Component")).toBeInTheDocument();
	});
});
