import { Skeleton } from "@mui/material";
import { createElement } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../../Layout";
import Error from "../../pages/Error/Error";
import { blogDetailLoader, blogLoader, homeLoader } from "./loaders";

// Helper for lazy loading React components
const createComponent = (
	importFn: () => Promise<{ default: React.ComponentType<any> }>,
) => {
	return importFn().then((mod) => ({ element: createElement(mod.default) }));
};

const routes = createBrowserRouter([
	{
		path: "/",
		element: createElement(AppLayout),
		errorElement: createElement(Error),
		hydrateFallbackElement: createElement(Skeleton),
		children: [
			{
				index: true,
				lazy: () => createComponent(() => import("../../pages/Home/Home")),
				loader: homeLoader,
				id: "home",
			},
			{
				path: "watch/:tab?",
				lazy: () =>
					createComponent(
						() => import("../../pages/LiveBroadcast/LiveBroadcast"),
					),
				id: "watch",
			},
			{
				path: "watch/live",
				lazy: () =>
					createComponent(
						() => import("../../pages/LiveBroadcast/LiveBroadcast"),
					),
				id: "liveStream",
			},
			{
				path: "watch/archive",
				lazy: () =>
					createComponent(
						() => import("../../pages/LiveBroadcast/LiveBroadcast"),
					),
				id: "archiveStream",
			},

			{
				path: "blog/:id",
				lazy: () =>
					createComponent(() => import("../../pages/Blog/BlogDetails")),
				id: "blogDetails",
				loader: blogDetailLoader,
			},
			{
				path: "blog",
				lazy: () => createComponent(() => import("../../pages/Blog/Blog")),
				loader: blogLoader,
				id: "blogs",
			},
			{
				path: "contact",
				lazy: () =>
					createComponent(() => import("../../pages/Contact/Contact")),
				id: "contact",
			},
			{
				path: "aboutUs",
				lazy: () =>
					createComponent(() => import("../../pages/AboutUs/AboutUs")),
				id: "aboutUs",
			},
			{
				path: "donations",
				lazy: () =>
					createComponent(() => import("../../pages/Donations/Donations")),
				id: "donations",
			},
			{
				path: "login",
				lazy: () => createComponent(() => import("../../pages/Login/Login")),
				id: "login",
			},
			{
				path: "policy/privacy",
				lazy: () =>
					createComponent(
						() => import("../../pages/UserAgreements/UserAgreements"),
					),
				id: "privacy",
			},
			{
				path: "policy/termsOfUse",
				lazy: () =>
					createComponent(
						() => import("../../pages/UserAgreements/UserAgreements"),
					),
				id: "terms",
			},
		],
	},
	{
		path: "admin/:tab?",
		element: createElement(AppLayout, { restricted: true }),
		hydrateFallbackElement: createElement(Skeleton),
		children: [
			{
				path: "users",
				lazy: () =>
					createComponent(() => import("../../pages/Admin/Administration")),
				id: "admin-user",
			},
			{
				path: "announcements",
				lazy: () =>
					createComponent(() => import("../../pages/Admin/Administration")),
				id: "admin-announcements",
			},
			{
				path: "articles",
				lazy: () =>
					createComponent(() => import("../../pages/Admin/Administration")),
				id: "admin-articles",
			},
			{
				path: "contact_info",
				lazy: () =>
					createComponent(() => import("../../pages/Admin/Administration")),
				id: "admin-contact-info",
			},
			{
				path: "donations",
				lazy: () =>
					createComponent(() => import("../../pages/Admin/Administration")),
				id: "admin-donations",
			},
			{
				path: "legal_content",
				lazy: () =>
					createComponent(() => import("../../pages/Admin/Administration")),
				id: "admin-legal-content",
			},
			{
				path: "ministries",
				lazy: () =>
					createComponent(() => import("../../pages/Admin/Administration")),
				id: "admin-ministries",
			},
			{
				path: "notifications",
				lazy: () =>
					createComponent(() => import("../../pages/Admin/Administration")),
				id: "admin-notifications",
			},
			{
				path: "services",
				lazy: () =>
					createComponent(() => import("../../pages/Admin/Administration")),
				id: "admin-services",
			},
			{
				path: "settings",
				lazy: () =>
					createComponent(() => import("../../pages/Admin/Administration")),
				id: "admin-settings",
			},
		],
	},
	{
		path: "library",
		element: createElement(AppLayout, { restricted: true }),
		hydrateFallbackElement: createElement(Skeleton),
		children: [
			{
				index: true,
				lazy: () =>
					createComponent(() => import("../../pages/Storybook/StorybookPage")),
				id: "library",
			},
		],
	},
	{
		path: "unauthorized",
		element: createElement(AppLayout),
		hydrateFallbackElement: createElement(Skeleton),
		children: [
			{
				path: "unauthorized",
				lazy: () =>
					createComponent(() => import("../../pages/Error/UnauthorizedError")),
				id: "unauthorized",
			},
		],
	},
	{
		path: "*",
		element: createElement(AppLayout),
		children: [
			{
				path: "*",
				lazy: () => createComponent(() => import("../../pages/Error/Error")),
				id: "notFound",
			},
		],
	},
]);

export default routes;
