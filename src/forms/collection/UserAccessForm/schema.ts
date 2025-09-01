import { nameSchema, passwordSchema } from "@forms/collection";
import * as Yup from "yup";

export const registerSchema = Yup.object({
	username: nameSchema.concat(Yup.string().required("Username is required")),
	password: passwordSchema,
	confirmPassword: passwordSchema.concat(
		Yup.string()
			.oneOf([Yup.ref("password"), undefined], "Passwords must match")
			.required("Confirm Password is required"),
	),
	acceptTerms: Yup.boolean()
		.oneOf([true], "You must accept the terms and conditions")
		.required("You must accept the terms and conditions"),
});
