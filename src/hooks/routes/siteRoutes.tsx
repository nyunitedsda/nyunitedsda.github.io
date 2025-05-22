import ArticleRounded from "@mui/icons-material/ArticleRounded";
import ContactMailRounded from "@mui/icons-material/ContactMailRounded";
import Diversity3Rounded from "@mui/icons-material/Diversity3Rounded";
import HomeRounded from "@mui/icons-material/HomeRounded";
import LiveTvRounded from "@mui/icons-material/LiveTvRounded";
import VolunteerActivismRounded from "@mui/icons-material/VolunteerActivismRounded";
import { lazy } from "react";
import type { Route } from "./types";
import { LoginRounded } from "@mui/icons-material";

const AboutUs = lazy(() => import("../../pages/AboutUs/AboutUs"));
const Blog = lazy(() => import("../../pages/Blog/Blog"));
const Contact = lazy(() => import("../../pages/Contact/Contact"));
const Donations = lazy(() => import("../../pages/Donations/Donations"));
const Home = lazy(() => import("../../pages/Home/Home"));
const LiveBroadcast = lazy(
	() => import("../../pages/LiveBroadcast/LiveBroadcast"),
);

const BASE_URL = import.meta.env.VITE_BASE_URL || "/nyunitedsda";

const siteRoutes: Route[] = [
	{
		element: <Home />,
		icon: <HomeRounded />,
		name: "Home",
		path: `${BASE_URL}/`,
	},
	{
		element: <LiveBroadcast />,
		icon: <LiveTvRounded />,
		name: "Watch Live",
		path: `${BASE_URL}/liveBroadcast`,
	},
	{
		element: <Donations />,
		icon: <VolunteerActivismRounded />,
		name: "Donations",
		path: `${BASE_URL}/donations`,
	},
	{
		element: <Blog />,
		icon: <ArticleRounded />,
		name: "Blog",
		path: `${BASE_URL}/blog`,
	},
	{
		element: <Contact />,
		icon: <ContactMailRounded />,
		name: "Contact",
		path: `${BASE_URL}/contact`,
	},
	{
		element: <AboutUs />,
		icon: <Diversity3Rounded />,
		name: "About Us",
		path: `${BASE_URL}/aboutUs`,
	},
];

export const authRoutes = [
	{
		element: <Donations />,
		icon: <LoginRounded />,
		name: "Login",
		path: `${BASE_URL}/login`,
	},
];

export default siteRoutes;
