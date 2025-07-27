import * as Yup from "yup";

export const passwordSchema = Yup.string()
	.min(8, "Password must be at least 8 characters")
	.max(50, "Password must be at most 50 characters")
	.required("Password is required");

export const nameSchema = Yup.string()
	.min(3, "Username must be at least 3 characters")
	.max(50, "Username must be at most 50 characters");

export const titleSchema = Yup.string()
	.min(3, "Title must be at least 3 characters")
	.max(100, "Title must be at most 100 characters")
	.required("Title is required");

export const descriptionSchema = Yup.string()
	.min(3, "Value must be at least 10 characters")
	.max(500, "Value must be at most 255 characters")
	.required("Value is required");
