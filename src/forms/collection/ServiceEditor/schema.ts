import * as Yup from "yup";
import { titleSchema } from "../commonSchemas";

export default Yup.object().shape({
	title: titleSchema,
	time: Yup.string()
		.required("Service time is required")
		.min(3, "Service time must be at least 3 characters")
		.max(255, "Service time must be 255 characters or less"),
});
