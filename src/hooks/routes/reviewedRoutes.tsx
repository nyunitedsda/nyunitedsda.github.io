import { lazy } from "react";
import { type RouteObject } from "react-router";

// Lazy load all page wrappers for better code splitting
const MinimalPageWrapper = lazy(
	() => import("../../components/PageWrapper/MinimalPageWrapper"),
);
const PageWrapper = lazy(
	() => import("../../components/PageWrapper/PageWrapper"),
);
const ProtectedPageWrapper = lazy(
	() => import("../../components/PageWrapper/ProtectedPageWrapper"),
);

// Lazy load all page components for optimal performance
const AboutUs = lazy(() => import("../../pages/AboutUs/AboutUs"));
const Administration = lazy(() => import("../../pages/Admin/Administration"));
const Blog = lazy(() => import("../../pages/Blog/Blog"));
const BlogDetails = lazy(() => import("../../pages/Blog/BlogDetails"));
const Contact = lazy(() => import("../../pages/Contact/Contact"));
const Donations = lazy(() => import("../../pages/Donations/Donations"));
const Error = lazy(() => import("../../pages/Error/Error"));
const Home = lazy(() => import("../../pages/Home/Home"));
const LiveBroadcast = lazy(
	() => import("../../pages/LiveBroadcast/LiveBroadcast"),
);
const Login = lazy(() => import("../../pages/Login/Login"));
const UnauthorizedError = lazy(
	() => import("../../pages/Error/UnauthorizedError"),
);
const UserAgreements = lazy(
	() => import("../../pages/UserAgreements/UserAgreements"),
);

// Constants
const BASE_URL = import.meta.env.VITE_BASE_URL ?? "/";

// Helper function to create consistent route paths
const createPath = (path: string): string =>
	`${BASE_URL}${path}`.replace(/\/+/g, "/");

// Helper function to create route objects with consistent structure
const createRoute = (
	element: React.ReactElement,
	path: string,
	id?: string,
): RouteWithId => ({
	element,
	path: createPath(path),
	...(id && { id }),
});

// Type for routes with id property
type RouteWithId = RouteObject & { id?: string };

/**
 * Main layout routes that do not require authentication
 * These routes will have Header and Footer in layout
 * Id property is used to find the routes that will be menu items
 */
const mainLayoutRoutes: RouteWithId[] = [
	{
		element: <PageWrapper />,
		children: [
			createRoute(<Home />, "", "home"),
			createRoute(<Donations />, "donations", "donations"),
			createRoute(<Blog />, "blog", "blogs"),
			createRoute(<BlogDetails />, "blog/:id", "blogDetails"),
			createRoute(<Contact />, "contact", "contact"),
			createRoute(<AboutUs />, "aboutUs", "aboutUs"),
			createRoute(<UserAgreements />, "policy/:tab?", "policy"),
			createRoute(<LiveBroadcast />, "watch/:tab?", "watch"),
			createRoute(<LiveBroadcast />, "watch/live", "liveStream"),
			createRoute(<LiveBroadcast />, "watch/archive", "archiveStream"),
		],
	},
];

/**
 * Protected routes that require authentication
 */
export const protectedRoutes: RouteWithId[] = [
	{
		element: <ProtectedPageWrapper />,
		children: [createRoute(<Administration />, "admin/:tab?", "admin")],
	},
];

/**
 * Routes that do not require authentication,
 * also do not need Header or footer in layout
 */
const fallbackRoutes: RouteObject[] = [
	{
		element: <MinimalPageWrapper />,
		children: [
			createRoute(<Login />, "login"),
			createRoute(<UnauthorizedError />, "unauthorized"),
			{ element: <Error />, path: "*" }, // Wildcard route doesn't need helper
		],
	},
];

// Combine all routes for export
const siteRoutes: RouteObject[] = [
	...mainLayoutRoutes,
	...protectedRoutes,
	...fallbackRoutes,
];

// Export individual route arrays for flexibility
export { fallbackRoutes, mainLayoutRoutes };

// Export the main routes configuration
export default siteRoutes;

// Export helper functions for external use
export { createPath, createRoute };

// Export route constants for consistency
export const ROUTE_PATHS = {
	HOME: createPath(""),
	DONATIONS: createPath("donations"),
	BLOG: createPath("blog"),
	CONTACT: createPath("contact"),
	ABOUT_US: createPath("aboutUs"),
	POLICY: createPath("policy"),
	WATCH: createPath("watch"),
	ADMIN: createPath("admin"),
	LOGIN: createPath("login"),
	UNAUTHORIZED: createPath("unauthorized"),
} as const;
