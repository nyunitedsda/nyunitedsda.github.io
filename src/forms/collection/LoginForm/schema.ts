import * as Yup from "yup";
import { nameSchema, passwordSchema } from "../commonSchemas";

export const loginSchema = Yup.object({
	username: nameSchema.concat(Yup.string().required("Username is required")),
	password: passwordSchema,
	rememberMe: Yup.boolean(),
});
