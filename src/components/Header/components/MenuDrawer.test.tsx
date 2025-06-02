import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import { fireEvent, render, screen } from "../../../utils/vitest-setup";
import MenuDrawer from "./MenuDrawer";
import { MemoryRouter as ActualMemoryRouter } from "react-router";

// Mock the child components
vi.mock("./MenuDrawerItem", () => ({
	default: ({
		text,
		isActive,
		onClick,
		disabled,
	}: {
		text: string;
		isActive: boolean;
		onClick: React.MouseEventHandler<HTMLButtonElement>;
		disabled: boolean;
	}) => (
		<button
			type="button"
			data-testid={`menu-item-${text}`}
			data-active={isActive}
			data-disabled={disabled}
			onClick={onClick}
		>
			{text}
		</button>
	),
}));

vi.mock("./SubMenuDrawerItem", () => ({
	default: ({
		name,
		isActiveParent,
		isActiveChild: _isActiveChild,
		onClick: _onClick,
	}: {
		name: string;
		isActiveParent: boolean;
		isActiveChild: boolean;
		onClick: React.MouseEventHandler<HTMLDivElement>;
	}) => (
		<div
			data-testid={`submenu-item-${name}`}
			data-active-parent={isActiveParent}
		>
			{name}
		</div>
	),
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
	...vi.importActual("react-router"),
	useNavigate: () => mockNavigate,
	MemoryRouter: ({ children, ...props }: { children: React.ReactNode }) => (
		<ActualMemoryRouter basename="/" initialEntries={["/home"]} {...props}>
			{children}
		</ActualMemoryRouter>
	),
}));

describe.skip("MenuDrawer", () => {
	const toggleDrawerMock = vi.fn();
	const isActiveMock = (path: string) => path === "/active-path";

	const mockMenuItems = [
		{ name: "Home", path: "/home", icon: "home-icon" },
		{ name: "About", path: "/active-path", icon: "about-icon" },
		{ name: "Login", path: "/login", icon: "login-icon" },
		{
			name: "Services",
			path: "/services",
			icon: "services-icon",
			children: [
				{ name: "Service 1", path: "/service1" },
				{ name: "Service 2", path: "/service2" },
			],
		},
	];

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders the title correctly", () => {
		render(
			<MemoryRouter>
				<MenuDrawer
					isActive={isActiveMock}
					toggleDrawer={toggleDrawerMock}
					title="Test Title"
					menuItems={mockMenuItems}
				/>
			</MemoryRouter>,
		);

		expect(screen.getByText("Test Title")).toBeInTheDocument();
	});

	it("renders regular menu items correctly", () => {
		render(
			<MemoryRouter>
				<MenuDrawer
					isActive={isActiveMock}
					toggleDrawer={toggleDrawerMock}
					title="Test Title"
					menuItems={mockMenuItems}
				/>
			</MemoryRouter>,
		);

		expect(screen.getByTestId("menu-item-Home")).toBeInTheDocument();
		expect(screen.getByTestId("menu-item-About")).toBeInTheDocument();
		expect(screen.getByTestId("menu-item-Login")).toBeInTheDocument();
	});

	it("renders submenu items correctly", () => {
		render(
			<MemoryRouter>
				<MenuDrawer
					isActive={isActiveMock}
					toggleDrawer={toggleDrawerMock}
					title="Test Title"
					menuItems={mockMenuItems}
				/>
			</MemoryRouter>,
		);

		expect(screen.getByTestId("submenu-item-Services")).toBeInTheDocument();
	});

	it("sets active state correctly for menu items", () => {
		render(
			<MemoryRouter>
				<MenuDrawer
					isActive={isActiveMock}
					toggleDrawer={toggleDrawerMock}
					title="Test Title"
					menuItems={mockMenuItems}
				/>
			</MemoryRouter>,
		);

		expect(screen.getByTestId("menu-item-Home").dataset.active).toBe("false");
		expect(screen.getByTestId("menu-item-About").dataset.active).toBe("true");
	});

	it("disables Login menu item", () => {
		render(
			<MemoryRouter>
				<MenuDrawer
					isActive={isActiveMock}
					toggleDrawer={toggleDrawerMock}
					title="Test Title"
					menuItems={mockMenuItems}
				/>
			</MemoryRouter>,
		);

		expect(screen.getByTestId("menu-item-Login").dataset.disabled).toBe("true");
	});

	it("navigates and toggles drawer when clicking a menu item", () => {
		render(
			<MemoryRouter>
				<MenuDrawer
					isActive={isActiveMock}
					toggleDrawer={toggleDrawerMock}
					title="Test Title"
					menuItems={mockMenuItems}
				/>
			</MemoryRouter>,
		);

		fireEvent.click(screen.getByTestId("menu-item-Home"));

		expect(mockNavigate).toHaveBeenCalledWith("/home");
		expect(toggleDrawerMock).toHaveBeenCalled();
	});

	it("calls toggleDrawer when clicking the Stack component", () => {
		render(
			<MemoryRouter>
				<MenuDrawer
					isActive={isActiveMock}
					toggleDrawer={toggleDrawerMock}
					title="Test Title"
					menuItems={mockMenuItems}
				/>
			</MemoryRouter>,
		);

		// Click the root Stack component (we need to find an element that's part of it)
		fireEvent.click(screen.getByText("Test Title"));

		expect(toggleDrawerMock).toHaveBeenCalled();
	});
});
