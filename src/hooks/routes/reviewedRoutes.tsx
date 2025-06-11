import Stack from "@mui/material/Stack";
import { type FC, lazy } from "react";
import { Outlet, type RouteObject } from "react-router";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
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

const MinimalLayout: FC = () => (
	<Stack sx={{ width: "100%", height: "100%", color: "text.primary" }}>
		<Outlet />
	</Stack>
);

// NOTE: Id is used to find the routes that will be menu items

// Public routes with main layout: blog/:id
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
				id: "termsOfUse",
				path: `${BASE_URL}termsOfUse`,
			},
			{
				element: <UserAgreements />,
				id: "privacy",
				path: `${BASE_URL}privacy`,
			},
			{
				element: <LiveBroadcast />,
				id: "liveStream",
				path: `${BASE_URL}watch-live`,
			},
			{
				element: <LiveBroadcast />,
				id: "archiveStream",
				path: `${BASE_URL}watch-archive`,
			},
		],
	},
	// {
	// 	element: <StreamWrapper />,
	// 	children: [
	// 		{
	// 			element: <LiveBroadcast />,
	// 			id: "liveStream",
	// 			path: `${BASE_URL}watch-live`,
	// 		},
	// 		{
	// 			element: <LiveBroadcast />,
	// 			id: "archiveStream",
	// 			path: `${BASE_URL}watch-archive`,
	// 		},
	// 	],
	// },
];

// Error routes
const errorRoutes: RouteObject[] = [
	{
		element: <MinimalLayout />,
		children: [
			{
				element: <Error />,
				path: "*",
			},
		],
	},
];

const siteRoutes: RouteObject[] = [...mainLayoutRoutes, ...errorRoutes];

export default siteRoutes;
