import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotificationCard from "./AnnouncementCard";
import type { NotificationCardProps } from "./types";

const defaultProps = {
	id: 1,
	icon: <div data-testid="icon">{"A"}</div>,
	type: "event" as NotificationCardProps["type"],
	title: "Test Title",
	location: "home",
};

describe("NotificationCard", () => {
	it("renders NotificationCard", () => {
		const { getByText } = render(<NotificationCard {...defaultProps} />);

		expect(getByText("NotificationCard Component")).toBeInTheDocument();
	});
});
