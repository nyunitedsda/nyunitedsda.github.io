import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LiveStream from "./LiveStream";

describe("LiveStream", () => {
	it("renders LiveStream", () => {
		const { getByText } = render(<LiveStream />);

		expect(getByText("LiveStream Component")).toBeInTheDocument();
	});
});
