import type { NotificationType } from "../../api/request/types";

export const initialValues: Partial<NotificationType> = {
	message: "",
	title: "",
	severity: "information",
};

const notifications: NotificationType[] = [
	{
		id: 1,
		message: "Welcome to the platform!",
		title: "Greetings",
		severity: "information",
		expires_at: (Date.now() + 7 * 24 * 60 * 60 * 1000).toString(), // expires in 7 days
	},
	{
		id: 2,
		message: "Your password will expire soon.",
		title: "Password Expiry",
		severity: "caution",
		expires_at: (Date.now() + 2 * 24 * 60 * 60 * 1000).toString(), // expires in 2 days
	},
	{
		id: 3,
		message: "Failed login attempt detected.",
		title: "Security Alert",
		severity: "error",
	},
	{
		id: 4,
		message: "Profile updated successfully.",
		title: "Update Success",
		severity: "success",
	},
];

export default notifications;
