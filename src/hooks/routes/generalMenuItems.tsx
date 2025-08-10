import routePaths from "./routePaths";
import type { RouteMenu } from "./types";

const generalMenuItems: RouteMenu[] = [
	{
		id: "home",
		icon: "HomeRounded",
		name: "Home",
		path: routePaths.HOME,
	},
	{
		id: "watch",
		icon: "LiveTvRounded",
		name: "Watch",
		path: routePaths.WATCH,
		children: [
			{
				id: "liveStream",
				name: "Watch Live",
				path: routePaths.WATCH_LIVE,
			},
			{
				id: "archiveStream",
				name: "Watch Archive",
				path: routePaths.WATCH_ARCHIVE,
			},
			// {
			// 	id: "youtubeArchive",
			// 	name: "Watch Youtube Archive",
			// },
		],
	},
	{
		icon: "VolunteerActivismRounded",
		name: "Donations",
		id: "donations",
		path: routePaths.DONATIONS,
	},
	{
		icon: "ArticleRounded",
		name: "Blog",
		id: "blogs",
		path: routePaths.BLOG,
	},
	{
		icon: "ContactMailRounded",
		name: "Contact",
		id: "contact",
		path: routePaths.CONTACT,
	},
	{
		icon: "Diversity3Rounded",
		name: "About Us",
		id: "aboutUs",
		path: routePaths.ABOUT_US,
	},
	// {
	// 	id: "admin",
	// 	icon: "AdminPanelSettingsOutlined",
	// 	name: "Administration",
	// },
];

export const restrictedMenuItems: RouteMenu[] = [
	{
		id: "admin",
		icon: "AdminPanelSettingsOutlined",
		name: "Administration",
		path: routePaths.ADMIN,
		children: [
			{
				id: "admin-user",
				name: "User",
				path: routePaths.ADMIN_USERS,
			},
			{
				id: "admin-announcements",
				name: "Announcements",
				path: routePaths.ADMIN_ANNOUNCEMENTS,
			},
			{
				id: "admin-articles",
				name: "Articles",
				path: routePaths.ADMIN_ARTICLES,
			},
			{
				id: "admin-contact-info",
				name: "Contact Info",
				path: routePaths.ADMIN_CONTACT_INFO,
			},
			{
				id: "admin-donations",
				name: "Donations",
				path: routePaths.ADMIN_DONATIONS,
			},
			{
				id: "admin-legal-content",
				name: "Legal Content",
				path: routePaths.ADMIN_LEGAL_CONTENT,
			},
			{
				id: "admin-ministries",
				name: "Ministries",
				path: routePaths.ADMIN_MINISTRIES,
			},
			{
				id: "admin-notifications",
				name: "Notifications",
				path: routePaths.ADMIN_NOTIFICATIONS,
			},
			{
				id: "admin-services",
				name: "Services",
				path: routePaths.ADMIN_SERVICES,
			},
			{
				id: "admin-settings",
				name: "Settings",
				path: routePaths.ADMIN_SETTINGS,
			},
		],
	},
	{
		id: "library",
		icon: "WidgetsRounded",
		name: "Library",
		path: routePaths.LIBRARY,
	},
];

export default generalMenuItems;
