import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DataTable from "./DataTable";

describe("DataTable", () => {
	it("renders DataTable", () => {
		const { getByText } = render(<DataTable />);

		expect(getByText("DataTable Component")).toBeInTheDocument();
	});
});
