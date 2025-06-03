import { lazy } from "react";
import Error from "../../pages/Error/Error";
import Login from "../../pages/Login/Login";
import type { Route } from "./types";

const AboutUs = lazy(() => import("../../pages/AboutUs/AboutUs"));
const Blog = lazy(() => import("../../pages/Blog/Blog"));
const Contact = lazy(() => import("../../pages/Contact/Contact"));
const Donations = lazy(() => import("../../pages/Donations/Donations"));
const Home = lazy(() => import("../../pages/Home/Home"));
const LiveBroadcast = lazy(
	() => import("../../pages/LiveBroadcast/LiveBroadcast"),
);
const UserAgreements = lazy(
	() => import("../../pages/UserAgreements/UserAgreements"),
);

const BASE_URL = import.meta.env.VITE_BASE_URL || "/"; // "/nyunitedsda/";

const siteRoutes: Route[] = [
	{
		element: <Home />,
		errorElement: <Error />,
		icon: "HomeRounded",
		name: "Home",
		path: `${BASE_URL}`,
	},
	{
		// TODO: Review the menu names for streaming with Zinee
		element: <LiveBroadcast />,
		icon: "LiveTvRounded",
		name: "Watch Live",
		path: `${BASE_URL}watch/live`,
		children: [
			{
				element: <LiveBroadcast />,
				errorElement: <Error />,
				name: "Live Stream",
				path: `${BASE_URL}watch/live`,
			},
			{
				element: <LiveBroadcast />,
				errorElement: <Error />,
				name: "Archive Stream",
				path: `${BASE_URL}watch/archive`,
			},
		],
	},
	{
		caseSensitive: true,
		element: <Donations />,
		errorElement: <Error />,
		icon: "VolunteerActivismRounded",
		name: "Donations",
		path: `${BASE_URL}donations`,
	},
	{
		caseSensitive: true,
		element: <Blog />,
		errorElement: <Error />,
		icon: "ArticleRounded",
		name: "Blog",
		path: `${BASE_URL}blog`,
	},
	{
		caseSensitive: true,
		element: <Contact />,
		errorElement: <Error />,
		icon: "ContactMailRounded",
		name: "Contact",
		path: `${BASE_URL}contact`,
	},
	{
		caseSensitive: true,
		element: <AboutUs />,
		errorElement: <Error />,
		icon: "Diversity3Rounded",
		name: "About Us",
		path: `${BASE_URL}aboutUs`,
	},
	{
		caseSensitive: true,
		element: <UserAgreements />,
		errorElement: <Error />,
		path: `${BASE_URL}legal/termsOfUse`,
	},
	{
		caseSensitive: true,
		element: <UserAgreements />,
		errorElement: <Error />,
		path: `${BASE_URL}legal/privacy`,
	},
	{
		element: <Error />,
		path: "*",
	},
];

export const authRoutes: Route[] = [
	{
		element: <Login />,
		icon: "LoginRounded",
		name: "Login",
		path: `${BASE_URL}login`,
	},
];

export default siteRoutes;
