import { describe, it, expect } from "vitest";
import { formatRoutes, generateMenuItems } from "./helpers";

describe("formatRoutes", () => {
	it("formats a simple route", () => {
		const input = [{ path: "/home", element: "<Home />", name: "Home" }];
		const output = formatRoutes(input);
		expect(output).toEqual([
			{
				path: "/home",
				element: "<Home />",
				caseSensitive: false,
				errorElement: undefined,
			},
		]);
	});

	it("formats an index route", () => {
		const input = [{ index: true, element: "<Index />", name: "Index" }];
		const output = formatRoutes(input);
		expect(output).toEqual([
			{ index: true, element: "<Index />", errorElement: undefined },
		]);
	});

	it("formats nested routes", () => {
		const input = [
			{
				path: "/parent",
				element: "<Parent />",
				children: [{ path: "child", element: "<Child />", name: "Child" }],
			},
		];
		const output = formatRoutes(input);
		expect(output).toEqual([
			{
				path: "/parent",
				element: "<Parent />",
				caseSensitive: false,
				errorElement: undefined,
				children: [
					{
						path: "child",
						element: "<Child />",
						caseSensitive: false,
						errorElement: undefined,
					},
				],
			},
		]);
	});
});

describe("generateMenuItems", () => {
	it("generates menu items from routes", () => {
		const input = [
			{ path: "/home", name: "Home", icon: "icon1" },
			{ path: "/about", name: "About", icon: "icon2" },
		];
		const output = generateMenuItems(input);
		expect(output).toEqual([
			{ path: "/home", name: "Home", icon: "icon1" },
			{ path: "/about", name: "About", icon: "icon2" },
		]);
	});

	it("handles nested routes", () => {
		const input = [
			{
				path: "/parent",
				name: "Parent",
				icon: "iconP",
				children: [{ path: "/child", name: "Child", icon: "iconC" }],
			},
		];
		const output = generateMenuItems(input);
		expect(output).toEqual([
			{ path: "/parent", name: "Parent", icon: "iconP" },
			{ path: "/child", name: "Child", icon: "iconC" },
		]);
	});

	it("skips routes without name, icon, or path", () => {
		const input = [{ element: "<NoMenu />" }];
		const output = generateMenuItems(input);
		expect(output).toEqual([]);
	});
});
