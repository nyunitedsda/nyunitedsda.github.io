import type { PathlessMenu } from "./types";

const pathlessMenuItems: PathlessMenu[] = [
	{
		id: "home",
		icon: "HomeRounded",
		name: "Home",
	},
	{
		id: "watch",
		icon: "LiveTvRounded",
		name: "Watch",
		children: [
			{
				id: "liveStream",
				name: "Watch Live",
			},
			{
				id: "archiveStream",
				name: "Watch Archive",
			},
		],
	},
	{
		icon: "VolunteerActivismRounded",
		name: "Donations",
		id: "donations",
	},
	{
		icon: "ArticleRounded",
		name: "Blog",
		id: "blogs",
	},
	{
		icon: "ContactMailRounded",
		name: "Contact",
		id: "contact",
	},
	{
		icon: "Diversity3Rounded",
		name: "About Us",
		id: "aboutUs",
	},
	// {
	// 	id: "admin",
	// 	icon: "AdminPanelSettingsOutlined",
	// 	name: "Administration",
	// },
];

export const protectedMenuItems: PathlessMenu[] = [
	{
		id: "admin",
		icon: "AdminPanelSettingsOutlined",
		name: "Administration",
		children: [
			{
				id: "admin-user",
				name: "User",
			},
			{
				id: "admin-announcements",
				name: "Announcements",
			},
			{
				id: "admin-articles",
				name: "Articles",
			},
			{
				id: "admin-contact-info",
				name: "Contact Info",
			},
			{
				id: "admin-donations",
				name: "Donations",
			},
			{
				id: "admin-legal-content",
				name: "Legal Content",
			},
			{
				id: "admin-ministries",
				name: "Ministries",
			},
			{
				id: "admin-notifications",
				name: "Notifications",
			},
			{
				id: "admin-services",
				name: "Services",
			},
		],
	},
	{
		id: "storybook",
		icon: "WidgetsRounded",
		name: "Library",
	},
];

export default pathlessMenuItems;
