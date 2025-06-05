import Stack from "@mui/material/Stack";
import type { FC } from "react";
import { Outlet, type RouteObject } from "react-router";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import AboutUs from "../../pages/AboutUs/AboutUs";
import Blog from "../../pages/Blog/Blog";
import Contact from "../../pages/Contact/Contact";
import Donations from "../../pages/Donations/Donations";
import Error from "../../pages/Error/Error.tsx";
import Home from "../../pages/Home/Home";
import LiveBroadcast from "../../pages/LiveBroadcast/LiveBroadcast";
import { default as StreamWrapper } from '../../pages/LiveBroadcast/StreamWrapper.tsx';
import UserAgreements from "../../pages/UserAgreements/UserAgreements";

const BASE_URL = "/";

const MinimalLayout: FC = () => (
	<Stack sx={{ width: "100%", height: "100%", color: 'text.primary', }}>
		<Outlet />
	</Stack>
);

// const menuList template= [
// {
// 	(id / tag): 'home',
// 		icon: <HomeRounded />,
// 		children: [];
// }
// ]

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
		],
	},
	{
		element: <StreamWrapper />,
		children: [
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
		]
	}
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
