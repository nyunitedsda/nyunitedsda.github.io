import * as Yup from "yup";
import { nameSchema } from "../commonSchemas";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default Yup.object().shape({
	username: nameSchema,
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
	first_name: Yup.string()
		.nullable()
		.max(50, "First name must be 50 characters or less"),
	last_name: Yup.string()
		.nullable()
		.max(50, "Last name must be 50 characters or less"),
	role: Yup.string()
		.oneOf(["admin", "guest", "moderator"], "Invalid role")
		.required("Role is required"),
	role_id: Yup.number()
		.required("Role ID is required")
		.oneOf([1, 2, 3], "Invalid Role ID")
		.min(1, "Role ID must be positive"),
	is_active: Yup.boolean().required("Active status is required").default(true),
	emailVerified: Yup.boolean()
		.required("Email verification status is required")
		.default(false),
	remember_me: Yup.boolean()
		.required("Remember Me status is required")
		.default(false),
});
