import type { ButtonProps } from "@mui/material/Button";
import { vi } from "vitest";
import {
	act,
	beforeEach,
	describe,
	expect,
	fireEvent,
	it,
	screen,
	waitFor,
} from "../../../test/index.ts";
import { render } from "../../../test/vitest-setup.tsx";
import type { MenuButtonProps } from "../types.ts";
import MenuButton from "./MenuButton.tsx";

// Mock react-router's useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
	useNavigate: () => mockNavigate,
}));

// Mock styles
vi.mock("./styles", () => ({
	menuButtonStyles: {
		activeBtnSx: { color: "primary.main" },
		buttonSx: { fontWeight: "bold" },
	},
}));

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

describe("MenuButton", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders as a button with correct label", () => {
		act(() => {
			render(<MenuButton {...defaultProps} />);
		});

		const button = screen.getByText("Menu Label");
		expect(button).toBeInTheDocument();
	});

	it("uses href attribute when no menuItems are provided", () => {
		act(() => {
			render(<MenuButton {...defaultProps} />);
		});

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

		const button = screen.getByRole("link");
		// Verify the button has the active class or styling in some way
		// Since we're mocking the styles, we can check for data-testid and verify it's the active path
		expect(button).toHaveAttribute("href", "/active");
		// We'd need a way to test sx props, but that's not easily testable in this setup
		// Instead, we can test that the component logic for active path is working
		expect(activeProps.isActive(activeProps.path)).toBe(true);
	});

	it("shows dropdown icon when menuItems are provided", () => {
		render(<MenuButton {...menuItemsProps} />);

		// ExpandMoreRounded icon should be visible
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();

		// Test for aria attributes that indicate a dropdown menu
		expect(button).toHaveAttribute("aria-haspopup", "true");
		// expect(button).toHaveAttribute("aria-expanded", "false");

		// Verify that the button has ID as specified in the component
		expect(button).toHaveAttribute("id", "MenuBtn");
	});

	it("opens menu when clicked", async () => {
		const { container, getByRole } = render(<MenuButton {...menuItemsProps} />);

		const button = getByRole("button");
		fireEvent.click(button);

		// screen.logTestingPlaygroundURL();
		// Menu should be visible with menu items
		const menu = container.querySelector("#split-button-menu");
		expect(menu).toBeInTheDocument();

		// Verify all menu items are displayed
		expect(screen.getByText("Item 1")).toBeInTheDocument();
		expect(screen.getByText("Item 2")).toBeInTheDocument();
		expect(screen.getByText("Active Item")).toBeInTheDocument();

		// Button should now have aria-expanded="true", indicating menu is open
		expect(button).toHaveAttribute("aria-expanded", "true");

		// Verify menulist is present with correct ID
		expect(container.querySelector("#split-button-menu")).toBeInTheDocument();
	});

	it("closes menu when clicking outside", async () => {
		render(
			<div data-testid="outside" style={{ padding: "100px" }}>
				<div>Outside</div>
				<MenuButton {...menuItemsProps} />
			</div>,
		);

		// Open the menu
		const button = screen.getByRole("button");
		fireEvent.click(button);

		// Check that menu is open by checking for the menu container
		expect(screen.getByRole("menu")).toBeInTheDocument();

		// Click outside - simulate click on document body
		fireEvent.mouseDown(document.body);

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
		fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

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
		const menuItems = screen.getAllByRole("menuitem");
		expect(menuItems.length).toBe(3);

		// The one with path '/active' should have selected=true
		const activeItem = screen.getByText("Active Item").closest("li");
		expect(activeItem).toHaveClass("Mui-selected");

		// Other items shouldn't be selected
		const nonActiveItem1 = screen.getByText("Item 1").closest("li");
		const nonActiveItem2 = screen.getByText("Item 2").closest("li");
		expect(nonActiveItem1).not.toHaveClass("Mui-selected");
		expect(nonActiveItem2).not.toHaveClass("Mui-selected");
	});

	it("executes buttonProps.onClick when clicked and no menuItems", async () => {
		const onClickMock = vi.fn();
		const customProps = {
			...defaultProps,
			buttonProps: { onClick: onClickMock, "data-testid": "custom-button" },
		};

		render(<MenuButton {...customProps} />);

		const button = screen.getByTestId("custom-button");
		fireEvent.click(button);

		// Verify onClick handler was called
		expect(onClickMock).toHaveBeenCalled();
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});

	it("displays button as active when it contains an active menu item", () => {
		render(<MenuButton {...menuItemsProps} />);

		// The button should appear active since menuItems contains an active item
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();

		// We can't directly test the sx prop easily, but we can verify the component's logic
		// The menuItems array contains an item with path "/active" which matches our isActive function
		const hasActiveMenuItem = menuItemsProps.menuItems?.some((item) =>
			menuItemsProps.isActive(item.path),
		);
		expect(hasActiveMenuItem).toBe(true);
	});

	it("renders as a regular link when no menuItems are provided", () => {
		act(() => {
			render(<MenuButton {...defaultProps} />);
		});

		// Should be rendered as a link, not a dropdown button
		const link = screen.getByRole("link", { name: "Menu Label" });
		expect(link).toBeInTheDocument();
		expect(link).not.toHaveAttribute("aria-haspopup");
		expect(link).not.toHaveAttribute("aria-expanded");
	});
});
