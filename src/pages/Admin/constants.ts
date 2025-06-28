import { createElement } from "react";
import type { RouteTabsItem } from "../../components/RoutedTabs/types";
import AnnouncementManagement from "./components/AnnouncementManagement";
import BlogManagement from "./components/BlogManagement";
import ContactManagement from "./components/ContactManagement";
import DonationManagement from "./components/DonationManagement";
import NotificationManagement from "./components/NotificationManagement";
import ServiceManagement from "./components/ServiceManagement";
import SettingManagement from "./components/SettingManagement";
import UserManagement from "./components/UserManagement";

/**
 * List of tabs for the admin panel.
 * Each tab contains an id, a tag for routing, a label for display,
 * and the content to be rendered when the tab is active.
 */
export const ADMIN_TAB_LIST: RouteTabsItem[] = [
	{
		id: 1,
		tag: "users",
		label: "Users",
		content: () => createElement(UserManagement),
	},
	{
		id: 2,
		tag: "notifications",
		label: "Notifications",
		content: () => createElement(NotificationManagement),
	},
	{
		id: 3,
		tag: "announcements",
		label: "Announcements",
		content: () => createElement(AnnouncementManagement),
	},
	{
		id: 4,
		tag: "services",
		label: "Services",
		content: () => createElement(ServiceManagement),
	},
	{
		id: 5,
		tag: "contacts",
		label: "Contact Info",
		content: () => createElement(ContactManagement),
	},
	{
		id: 6,
		tag: "donations",
		label: "Donations",
		content: () => createElement(DonationManagement),
	},
	{
		id: 7,
		tag: "blogs",
		label: "Blogs",
		content: () => createElement(BlogManagement),
	},
	{
		id: 8,
		tag: "settings",
		label: "Settings",
		content: () => createElement(SettingManagement),
	},
];
