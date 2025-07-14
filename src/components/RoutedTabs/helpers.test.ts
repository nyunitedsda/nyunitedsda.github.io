import type { RouteObject } from "react-router";
import { describe, expect, it } from "../../test/index.ts";
import { mapRoutesToTabs } from "./helpers.ts";
import type { RouteTabsItem } from "./types.ts";

const defaultElement = "element";

describe("mapRoutesToTabs", () => {
	it("maps routes to tabs correctly", () => {
		const routes: RouteObject[] = [
			{ index: false, path: "/terms-of-service", element: defaultElement },
			{ index: false, path: "/privacy-policy", element: defaultElement },
			{ index: false, path: "/other-page", element: defaultElement },
		];

		const tabList: RouteTabsItem[] = [
			{
				id: 1,
				tag: "terms-of-service",
				label: "Terms",
				content: "Terms content",
			},
			{
				id: 2,
				tag: "privacy-policy",
				label: "Privacy",
				content: "Privacy content",
			},
			{
				id: 3,
				tag: "missing-page",
				label: "Missing",
				content: "Missing content",
			},
		];

		const result = mapRoutesToTabs(routes, tabList);

		// Only 2 items should match
		expect(result).toHaveLength(2);
		expect(result[0].href).toBe("/terms-of-service");
		expect(result[1].href).toBe("/privacy-policy");
		expect(result.find((tab) => tab.tag === "missing-page")).toBeUndefined();
	});

	it("returns empty array when no matches found", () => {
		const routes: RouteObject[] = [
			{ path: "/other-route", element: defaultElement },
		];

		const tabList: RouteTabsItem[] = [
			{
				id: 1,
				tag: "terms-of-service",
				label: "Terms",
				content: "Terms content",
			},
		];

		const result = mapRoutesToTabs(routes, tabList);

		expect(result).toHaveLength(0);
	});
});
