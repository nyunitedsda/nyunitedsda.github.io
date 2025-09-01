import { NotificationProvider } from "@contexts/NotificationContext";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("NotificationContext", () => {
	it("renders NotificationContext", () => {
		const { getByText } = render(
			<NotificationProvider>
				<div>{"NotificationContext Component"}</div>
			</NotificationProvider>,
		);

		expect(getByText("NotificationContext Component")).toBeInTheDocument();
	});
});
