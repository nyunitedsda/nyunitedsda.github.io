import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectSuspense from "./ProjectSuspense";

describe("ProjectSuspense", () => {
	it("renders ProjectSuspense", () => {
		const { getByText } = render(<ProjectSuspense />);

		expect(getByText("ProjectSuspense Component")).toBeInTheDocument();
	});
});
