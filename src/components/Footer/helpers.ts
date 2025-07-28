import dayjs from "dayjs";
import { WEBSITE_TITLE } from "../../constants/footer";
import type { ContactInfoDT } from "../../api/request/databaseTypes";
import type { SxProps } from "@mui/material/styles";

export const getCopyright = () =>
	`${dayjs().year()} ${WEBSITE_TITLE}. All rights reserved`;

export const formatFooterContactData = (contact: ContactInfoDT) => [
	{ content: contact.street },
	{
		content: `${contact.city}, ${contact.zip_code}, ${contact.country}`,
	},
	{
		attributes: {
			color: "inherit",
			component: "a",
			href: `tel:${contact.phone}`,
			sx: { display: "flex", gap: 1, textDecoration: "none" },
		},
		content: contact.phone,
		icon: "Phone",
	},
	{
		attributes: {
			color: "inherit",
			component: "a",
			href: `mailto:${contact.email}`,
			sx: { display: "flex", gap: 1, textDecoration: "none" },
		},
		content: contact.email,
		icon: "Email",
	},
	{
		attributes: {
			component: "div",
			sx: {
				display: "flex",
				alignItems: "center",
				backgroundColor: "red",
				"& .MuiStack-root": {
					flexDirection: "column",
				},
			} as SxProps,
		},
		content: contact?.mail_address,
		icon: "Mail",
		title: contact?.mailing_recipient,
	},
];
