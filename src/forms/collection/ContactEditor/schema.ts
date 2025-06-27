import * as Yup from "yup";

const PHONE_REGEX =
	/^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Regex for USA ZIP codes: 12345 or 12345-6789
const USA_ZIP_REGEX = /^\d{5}(-\d{4})?$/;
// Regex for Canada postal codes: A1A 1A1 or A1A1A1
const CANADA_POSTAL_REGEX = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

export default Yup.object().shape({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required")
		.max(100, "Email must be 100 characters or less")
		.test({
			name: "email-format",
			message: "Email must be in a valid format",
			test: (value) => {
				return !value || EMAIL_REGEX.test(value);
			},
		}),
	phone: Yup.string()
		.required("Phone number is required")
		.max(20, "Phone number must be 20 characters or less")
		.test({
			name: "phone-format",
			message: "Phone number must be in a valid format",
			test: (value) => {
				return !value || PHONE_REGEX.test(value);
			},
		}),
	street: Yup.string()
		.required("Street address is required")
		.max(255, "Street address must be 255 characters or less"),
	city: Yup.string()
		.required("City is required")
		.max(100, "City must be 100 characters or less"),
	zip_code: Yup.string()
		.required("ZIP code is required")
		.max(20, "ZIP code must be 20 characters or less")
		.test({
			name: "zip-code-format",
			message:
				"ZIP code must be in a valid USA (12345 or 12345-6789) or Canada (A1A 1A1) format",
			test: (value) => {
				return (
					!value || USA_ZIP_REGEX.test(value) || CANADA_POSTAL_REGEX.test(value)
				);
			},
		}),
	country: Yup.string()
		.required("Country is required")
		.max(100, "Country must be 100 characters or less"),
	mail_address: Yup.string()
		.nullable()
		.max(255, "Mail address must be 255 characters or less"),
	mailing_recipient: Yup.string()
		.nullable()
		.max(50, "Mailing recipient must be 50 characters or less"),
	is_default: Yup.boolean()
		.required("Default contact status is required")
		.default(false),
});
