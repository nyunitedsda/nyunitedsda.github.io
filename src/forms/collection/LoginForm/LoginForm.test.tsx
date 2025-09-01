import { LoginForm } from "@forms/collection";
import { describe, expect, it, render } from "@/test";

describe("LoginForm", () => {
	it("renders LoginForm", () => {
		const { getByText } = render(<LoginForm />);

		expect(getByText("LoginForm Component")).toBeInTheDocument();
	});
});
