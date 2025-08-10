import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UnknownError from "./UnknownError";

describe("UnknownError", () => {
	it("renders UnknownError", () => {
		const { getByText } = render(<UnknownError />);

		expect(getByText("UnknownError Component")).toBeInTheDocument();
	});
});
