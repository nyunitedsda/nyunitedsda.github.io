import type { ColumnDefinition } from "@components/DataTable";
import type { ContactInfoDT } from "@/api";

/**
 * Defines the columns for the Contact Information DataTable.
 * Each column is defined with an id, field, and title.
 * The field corresponds to the property in the ContactInfoDT interface.
 */
const contactInfoColumns: ColumnDefinition<Partial<ContactInfoDT>>[] = [
	{ id: "email", field: "email", title: "Email" },
	{ id: "phone", field: "phone", title: "Phone" },
	{ id: "street", field: "street", title: "Street" },
	{ id: "city", field: "city", title: "City" },
	{ id: "zip_code", field: "zip_code", title: "ZIP Code" },
	{ id: "country", field: "country", title: "Country" },
	{ id: "mail_address", field: "mail_address", title: "Mail Address" },
	{
		id: "mailing_recipient",
		field: "mailing_recipient",
		title: "Mailing Recipient",
	},
];

export default contactInfoColumns;
