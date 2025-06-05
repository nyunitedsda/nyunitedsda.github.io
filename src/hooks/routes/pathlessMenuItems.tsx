// TODO: Review the menu names for streaming with Zinee

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
		name: "Watch Live",
		children: [
			{
				id: "liveStream",
				name: "Live Stream",
			},
			{
				id: "archiveStream",
				name: "Archive Stream",
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
