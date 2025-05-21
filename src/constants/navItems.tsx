import {
	Article,
	ContactMail,
	Diversity3Rounded,
	Home,
	LiveTv,
} from "@mui/icons-material";
import type { ReactNode } from "react";

export interface NavItem {
	name: string;
	path: string;
	icon: ReactNode;
}

const BASE_URL = "/nyunitedsda";

const navItems: NavItem[] = [
	{ name: "Home", path: `${BASE_URL}/`, icon: <Home /> },
	{ name: "Watch Live", path: `${BASE_URL}/liveBroadcast`, icon: <LiveTv /> },
	{ name: "Blog", path: `${BASE_URL}/blog`, icon: <Article /> },
	{
		name: "About Us",
		path: `${BASE_URL}/aboutUs`,
		icon: <Diversity3Rounded />,
	},
	{ name: "Contacts", path: `${BASE_URL}/contact`, icon: <ContactMail /> },
];

export default navItems;
