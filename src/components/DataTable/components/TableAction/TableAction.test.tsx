import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TableAction from "./TableAction";

describe("TableAction", () => {
	it("renders TableAction", () => {
		const { getByText } = render(<TableAction />);

		expect(getByText("TableAction Component")).toBeInTheDocument();
	});
});
