import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UserAccessForm from "./RegisterForm";

describe("UserAccessForm", () => {
	it("renders UserAccessForm", () => {
		const { getByText } = render(<UserAccessForm />);

		expect(getByText("UserAccessForm Component")).toBeInTheDocument();
	});
});
