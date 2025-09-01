import { describe, expect, it, render } from "@/test";
import { AnnouncementCard, type AnnouncementCardProps } from "@pages/Home";

const defaultProps = {
	id: 1,
	icon: <div data-testid="icon">{"A"}</div>,
	type: "event",
	title: "Test Title",
	location: "home",
	recurring: true,
	date_format: "MMM YYY",
	author_id: 2,
};

describe("NotificationCard", () => {
	it("renders NotificationCard", () => {
		const { getByText } = render(
			<AnnouncementCard {...(defaultProps as AnnouncementCardProps)} />,
		);

		expect(getByText("NotificationCard Component")).toBeInTheDocument();
	});
});
