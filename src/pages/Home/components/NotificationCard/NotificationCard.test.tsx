import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotificationCard from "./NotificationCard";
import type { NotificationCardProps } from "./types";

const defaultProps = {
	id: 1,
	icon: <div data-testid="icon">{"A"}</div>,
	type: "service" as NotificationCardProps["type"],
	title: "Test Title",
};

describe("NotificationCard", () => {
	it("renders NotificationCard", () => {
		const { getByText } = render(<NotificationCard {...defaultProps} />);

		expect(getByText("NotificationCard Component")).toBeInTheDocument();
	});
});
