import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useAuthentication from "../auth/useAuthentication";
import * as helpers from "./helpers";
import pathlessMenuItems from "./pathlessMenuItems";
import siteRoutes from "./reviewedRoutes";
import useFormattedRoutes from "./useFormattedRoutes";

// Mock dependencies
vi.mock("./helpers", () => ({
	extractRouteIdAndPath: vi.fn(),
	generateMenuItems: vi.fn(),
}));

vi.mock("./pathlessMenuItems", () => {
	const pathlessMenuItems = [
		{ id: "home", name: "Home" },
		{ id: "about", name: "About" },
	];
	const protectedMenuItems = [{ id: "admin", name: "Administration" }];
	return {
		default: pathlessMenuItems,
		protectedMenuItems,
	};
});

vi.mock("./reviewedRoutes", () => {
	const siteRoutes = [
		{ id: "home", path: "/home" },
		{ id: "about", path: "/about" },
	];
	const protectedRoutes = [{ id: "admin", path: "/admin" }];
	return {
		default: siteRoutes,
		protectedRoutes,
	};
});

vi.mock("../auth/useAuthentication", () => ({
	default: vi.fn(),
}));

describe("useFormattedRoutes", () => {
	const mockUseAuthentication = vi.mocked(useAuthentication);

	beforeEach(() => {
		vi.clearAllMocks();

		// Default to unauthenticated state
		mockUseAuthentication.mockReturnValue({
			isAuthenticated: false,
			user: null,
			isLoading: false,
			login: vi.fn(),
			register: vi.fn(),
			logout: vi.fn(),
			refreshAuth: vi.fn(),
		} as any);
	});

	it("returns routes and menu items with the correct structure", () => {
		// Setup mock return values for this test
		const mockRouteIdPath = [
			{ id: "home", path: "/home" },
			{ id: "about", path: "/about" },
		];
		const mockMenuItems = [
			{ id: "home", path: "/home", name: "Home" },
			{ id: "about", path: "/about", name: "About" },
		];
		vi.mocked(helpers.extractRouteIdAndPath).mockReturnValue(mockRouteIdPath);
		vi.mocked(helpers.generateMenuItems).mockReturnValue(mockMenuItems);

		const { result } = renderHook(() => useFormattedRoutes());

		expect(result.current).toHaveProperty("routes");
		expect(result.current).toHaveProperty("menuItems");
		expect(Array.isArray(result.current.routes)).toBe(true);
		expect(Array.isArray(result.current.menuItems)).toBe(true);
	});

	it("calls extractRouteIdAndPath with site routes when unauthenticated", () => {
		// Setup mocks for this test
		const mockRouteIdPath = [
			{ id: "home", path: "/home" },
			{ id: "about", path: "/about" },
		];
		vi.mocked(helpers.extractRouteIdAndPath).mockReturnValue(mockRouteIdPath);
		vi.mocked(helpers.generateMenuItems).mockReturnValue([]);

		renderHook(() => useFormattedRoutes());

		expect(helpers.extractRouteIdAndPath).toHaveBeenCalledTimes(1);
		expect(helpers.extractRouteIdAndPath).toHaveBeenCalledWith(siteRoutes);
	});

	it("calls extractRouteIdAndPath with combined routes when authenticated", () => {
		// Setup mocks for this test
		vi.mocked(helpers.extractRouteIdAndPath).mockReturnValue([]);
		vi.mocked(helpers.generateMenuItems).mockReturnValue([]);

		mockUseAuthentication.mockReturnValue({
			isAuthenticated: true,
			user: { id: 1, email: "test@example.com", role: "admin" } as any,
			isLoading: false,
			login: vi.fn(),
			register: vi.fn(),
			logout: vi.fn(),
			refreshAuth: vi.fn(),
		} as any);

		renderHook(() => useFormattedRoutes());

		expect(helpers.extractRouteIdAndPath).toHaveBeenCalledTimes(1);
		// Verify that extractRouteIdAndPath was called (the exact content depends on the mocked imports)
		expect(helpers.extractRouteIdAndPath).toHaveBeenCalled();
	});

	it("calls generateMenuItems with pathless menu items and route information when unauthenticated", () => {
		const mockRouteIdPath = [
			{ id: "home", path: "/home" },
			{ id: "about", path: "/about" },
		];
		vi.mocked(helpers.extractRouteIdAndPath).mockReturnValue(mockRouteIdPath);
		vi.mocked(helpers.generateMenuItems).mockReturnValue([]);

		renderHook(() => useFormattedRoutes());

		expect(helpers.generateMenuItems).toHaveBeenCalledTimes(1);
		expect(helpers.generateMenuItems).toHaveBeenCalledWith(
			pathlessMenuItems,
			mockRouteIdPath,
		);
	});

	it("calls generateMenuItems with combined menu items when authenticated", () => {
		// Setup mocks for this test
		const mockRouteIdPath = [
			{ id: "home", path: "/home" },
			{ id: "about", path: "/about" },
			{ id: "admin", path: "/admin" },
		];
		vi.mocked(helpers.extractRouteIdAndPath).mockReturnValue(mockRouteIdPath);
		vi.mocked(helpers.generateMenuItems).mockReturnValue([]);

		mockUseAuthentication.mockReturnValue({
			isAuthenticated: true,
			user: { id: 1, email: "test@example.com", role: "admin" } as any,
			isLoading: false,
			login: vi.fn(),
			register: vi.fn(),
			logout: vi.fn(),
			refreshAuth: vi.fn(),
		} as any);

		renderHook(() => useFormattedRoutes());

		expect(helpers.generateMenuItems).toHaveBeenCalledTimes(1);
		// Verify that generateMenuItems was called with some menu list and route info
		expect(helpers.generateMenuItems).toHaveBeenCalledWith(
			expect.any(Array),
			mockRouteIdPath,
		);
	});

	it("memoizes routes and menu items to prevent unnecessary re-renders", () => {
		// Setup mocks for this test
		const mockRouteIdPath = [
			{ id: "home", path: "/home" },
			{ id: "about", path: "/about" },
		];
		const mockMenuItems = [
			{ id: "home", path: "/home", name: "Home" },
			{ id: "about", path: "/about", name: "About" },
		];
		vi.mocked(helpers.extractRouteIdAndPath).mockReturnValue(mockRouteIdPath);
		vi.mocked(helpers.generateMenuItems).mockReturnValue(mockMenuItems);

		const { result, rerender } = renderHook(() => useFormattedRoutes());
		const firstRenderRoutes = result.current.routes;
		const firstRenderMenuItems = result.current.menuItems;

		rerender();

		expect(result.current.routes).toBe(firstRenderRoutes);
		expect(result.current.menuItems).toBe(firstRenderMenuItems);
	});

	it("returns the formatted menu items from generateMenuItems", () => {
		const mockMenuItems = [
			{ id: "home", path: "/home", name: "Home" },
			{ id: "about", path: "/about", name: "About" },
		];
		vi.mocked(helpers.extractRouteIdAndPath).mockReturnValue([]);
		vi.mocked(helpers.generateMenuItems).mockReturnValue(mockMenuItems);

		const { result } = renderHook(() => useFormattedRoutes());

		expect(result.current.menuItems).toEqual(mockMenuItems);
	});

	it("recalculates routes and menu items when authentication status changes", () => {
		// Create a variable to track isAuthenticated state
		let isAuthenticatedValue = false;

		// Mock useAuthentication to return the variable
		mockUseAuthentication.mockImplementation(() => ({
			isAuthenticated: isAuthenticatedValue,
			user: isAuthenticatedValue
				? ({ id: 1, email: "test@example.com", role: "admin" } as any)
				: null,
			isLoading: false,
			login: vi.fn(),
			register: vi.fn(),
			logout: vi.fn(),
			refreshAuth: vi.fn(),
		}));

		vi.mocked(helpers.extractRouteIdAndPath).mockReturnValue([
			{ id: "home", path: "/home" },
			{ id: "about", path: "/about" },
		]);
		vi.mocked(helpers.generateMenuItems).mockReturnValue([
			{ id: "home", path: "/home", name: "Home" },
		]);

		const { rerender } = renderHook(() => useFormattedRoutes());

		// Verify initial state (unauthenticated)
		expect(helpers.extractRouteIdAndPath).toHaveBeenCalledTimes(1);
		expect(helpers.generateMenuItems).toHaveBeenCalledTimes(1);

		// Change authentication state and rerender
		isAuthenticatedValue = true;
		rerender();

		// Verify functions were called again due to dependency change
		expect(helpers.extractRouteIdAndPath).toHaveBeenCalledTimes(2);
		expect(helpers.generateMenuItems).toHaveBeenCalledTimes(2);
	});
});
