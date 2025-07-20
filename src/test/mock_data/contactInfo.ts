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

const contactInfos: ContactInfoType[] = [
	{
		id: 1,
		email: "info@nyunitedsda.org",
		phone: "+1-555-123-4567",
		street: "123 Main St",
		city: "New York",
		zip_code: "10001",
		country: "USA",
		mail_address: "PO Box 123, New York, NY 10001",
		mailing_recipient: "NY United SDA Church",
		created_at: "2025-07-01T09:00:00Z",
		modified_at: "2025-07-01T09:00:00Z",
	},
];

export default contactInfos;
