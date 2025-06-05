import Error from "../../pages/Error/Error.tsx";
import Login from "../../pages/Login/Login.tsx";
import type { Route } from "./types.ts";
import AboutUs from "../../pages/AboutUs/AboutUs.tsx";
import Blog from "../../pages/Blog/Blog.tsx";
import Contact from "../../pages/Contact/Contact.tsx";
import Donations from "../../pages/Donations/Donations.tsx";
import Home from "../../pages/Home/Home.tsx";
import LiveBroadcast from "../../pages/LiveBroadcast/LiveBroadcast.tsx";
import UserAgreements from "../../pages/UserAgreements/UserAgreements.tsx";

const BASE_URL = "/";

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
		element: <Donations />,
		errorElement: <Error />,
		icon: "VolunteerActivismRounded",
		name: "Donations",
		path: `${BASE_URL}donations`,
	},
	{
		element: <Blog />,
		errorElement: <Error />,
		icon: "ArticleRounded",
		name: "Blog",
		path: `${BASE_URL}blog`,
	},
	{
		element: <Contact />,
		errorElement: <Error />,
		icon: "ContactMailRounded",
		name: "Contact",
		path: `${BASE_URL}contact`,
	},
	{
		element: <AboutUs />,
		errorElement: <Error />,
		icon: "Diversity3Rounded",
		name: "About Us",
		path: `${BASE_URL}aboutUs`,
	},
	{
		element: <UserAgreements />,
		errorElement: <Error />,
		path: `${BASE_URL}termsOfUse`,
	},
	{
		element: <UserAgreements />,
		errorElement: <Error />,
		path: `${BASE_URL}privacy`,
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
