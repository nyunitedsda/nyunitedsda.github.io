import { type RouteObject } from "react-router";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import LiveBroadcast from "../pages/LiveBroadcast/LiveBroadcast";
import Blog from "../pages/Blog/Blog";
import Contact from "../pages/Contact/Contact";

export const BASE_URL = 'nyunitedsda'

const routes: RouteObject[] = [
	{
		element: <Home />,
		index: true,
		path: `/${BASE_URL}/`,
	},
	{
		element: <LiveBroadcast />,
		index: true,
		path: `/${BASE_URL}/live-broadcast`,
	},
	{
		element: <AboutUs />,
		index: true,
		path: `${BASE_URL}/about-us"`
	},
	{
		element: <Blog/>,
		index: true,
		path: `${BASE_URL}/blog"`
	}, 
	{
		element: <Contact/>,
		index: true,
		path: `${BASE_URL}/contact`
	}
];

export default routes;
