import type { ReactElement } from "react";
import type { RouteObject } from "react-router";

const BASE_URL = import.meta.env.VITE_BASE_URL ?? "/";

export const createPath = (path: string): string =>
	`${BASE_URL}${path}`.replace(/\/+/g, "/");

export const createRoute = (
	element: ReactElement,
	path: string,
	id?: string,
): RouteObject => ({
	element,
	path: createPath(path),
	...(id && { id }),
});
