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
];

export default pathlessMenuItems;
