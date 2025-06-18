import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotificationContext from "./NotificationContext";

describe("NotificationContext", () => {
	it("renders NotificationContext", () => {
		const { getByText } = render(<NotificationContext />);

		expect(getByText("NotificationContext Component")).toBeInTheDocument();
	});
});
