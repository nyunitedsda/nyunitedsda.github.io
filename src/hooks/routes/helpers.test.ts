import { describe, expect, it } from "vitest";
import { extractRouteIdAndPath, generateMenuItems } from "./helpers";

describe("generateMenuItems", () => {
	it("generates menu items from routes", () => {
		const menuList = [
			{ id: "home", name: "Home", icon: "icon1" },
			{ id: "about", name: "About", icon: "icon2" },
		];
		const routes = [
			{ id: "home", path: "/home" },
			{ id: "about", path: "/about" },
		];
		const output = generateMenuItems(menuList, routes);
		expect(output).toEqual([
			{ id: "home", path: "/home", name: "Home", icon: "icon1" },
			{ id: "about", path: "/about", name: "About", icon: "icon2" },
		]);
	});

	it("handles nested routes", () => {
		const menuList = [
			{
				id: "parent",
				name: "Parent",
				icon: "iconP",
				children: [{ id: "child", name: "Child", icon: "iconC" }],
			},
		];
		const routes = [
			{ id: "parent", path: "/parent" },
			{ id: "child", path: "/child" },
		];
		const output = generateMenuItems(menuList, routes);
		expect(output).toEqual([
			{
				id: "parent",
				path: "/parent",
				name: "Parent",
				icon: "iconP",
				children: [
					{
						id: "child",
						path: "/child",
						name: "Child",
						icon: "iconC",
					},
				],
			},
		]);
	});

	it("skips items without id", () => {
		const menuList = [
			{ name: "NoId", icon: "icon", id: "invalid" },
			{ id: "valid", name: "Valid" },
		];
		const routes = [{ id: "valid", path: "/valid" }];
		const output = generateMenuItems(menuList, routes);
		expect(output).toEqual([{ id: "valid", path: "/valid", name: "Valid" }]);
	});

	it("handles empty routes array", () => {
		const menuList = [{ id: "test", name: "Test" }];
		const routes: any[] = [];
		const output = generateMenuItems(menuList, routes);
		expect(output).toEqual([]);
	});

	it("handles menu items with no matching route", () => {
		const menuList = [{ id: "nomatch", name: "No Match" }];
		const routes = [{ id: "different", path: "/different" }];
		const output = generateMenuItems(menuList, routes);
		expect(output).toEqual([]);
	});

	it("handles empty children arrays", () => {
		const menuList = [{ id: "parent", name: "Parent", children: [] }];
		const routes = [{ id: "parent", path: "/parent" }];
		const output = generateMenuItems(menuList, routes);
		expect(output).toEqual([{ id: "parent", path: "/parent", name: "Parent" }]);
	});
});

describe("extractRouteIdAndPath", () => {
	it("extracts id and path from routes", () => {
		const routes = [
			{ id: "home", path: "/home" },
			{ id: "about", path: "/about" },
		];
		const result = extractRouteIdAndPath(routes);
		expect(result).toEqual([
			{ id: "home", path: "/home" },
			{ id: "about", path: "/about" },
		]);
	});

	it("handles nested routes", () => {
		const routes = [
			{
				id: "parent",
				path: "/parent",
				children: [{ id: "child", path: "/child" }],
			},
		];
		const result = extractRouteIdAndPath(routes);
		expect(result).toEqual([
			{ id: "parent", path: "/parent" },
			{ id: "child", path: "/child" },
		]);
	});

	it("skips routes without both id and path", () => {
		const routes = [
			{ id: "onlyId" },
			{ path: "/onlyPath" },
			{ id: "valid", path: "/valid" },
		];
		const result = extractRouteIdAndPath(routes);
		expect(result).toEqual([{ id: "valid", path: "/valid" }]);
	});
});
