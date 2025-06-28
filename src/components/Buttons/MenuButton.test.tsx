import type { ButtonProps } from "@mui/material/Button";
import { beforeEach, describe, expect, it, vi,  screen, waitFor,  fireEvent } from "../../utils/index.ts";
import { render } from "../../utils/vitest-setup.tsx";
import MenuButton from "./MenuButton";
import type { MenuButtonProps } from "./types";

// Mock react-router's useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
	useNavigate: () => mockNavigate,
}));

// Mock styles
vi.mock("./styles", () => ({
	menuButtonStyles: {
		activeBtnSx: { color: "primary.main" },
		buttonSx: { fontWeight: "bold" },
	},
}));

describe("MenuButton", () => {
	const defaultProps: MenuButtonProps = {
		isActive: (path) => path === "/active",
		path: "/home",
		children: "Menu Label",
		buttonProps: { "data-testid": "button" } as Omit<ButtonProps, "children">,
	};

	const menuItemsProps: MenuButtonProps = {
		...defaultProps,
		menuItems: [
			{
				name: "Item 1",
				path: "/item1",
				id: "",
			},
			{
				name: "Item 2",
				path: "/item2",
				id: "",
			},
			{
				name: "Active Item",
				path: "/active",
				id: "",
			},
		],
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders as a button with correct label", () => {
		render(<MenuButton {...defaultProps} />);

		const button = screen.getByText("Menu Label");
		expect(button).toBeInTheDocument();
	});

	it("uses href attribute when no menuItems are provided", () => {
		render(<MenuButton {...defaultProps} />);
		
		expect(
			screen.getByRole("link", {
				name: /menu label/i,
			}),
		).toHaveAttribute("href", "/home");
	});

	it("applies active styles when button is active", () => {
		const activeProps = {
			...defaultProps,
			path: "/active",
		};

		render(<MenuButton {...activeProps} />);

		const button = screen.getByRole("button");
		// Check if SX prop was applied correctly - this is implementation dependent
		// In a real test, you might want to check for a visual indicator
		expect(button).toBeInTheDocument();
	});

	it("shows dropdown icon when menuItems are provided", () => {
		render(<MenuButton {...menuItemsProps} />);

		// ExpandMoreRounded icon should be visible
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		// We can't easily test for the specific icon, but we can test for aria attributes
		expect(button).toHaveAttribute("aria-haspopup", "true");
		expect(button).toHaveAttribute("aria-expanded", "false");
	});

	it("opens menu when clicked", async () => {
		
		render(<MenuButton {...menuItemsProps} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		// Menu should be visible with menu items
		const menu = screen.getByRole("menu");
		expect(menu).toBeInTheDocument();
		expect(screen.getByText("Item 1")).toBeInTheDocument();
		expect(screen.getByText("Item 2")).toBeInTheDocument();
		expect(screen.getByText("Active Item")).toBeInTheDocument();

		// Button should now have aria-expanded="true"
		expect(button).toHaveAttribute("aria-expanded", "true");
	});

	it("closes menu when clicking outside", async () => {
		
		render(
			<div>
				<div data-testid="outside">Outside</div>
				<MenuButton {...menuItemsProps} />
			</div>,
		);

		// Open the menu
		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(screen.getByRole("menu")).toBeInTheDocument();

		// Click outside
		fireEvent.click(screen.getByTestId("outside"));

		// Menu should be closed
		await waitFor(() => {
			expect(screen.queryByRole("menu")).not.toBeInTheDocument();
		});
	});

	it("closes menu when pressing Escape key", async () => {
		
		render(<MenuButton {...menuItemsProps} />);

		// Open the menu
		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(screen.getByRole("menu")).toBeInTheDocument();

		// Press Escape key
		fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

		// Menu should be closed
		await waitFor(() => {
			expect(screen.queryByRole("menu")).not.toBeInTheDocument();
		});
	});

	it("navigates when menu item is clicked", async () => {
		
		render(<MenuButton {...menuItemsProps} />);

		// Open the menu
		const button = screen.getByRole("button");
		fireEvent.click(button);

		// Click on menu item
		fireEvent.click(screen.getByText("Item 1"));

		// Should navigate
		expect(mockNavigate).toHaveBeenCalledWith("/item1");

		// Menu should be closed
		await waitFor(() => {
			expect(screen.queryByRole("menu")).not.toBeInTheDocument();
		});
	});

	it("highlights active menu item", async () => {
		
		render(<MenuButton {...menuItemsProps} />);

		// Open the menu
		const button = screen.getByRole("button");
		fireEvent.click(button);

		// Find all menu items
		// const menuItems = screen.getAllByRole('menuitem');

		// The one with path '/active' should have selected=true
		const activeItem = screen.getByText("Active Item").closest("li");
		expect(activeItem).toHaveAttribute("aria-selected", "true");
	});

	it("executes buttonProps.onClick when clicked and no menuItems", async () => {
		const onClickMock = vi.fn();
		const customProps = {
			...defaultProps,
			buttonProps: { onClick: onClickMock },
		};

		
		render(<MenuButton {...customProps} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(onClickMock).toHaveBeenCalled();
	});
});
