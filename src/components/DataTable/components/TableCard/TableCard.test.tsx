import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TableCard from "./TableCard";

describe("TableCard", () => {
	it("renders TableCard", () => {
		const { getByText } = render(<TableCard />);

		expect(getByText("TableCard Component")).toBeInTheDocument();
	});
});
