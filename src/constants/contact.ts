import type { SxProps } from "@mui/material/styles";

export const CONTACT_US = "Contact Us";
export const CONTACT_PAGE_TITLE = "Contact Us";
export const CONTACT_PAGE_SUBTITLE =
	"How to get in touch with New York United church";
export const TRIP_PLANNER = "MTA Trip Planner";
export const CHURCH_NAME = "New York United Sabbath Day Adventist Church, Inc.";

export const MAILING_ADDRESS_TITLE = "Mailing Address";

export const contactInfo = {
	email: "nyusda@aol.com",
	phone: "212-864-5040",
	street: "161 West 131st Street",
	city: "New York",
	zipCode: "NY 10027",
	country: "United States",
	mail_recipient: "NYUSDA Church, Inc.",
	mail_address: `PO Box 1715 New York, NY 10026`,
};

export const CONTACT_DATA = [
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
				// flexDirection: "row",
				alignItems: "center",
				backgroundColor: "red",
				// gap: 1,
				"& .MuiStack-root": {
					flexDirection: "column",
				},
			} as SxProps,
		},
		content: contactInfo?.mail_address,
		icon: "Mail",
		title: contactInfo?.mail_recipient,
	},
];
