import { type RouteObject } from "react-router";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import LiveBroadcast from "../pages/LiveBroadcast/LiveBroadcast";
import Blog from "../pages/Blog/Blog";
import Contact from "../pages/Contact/Contact";

const routes: RouteObject[] = [
	{
		element: <Home />,
		index: true,
		path: "/",
	},
	{
		element: <LiveBroadcast />,
		index: true,
		path: "/live-broadcast",
	},
	{
		element: <AboutUs />,
		index: true,
		path: "/about-us",
	},
	{
		element: <Blog/>,
		index: true,
		path: "/blog",
	}, 
	{
		element: <Contact/>,
		index: true,
		path: '/contact'
	}
];

export default routes;
