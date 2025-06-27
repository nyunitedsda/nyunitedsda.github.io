import * as Yup from "yup";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default Yup.object().shape({
	email: Yup.string()
		.required("Email is required")
		.max(100, "Email must be 100 characters or less")
		.test({
			name: "email-format",
			message: "Email must be in a valid format",
			test: (value) => {
				return !value || EMAIL_REGEX.test(value);
			},
		}),
	firstName: Yup.string()
		.nullable()
		.max(50, "First name must be 50 characters or less"),
	lastName: Yup.string()
		.nullable()
		.max(50, "Last name must be 50 characters or less"),
	role: Yup.string()
		.oneOf(["admin", "guest", "moderator"], "Invalid role")
		.required("Role is required"),
	emailVerified: Yup.boolean()
		.required("Email verification status is required")
		.default(false),
});
