import { nameSchema, passwordSchema } from "@forms/collection";
import * as Yup from "yup";

export const loginSchema = Yup.object({
	username: nameSchema.concat(Yup.string().required("Username is required")),
	password: passwordSchema,
	rememberMe: Yup.boolean(),
});
