import { describe, expect, it, render } from "@/test";
import { LoginForm } from "@forms/collection";

describe("LoginForm", () => {
	it("renders LoginForm", () => {
		const { getByText } = render(<LoginForm />);

		expect(getByText("LoginForm Component")).toBeInTheDocument();
	});
});
