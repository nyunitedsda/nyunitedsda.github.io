import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageWrapper from "./PageWrapper";
import "@testing-library/jest-dom";

describe("PageWrapper", () => {
	it("renders PageWrapper", () => {
		const { getByText } = render(<PageWrapper />);

		expect(getByText("PageWrapper Component")).toBeInTheDocument();
	});
});
