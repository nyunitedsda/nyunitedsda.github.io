import { vi } from "vitest";
import {
	beforeEach,
	describe,
	type ExcludedProvider,
	expect,
	fireEvent,
	it,
	screen,
} from "../../../test/index.ts";
import { render } from "../../../test/vitest-setup.tsx";
import LoginButton from "./LoginButton";

// Mock react-router's useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
	useNavigate: () => mockNavigate,
}));

const excludeProviders: ExcludedProvider[] = [
	"Authentication",
	"Notification",
	"QueryClient",
	"Snackbar",
];

describe("LoginButton", () => {
	beforeEach(() => {
		mockNavigate.mockClear();
	});

	it("renders the login button with correct text", () => {
		render(<LoginButton />, { excludeProviders });

		const button = screen.getByRole("button", { name: /login/i });
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Login");
	});

	it("renders with login icon", () => {
		render(<LoginButton />, { excludeProviders });

		const button = screen.getByRole("button", { name: /login/i });
		const icon = button.querySelector("svg");
		expect(icon).toBeInTheDocument();
	});

	it("has correct styling properties", () => {
		render(<LoginButton />, { excludeProviders });

		const button = screen.getByRole("button", { name: /login/i });
		expect(button).toHaveAttribute("class");
		// The button should be full width and have primary color
		expect(button.closest(".MuiButton-root")).toBeInTheDocument();
	});

	it("navigates to login page when clicked", () => {
		render(<LoginButton />, { excludeProviders });

		const button = screen.getByRole("button", { name: /login/i });
		fireEvent.click(button);

		expect(mockNavigate).toHaveBeenCalledWith("/login");
		expect(mockNavigate).toHaveBeenCalledTimes(1);
	});

	it("is memoized correctly", () => {
		const { rerender } = render(<LoginButton />, { excludeProviders });

		// Component should render without issues on rerender
		rerender(<LoginButton />);

		const button = screen.getByRole("button", { name: /login/i });
		expect(button).toBeInTheDocument();
	});
});
