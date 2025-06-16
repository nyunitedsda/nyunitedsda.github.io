import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MessageContext from "./MessageContext";

describe("MessageContext", () => {
	it("renders MessageContext", () => {
		const { getByText } = render(<MessageContext />);

		expect(getByText("MessageContext Component")).toBeInTheDocument();
	});
});
