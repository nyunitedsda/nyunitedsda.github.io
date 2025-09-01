import PageWrapper from "@components/PageWrapper";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("PageWrapper", () => {
	it("renders PageWrapper", () => {
		const { getByText } = render(<PageWrapper />);

		expect(getByText("PageWrapper Component")).toBeInTheDocument();
	});
});
