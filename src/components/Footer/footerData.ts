import dayjs from "dayjs";
import contactInfo from "../../constants/contactInfo";

// const {MODE} = import.meta.env

const WEBSITE_TITLE =
	import.meta.env.VITE_WEBSITE_TITLE || "NY United SDA Church";

const socialMediaInfo = [
	{
		label: "Facebook",
		href: "https://facebook.com",
		icon: "Facebook",
	},
	{
		label: "Instagram",
		href: "https://instagram.com",
		icon: "Instagram",
	},
	{
		label: "Twitter",
		href: "https://twitter.com",
		icon: "Twitter",
	},
	{
		label: "YouTube",
		href: "https://www.youtube.com/@newyorkunitedchurch3756",
		icon: "YouTube",
	},
];

const MOTTO = "A place of worship, community, and spiritual growth.";
const QUICK_LINKS = "Quick Links";
const SERVICE_TIMES = "Service Times";
const CONTACT_US = "Contact Us";

const CONTACT_DATA = [
	{ content: contactInfo.street },
	{
		content: `${contactInfo.city}, ${contactInfo.zipCode}, ${contactInfo.country}`,
	},
	{
		attributes: {
			color: "inherit",
			component: "a",
			href: `tel:${contactInfo.phone}`,
			sx: { display: "flex", gap: 1, textDecoration: "none" },
		},
		content: contactInfo.phone,
		icon: "Phone",
	},
	{
		attributes: {
			color: "inherit",
			component: "a",
			href: `mailto:${contactInfo.email}`,
			sx: { display: "flex", gap: 1, textDecoration: "none" },
		},
		content: contactInfo.email,
		icon: "Email",
	},
];

const getCopyright = () =>
	`${dayjs().year()} ${WEBSITE_TITLE}. All rights reserved`;

export {
	CONTACT_DATA,
	CONTACT_US,
	getCopyright,
	MOTTO,
	QUICK_LINKS,
	SERVICE_TIMES,
	socialMediaInfo,
	WEBSITE_TITLE,
};
