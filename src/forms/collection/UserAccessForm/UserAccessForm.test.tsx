import { describe, expect, it, render } from "@/test";
import { UserAccessForm } from "@forms/collection";

describe("UserAccessForm", () => {
	it("renders UserAccessForm", () => {
		const { getByText } = render(<UserAccessForm />);

		expect(getByText("UserAccessForm Component")).toBeInTheDocument();
	});
});
