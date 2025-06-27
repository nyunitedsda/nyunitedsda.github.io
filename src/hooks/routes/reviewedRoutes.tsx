import { lazy } from "react";
import { type RouteObject } from "react-router";
import MinimalPageWrapper from "../../components/PageWrapper/MinimalPageWrapper.tsx";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ProtectedPageWrapper from "../../components/PageWrapper/ProtectedPageWrapper.tsx";
import Administration from "../../pages/Admin/Administration.tsx";
import Login from "../../pages/Login/Login.tsx";
const BlogDetails = lazy(() => import("../../pages/Blog/BlogDetails"));
const AboutUs = lazy(() => import("../../pages/AboutUs/AboutUs"));
const Blog = lazy(() => import("../../pages/Blog/Blog"));
const Contact = lazy(() => import("../../pages/Contact/Contact"));
const Donations = lazy(() => import("../../pages/Donations/Donations"));
const Error = lazy(() => import("../../pages/Error/Error.tsx"));
const Home = lazy(() => import("../../pages/Home/Home"));
const LiveBroadcast = lazy(
	() => import("../../pages/LiveBroadcast/LiveBroadcast"),
);
const UserAgreements = lazy(
	() => import("../../pages/UserAgreements/UserAgreements"),
);

const BASE_URL = import.meta.env.VITE_BASE_URL ?? "/";

/**
 * Main layout routes that do not require authentication
 * These routes will have Header and Footer in layout
 * Id property is used to find the routes that will be menu items
 */
const mainLayoutRoutes: RouteObject[] = [
	{
		element: <PageWrapper />,
		children: [
			{
				element: <Home />,
				id: "home",
				path: `${BASE_URL}`,
			},
			{
				element: <Donations />,
				id: "donations",
				path: `${BASE_URL}donations`,
			},
			{
				element: <Blog />,
				id: "blogs",
				path: `${BASE_URL}blog`,
			},
			{
				element: <BlogDetails />,
				id: "blogDetails",
				path: `${BASE_URL}blog/:id`,
			},
			{
				element: <Contact />,
				id: "contact",
				path: `${BASE_URL}contact`,
			},
			{
				element: <AboutUs />,
				id: "aboutUs",
				path: `${BASE_URL}aboutUs`,
			},
			{
				element: <UserAgreements />,
				id: "policy",
				path: `${BASE_URL}policy/:tab?`,
			},
			{
				element: <UserAgreements />,
				id: "termsOfUse",
				path: `${BASE_URL}policy/termsOfUse`,
			},
			{
				element: <UserAgreements />,
				id: "privacy",
				path: `${BASE_URL}policy/privacy`,
			},
			{
				element: <LiveBroadcast />,
				id: "liveStream",
				path: `${BASE_URL}watch/:tab?`,
			},
			{
				element: <LiveBroadcast />,
				id: "live",
				path: `${BASE_URL}watch/live`,
			},
			{
				element: <LiveBroadcast />,
				id: "archive",
				path: `${BASE_URL}watch/archive`,
			},
		],
	},
];

/**
 * Protected routes that require authentication
 */
export const protectedRoutes: RouteObject[] = [
	{
		element: <ProtectedPageWrapper />,
		children: [
			{
				element: <Administration />,
				id: "admin",
				path: `${BASE_URL}admin/:tab?`,
			},
		],
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
			{
				element: <Login />,
				path: `${BASE_URL}login`,
			},
			{
				element: <Error />,
				path: "*",
			},
		],
	},
];

const siteRoutes: RouteObject[] = [...mainLayoutRoutes, ...fallbackRoutes];

export default siteRoutes;
