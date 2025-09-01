import { UserAccessForm } from "@forms/collection";
import { describe, expect, it, render } from "@/test";

describe("UserAccessForm", () => {
	it("renders UserAccessForm", () => {
		const { getByText } = render(<UserAccessForm />);

		expect(getByText("UserAccessForm Component")).toBeInTheDocument();
	});
});
