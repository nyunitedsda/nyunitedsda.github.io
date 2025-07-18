import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router";
import RingLoader from "../../components/Loaders/RingLoader";

// Helper function to wrap components with Suspense
const lazyLoad = (Component: React.LazyExoticComponent<any>) => (
	<Suspense fallback={<RingLoader />}>
		<Component />
	</Suspense>
);

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
const StorybookPage = lazy(() => import("../../pages/Storybook/StorybookPage"));
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
		element: lazyLoad(PageWrapper),
		children: [
			createRoute(lazyLoad(Home), "", "home"),
			createRoute(lazyLoad(Donations), "donations", "donations"),
			createRoute(lazyLoad(Blog), "blog", "blogs"),
			createRoute(lazyLoad(BlogDetails), "blog/:id", "blogDetails"),
			createRoute(lazyLoad(Contact), "contact", "contact"),
			createRoute(lazyLoad(AboutUs), "aboutUs", "aboutUs"),
			createRoute(lazyLoad(UserAgreements), "policy/policy", "policy"),
			createRoute(lazyLoad(UserAgreements), "policy/terms", "terms"),
			createRoute(lazyLoad(LiveBroadcast), "watch/:tab?", "watch"),
			createRoute(lazyLoad(LiveBroadcast), "watch/live", "liveStream"),
			createRoute(lazyLoad(LiveBroadcast), "watch/archive", "archiveStream"),
			// createRoute(lazyLoad(Administration), "admin/:tab?", "admin"),
			createRoute(lazyLoad(Login), "login"),
		],
	},
];

/**
 * Protected routes that require authentication
 */
export const protectedRoutes: RouteWithId[] = [
	{
		element: lazyLoad(ProtectedPageWrapper),
		children: [
			createRoute(lazyLoad(Administration), "admin/:tab?", "admin"),
			createRoute(
				lazyLoad(Administration),
				"admin/announcements",
				"admin-announcements",
			),
			createRoute(lazyLoad(Administration), "admin/articles", "admin-articles"),
			createRoute(
				lazyLoad(Administration),
				"admin/contact_info",
				"admin-contact-info",
			),
			createRoute(
				lazyLoad(Administration),
				"admin/donations",
				"admin-donations",
			),
			createRoute(
				lazyLoad(Administration),
				"admin/legal_content",
				"admin-legal-content",
			),
			createRoute(
				lazyLoad(Administration),
				"admin/ministries",
				"admin-ministries",
			),
			createRoute(
				lazyLoad(Administration),
				"admin/notifications",
				"admin-notifications",
			),
			createRoute(lazyLoad(Administration), "admin/services", "admin-services"),
			createRoute(lazyLoad(Administration), "admin/users", "admin-user"),
			createRoute(lazyLoad(StorybookPage), "storybook", "storybook"),
		],
	},
];

/**
 * Routes that do not require authentication,
 * also do not need Header or footer in layout
 */
const fallbackRoutes: RouteObject[] = [
	{
		element: lazyLoad(MinimalPageWrapper),
		children: [
			createRoute(lazyLoad(UnauthorizedError), "unauthorized"),
			{ element: lazyLoad(Error), path: "*" }, // Wildcard route doesn't need helper
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
	STORYBOOK: createPath("storybook"),
} as const;
