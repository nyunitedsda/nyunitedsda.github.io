import {
	blogDetailLoader,
	blogLoader,
	homeLoader,
	pageLoader,
} from "@hooks/routes";
import { Skeleton } from "@mui/material";
import { createElement } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/Layout";

// Helper for lazy loading React components
const createComponent = async (
	importFn: () => Promise<{ default: React.ComponentType<any> }>,
) => {
	return await importFn().then((mod) => ({
		element: createElement(mod.default),
	}));
};

const routes = createBrowserRouter([
	{
		path: "/",
		element: createElement(AppLayout),
		hydrateFallbackElement: createElement(Skeleton),
		loader: pageLoader,
		children: [
			{
				index: true,
				lazy: () => createComponent(() => import("@pages/Home")),
				loader: homeLoader,
				id: "home",
			},
			{
				path: "watch/:tab?",
				lazy: () => createComponent(() => import("@pages/LiveBroadcast")),
				id: "watch",
			},
			{
				path: "watch/live",
				lazy: () => createComponent(() => import("@pages/LiveBroadcast")),
				id: "liveStream",
			},
			{
				path: "watch/archive",
				lazy: () => createComponent(() => import("@pages/LiveBroadcast")),
				id: "archiveStream",
			},

			{
				path: "blog/:id",
				lazy: () => createComponent(() => import("@pages/Blog/Details")),
				id: "blogDetails",
				loader: blogDetailLoader,
			},
			{
				path: "blog",
				lazy: () => createComponent(() => import("@pages/Blog")),
				loader: blogLoader,
				id: "blogs",
			},
			{
				path: "contact",
				lazy: () => createComponent(() => import("@pages/Contact")),
				id: "contact",
			},
			{
				path: "aboutUs",
				lazy: () => createComponent(() => import("@pages/AboutUs")),
				id: "aboutUs",
			},
			{
				path: "donations",
				lazy: () => createComponent(() => import("@pages/Donations")),
				id: "donations",
			},
			{
				path: "login",
				lazy: () => createComponent(() => import("@pages/Login")),
				id: "login",
			},
			{
				path: "policy/privacy",
				lazy: () => createComponent(() => import("@pages/UserAgreements")),
				id: "privacy",
			},
			{
				path: "policy/termsOfUse",
				lazy: () => createComponent(() => import("@pages/UserAgreements")),
				id: "terms",
			},
		],
	},
	{
		path: "admin/:tab?",
		element: createElement(AppLayout, { restricted: true }),
		hydrateFallbackElement: createElement(Skeleton),
		loader: pageLoader,
		children: [
			{
				path: "users",
				lazy: () => createComponent(() => import("@pages/Admin")),
				id: "admin-user",
			},
			{
				path: "announcements",
				lazy: () => createComponent(() => import("@pages/Admin")),
				id: "admin-announcements",
			},
			{
				path: "articles",
				lazy: () => createComponent(() => import("@pages/Admin")),
				id: "admin-articles",
			},
			{
				path: "contact_info",
				lazy: () => createComponent(() => import("@pages/Admin")),
				id: "admin-contact-info",
			},
			{
				path: "donations",
				lazy: () => createComponent(() => import("@pages/Admin")),
				id: "admin-donations",
			},
			{
				path: "legal_content",
				lazy: () => createComponent(() => import("@pages/Admin")),
				id: "admin-legal-content",
			},
			{
				path: "ministries",
				lazy: () => createComponent(() => import("@pages/Admin")),
				id: "admin-ministries",
			},
			{
				path: "notifications",
				lazy: () => createComponent(() => import("@pages/Admin")),
				id: "admin-notifications",
			},
			{
				path: "services",
				lazy: () => createComponent(() => import("@pages/Admin")),
				id: "admin-services",
			},
			{
				path: "settings",
				lazy: () => createComponent(() => import("@pages/Admin")),
				id: "admin-settings",
			},
		],
	},
	{
		path: "library",
		element: createElement(AppLayout, { restricted: true }),
		hydrateFallbackElement: createElement(Skeleton),
		loader: pageLoader,
		children: [
			{
				index: true,
				lazy: () =>
					createComponent(() => import("@pages/Storybook")),
				id: "library",
			},
		],
	},
	{
		path: "unauthorized",
		loader: pageLoader,
		element: createElement(AppLayout),
		hydrateFallbackElement: createElement(Skeleton),
		children: [
			{
				path: "unauthorized",
				lazy: () => createComponent(() => import("@pages/Error/Auth")),
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
				lazy: () => createComponent(() => import("@pages/Error")),
				id: "notFound",
			},
		],
	},
]);

export default routes;
