import type { ContactInfoDT } from "../../api/request/databaseTypes";
import type { ContactInfoType } from "../../api/request/types";

export const initialContactInfo: Partial<ContactInfoType> = {
	email: "",
	phone: "",
	street: "",
	city: "",
	zip_code: "",
	country: "",
	mail_address: "",
	mailing_recipient: "",
	created_at: "",
	modified_at: "",
};

const contactInfos: ContactInfoDT[] = [
	{
		id: 1,
		contact_name: "New York United Sabbath Day Adventist Church, Inc.",
		email: "nyusda@aol.com",
		phone: "212-864-5040",
		street: "161 West 131st Street",
		city: "New York",
		zip_code: "NY 10027",
		country: "United States",
		mail_address: "PO Box 1715 New York, NY 10026",
		mailing_recipient: "NYUSDA Church, Inc.",
		is_default: true,
	},
];

export default contactInfos;
