import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useFormattedRoutes from "./useFormattedRoutes";
import * as helpers from "./helpers";
import pathlessMenuItems from "./pathlessMenuItems";
import siteRoutes from "./reviewedRoutes";

// Mock dependencies
vi.mock("./helpers", () => ({
	extractRouteIdAndPath: vi.fn(),
	generateMenuItems: vi.fn(),
}));

vi.mock("./pathlessMenuItems", () => ({
	default: [
		{ id: "home", name: "Home" },
		{ id: "about", name: "About" },
	],
}));

vi.mock("./reviewedRoutes", () => ({
	default: [
		{ id: "home", path: "/home" },
		{ id: "about", path: "/about" },
	],
}));

describe("useFormattedRoutes", () => {
	beforeEach(() => {
		vi.clearAllMocks();

		// Setup mock return values
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
	});

	it("returns routes and menu items with the correct structure", () => {
		const { result } = renderHook(() => useFormattedRoutes());

		expect(result.current).toHaveProperty("routes");
		expect(result.current).toHaveProperty("menuItems");
		expect(Array.isArray(result.current.routes)).toBe(true);
		expect(Array.isArray(result.current.menuItems)).toBe(true);
	});

	it("calls extractRouteIdAndPath with the site routes", () => {
		renderHook(() => useFormattedRoutes());

		expect(helpers.extractRouteIdAndPath).toHaveBeenCalledTimes(1);
		expect(helpers.extractRouteIdAndPath).toHaveBeenCalledWith(siteRoutes);
	});

	it("calls generateMenuItems with pathless menu items and route information", () => {
		const mockRouteIdPath = [
			{ id: "home", path: "/home" },
			{ id: "about", path: "/about" },
		];
		vi.mocked(helpers.extractRouteIdAndPath).mockReturnValue(mockRouteIdPath);

		renderHook(() => useFormattedRoutes());

		expect(helpers.generateMenuItems).toHaveBeenCalledTimes(1);
		expect(helpers.generateMenuItems).toHaveBeenCalledWith(
			pathlessMenuItems,
			mockRouteIdPath,
		);
	});

	it("memoizes routes to prevent unnecessary re-renders", () => {
		const { result, rerender } = renderHook(() => useFormattedRoutes());
		const firstRenderRoutes = result.current.routes;

		rerender();

		expect(result.current.routes).toBe(firstRenderRoutes);
	});

	it("returns the formatted menu items from generateMenuItems", () => {
		const mockMenuItems = [
			{ id: "home", path: "/home", name: "Home" },
			{ id: "about", path: "/about", name: "About" },
		];
		vi.mocked(helpers.generateMenuItems).mockReturnValue(mockMenuItems);

		const { result } = renderHook(() => useFormattedRoutes());

		expect(result.current.menuItems).toEqual(mockMenuItems);
	});
});
