import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotificationCard from "./NotificationCard";

describe("NotificationCard", () => {
	it("renders NotificationCard", () => {
		const { getByText } = render(<NotificationCard />);

		expect(getByText("NotificationCard Component")).toBeInTheDocument();
	});
});
