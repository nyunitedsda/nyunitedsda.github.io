import DataTable from "@components/DataTable";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("DataTable", () => {
	it("renders DataTable", () => {
		const { getByText } = render(
			<DataTable isLoading={false} columns={[]} data={[]} />,
		);

		expect(getByText("DataTable Component")).toBeInTheDocument();
	});
});
