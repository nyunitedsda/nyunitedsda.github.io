import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";
import YouTube from "@mui/icons-material/YouTube";
import contactInfo from "../../constants/contactInfo";
import Phone from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";
import dayjs from "dayjs";

const socialMediaInfo = [
	{
		label: "Facebook",
		href: "https://facebook.com",
		icon: <Facebook />,
	},
	{
		label: "Instagram",
		href: "https://instagram.com",
		icon: <Instagram />,
	},
	{
		label: "Twitter",
		href: "https://twitter.com",
		icon: <Twitter />,
	},
	{
		label: "YouTube",
		href: "https://www.youtube.com/@newyorkunitedchurch3756",
		icon: <YouTube />,
	},
];

const WEBSITE_TITLE =
	import.meta.env.VITE_WEBSITE_TITLE || "NY United SDA Church";

const MOTTO = "A place of worship, community, and spiritual growth.";
const QUICK_LINKS = "Quick Links";
const SERVICE_TIMES = "Service Times";
const CONTACT_US = "Contact Us";
const COPYRIGHT = `${dayjs().year()} ${WEBSITE_TITLE}. All rights reserved`

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
			sx: { display: "flex", gap: 1, textDecoration: "none" }
		},
		content: contactInfo.phone,
		icon: <Phone fontSize="small" />,
	},
	{
		attributes: {
			color: "inherit",
			component: "a",
			href: `mailto:${contactInfo.email}`,
			sx: { display: "flex", gap: 1, textDecoration: "none" }
		},
		content: contactInfo.email,
		icon: <Email fontSize="small" />,
	},

]

const TERMS_AND_POLICIES = [
	{
		content: 'Terms Of Use',
		href: '',
	},
	{
		content: 'Privacy Statement',
		href: '',
	}
]

export {
	CONTACT_DATA,
	CONTACT_US,
	COPYRIGHT,
	MOTTO,
	QUICK_LINKS,
	SERVICE_TIMES,
	socialMediaInfo,
	TERMS_AND_POLICIES,
	WEBSITE_TITLE,
};