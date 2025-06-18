import type { SxProps } from "@mui/material";
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
	{
		attributes: {
			component: "div",
			sx: {
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				gap: 1,
			} as SxProps,
		},
		content: contactInfo?.mailingAddress,
		icon: "Mail",
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
	socialMediaInfo,
	WEBSITE_TITLE,
};
