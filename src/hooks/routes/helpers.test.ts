import { createPath, createRoute } from "@/hooks/routes";
import { describe, expect, it } from "@/test";
import { createElement } from "react";

const Element = createElement("div", {}, "Test Element");
const BASE_URL = import.meta.env.BASE_URL || "/";
describe("helpers test", () => {
	it("should create path correctly", () => {
		const path = "/this/is/a/test/path";
		expect(createPath(path)).toBe(`${BASE_URL}/${path}`.replace(/\/+/g, "/"));
	});

	it("should create route with element and path", () => {
		const path = "test-path";
		const route = createRoute(Element, path);
		expect(route).toEqual({
			Element,
			path: `${BASE_URL}/${path}`.replace(/\/+/g, "/"),
		});
	});

	it("should create route with element, path and id", () => {
		const path = "test-path";
		const id = "12345";
		const route = createRoute(Element, path, id);
		expect(route).toEqual({
			Element,
			path: `${BASE_URL}/${path}`.replace(/\/+/g, "/"),
			id,
		});
	});
});
