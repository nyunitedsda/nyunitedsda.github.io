import * as Yup from "yup";
import { nameSchema, passwordSchema } from "../commonSchemas";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const commonSchema = Yup.object().shape({
	username: nameSchema,
	email: Yup.string()
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
	role_id: Yup.number()
		.required("Role ID is required")
		.oneOf([1, 2, 3], "Invalid Role ID")
		.min(1, "Role ID must be positive"),
	is_active: Yup.boolean().required("Active status is required").default(true),
	remember_me: Yup.boolean()
		.required("Remember Me status is required")
		.default(false),
});

const createUserSchema = commonSchema.concat(
	Yup.object().shape({
		password: passwordSchema,
	}),
);

const updateUserSchema = commonSchema.concat(
	Yup.object().shape({
		id: Yup.number()
			.required("User ID is required")
			.min(1, "User ID must be positive"),
	}),
);

export { createUserSchema, updateUserSchema };
