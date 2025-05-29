import { LoginRounded } from "@mui/icons-material";
import ArticleRounded from "@mui/icons-material/ArticleRounded";
import ContactMailRounded from "@mui/icons-material/ContactMailRounded";
import Diversity3Rounded from "@mui/icons-material/Diversity3Rounded";
import HomeRounded from "@mui/icons-material/HomeRounded";
import LiveTvRounded from "@mui/icons-material/LiveTvRounded";
import VolunteerActivismRounded from "@mui/icons-material/VolunteerActivismRounded";
import { lazy } from "react";
import Error from "../../pages/Error/Error";
import Login from "../../pages/Login/Login";
import UserAgreements from "../../pages/UserAgreements/UserAgreements";
import type { Route } from "./types";

const AboutUs = lazy(() => import("../../pages/AboutUs/AboutUs"));
const Blog = lazy(() => import("../../pages/Blog/Blog"));
const Contact = lazy(() => import("../../pages/Contact/Contact"));
const Donations = lazy(() => import("../../pages/Donations/Donations"));
const Home = lazy(() => import("../../pages/Home/Home"));
const LiveBroadcast = lazy(
	() => import("../../pages/LiveBroadcast/LiveBroadcast"),
);

const BASE_URL = import.meta.env.VITE_BASE_URL || "/nyunitedsda/";

const siteRoutes: Route[] = [
	{
		element: <Home />,
		icon: <HomeRounded />,
		name: "Home",
		path: `${BASE_URL}`,
		errorElement: <Error />,
	},
	{
		// caseSensitive: true,
		element: <LiveBroadcast />,
		icon: <LiveTvRounded />,
		name: "Watch Live",
		path: `${BASE_URL}liveBroadcast`,
		errorElement: <Error />,
	},
	{
		caseSensitive: true,
		element: <Donations />,
		icon: <VolunteerActivismRounded />,
		name: "Donations",
		path: `${BASE_URL}donations`,
		errorElement: <Error />,
	},
	{
		caseSensitive: true,
		element: <Blog />,
		icon: <ArticleRounded />,
		name: "Blog",
		path: `${BASE_URL}blog`,
		errorElement: <Error />,
	},
	{
		caseSensitive: true,
		element: <Contact />,
		icon: <ContactMailRounded />,
		name: "Contact",
		path: `${BASE_URL}contact`,
		errorElement: <Error />,
	},
	{
		caseSensitive: true,
		element: <AboutUs />,
		icon: <Diversity3Rounded />,
		name: "About Us",
		path: `${BASE_URL}aboutUs`,
		errorElement: <Error />,
	},
	{
		caseSensitive: true,
		element: <UserAgreements />,
		path: `${BASE_URL}legal/termsOfUse`,
		errorElement: <Error />,
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
		icon: <LoginRounded />,
		name: "Login",
		path: `${BASE_URL}login`,
	},
];

export default siteRoutes;
