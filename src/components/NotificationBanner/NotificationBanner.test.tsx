import NotificationBanner from "@components/NotificationBanner";
import {
	beforeEach,
	describe,
	expect,
	fireEvent,
	it,
	render,
	screen,
} from "@test/index.ts";
import { vi } from "vitest";

// Mock the context functions
vi.mock("@contexts/NotificationContext", () => {
	const mockContext = {
		notifications: [],
		registerNotification: vi.fn(),
		dismissNotification: vi.fn(),
		clearNotification: vi.fn(),
	};

	return {
		default: mockContext,
		Provider: ({ children }: any) => children, // Pass through provider
	};
});

describe("NotificationBanner", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders notification with message", () => {
		render(
			<NotificationBanner
				id={1}
				message="Test notification message"
				open={true}
				severity_id={1}
			/>,
		);

		expect(screen.getByText("Test notification message")).toBeInTheDocument();
	});

	it("renders notification with title and message", () => {
		render(
			<NotificationBanner
				id={1}
				title="Test Title"
				message="Test notification message"
				open={true}
				severity_id={1}
			/>,
		);

		expect(screen.getByText("Test Title")).toBeInTheDocument();
		expect(screen.getByText("Test notification message")).toBeInTheDocument();
	});

	it("does not render when open is false", () => {
		render(
			<NotificationBanner
				id={1}
				message="Test notification message"
				open={false}
				severity_id={1}
			/>,
		);

		expect(
			screen.queryByText("Test notification message"),
		).not.toBeInTheDocument();
	});

	it("renders close button", () => {
		render(
			<NotificationBanner
				id={1}
				message="Test notification message"
				open={true}
				severity_id={1}
			/>,
		);

		const closeButton = screen.getByRole("button", { name: /close/i });
		expect(closeButton).toBeInTheDocument();
	});

	it("calls dismissNotification when close button is clicked", () => {
		const mockDismissNotification = vi.fn();
		render(
			<NotificationBanner
				id={1}
				message="Test notification message"
				open={true}
				severity_id={1}
				onClose={mockDismissNotification}
			/>,
		);

		const closeButton = screen.getByRole("button", { name: /close/i });
		fireEvent.click(closeButton);

		expect(mockDismissNotification).toHaveBeenCalledWith(1);
	});

	it("renders with success severity", () => {
		render(
			<NotificationBanner
				id={1}
				message="Success message"
				open={true}
				severity_id={4}
			/>,
		);

		expect(screen.getByText("Success message")).toBeInTheDocument();
	});

	it("renders with error severity", () => {
		render(
			<NotificationBanner
				id={1}
				message="Error message"
				open={true}
				severity_id={3}
			/>,
		);

		expect(screen.getByText("Error message")).toBeInTheDocument();
	});

	it("renders with caution severity", () => {
		render(
			<NotificationBanner
				id={1}
				message="Warning message"
				open={true}
				severity_id={2}
			/>,
		);

		expect(
			screen.getByText((content) => content.includes("Warning message")),
		).toBeInTheDocument();
	});

	it("uses default open state when open prop is undefined", () => {
		render(
			<NotificationBanner
				id={1}
				message="Test notification message"
				severity_id={1}
			/>,
		);

		// When open is undefined, it defaults to false, so message should not be visible
		expect(
			screen.queryByText("Test notification message"),
		).not.toBeInTheDocument();
	});
});
