import { TableAction } from "@components/DataTable";
import { users } from "@test/mock_data";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("TableAction", () => {
	it("renders TableAction", () => {
		const { getByText } = render(<TableAction data={users[0]} />);

		expect(getByText("TableAction Component")).toBeInTheDocument();
	});
});
