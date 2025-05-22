import { ArticleRounded, ContactMailRounded, Diversity3Rounded, HomeRounded, LiveTvRounded, VolunteerActivismRounded } from "@mui/icons-material";
import { type RouteObject } from "react-router";
import AboutUs from "../pages/AboutUs/AboutUs";
import Blog from "../pages/Blog/Blog";
import Contact from "../pages/Contact/Contact";
import Donations from "../pages/Donations/Donations";
import Home from "../pages/Home/Home";
import LiveBroadcast from "../pages/LiveBroadcast/LiveBroadcast";

export const BASE_URL = "/nyunitedsda";



const routes: RouteObject[] = [
	{
		element: <Home />,
		index: true,
		path: `${BASE_URL}/`,
	},
	{
		element: <LiveBroadcast />,
		// index: true,
		path: `${BASE_URL}/liveBroadcast`,
	},
	{
		element: <Donations />,
		// index: true,
		path: `${BASE_URL}/donations"`,
	},
	{
		element: <AboutUs />,
		// index: true,
		path: `${BASE_URL}/aboutUs"`,
	},
	{
		element: <Blog />,
		// index: true,
		path: `${BASE_URL}/blog"`,
	},
	{
		element: <Contact />,
		// index: true,
		path: `${BASE_URL}/contact`,
	},
];

export default routes;
