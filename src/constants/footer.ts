const WEBSITE_TITLE =
	import.meta.env.VITE_WEBSITE_TITLE || "NY United SDA Church";

const socialMediaInfo = [
	{
		label: "Facebook",
		href: "https://facebook.com",
		icon: "Facebook",
		disabled: true,
	},
	{
		label: "Instagram",
		href: "https://instagram.com",
		icon: "Instagram",
		disabled: true,
	},
	{
		label: "Twitter",
		href: "https://twitter.com",
		icon: "Twitter",
		disabled: true,
	},
	{
		label: "YouTube",
		href: "https://www.youtube.com/@newyorkunitedchurch3756",
		icon: "YouTube",
	},
];

const MOTTO = {
	verse: `Behold the fowls of the air... are you not much better than they? Matthew 6:26`,
	text: "Remember, No One Is Beyond God's Reach",
};
const QUICK_LINKS = "Quick Links";

export { MOTTO, QUICK_LINKS, socialMediaInfo, WEBSITE_TITLE };
