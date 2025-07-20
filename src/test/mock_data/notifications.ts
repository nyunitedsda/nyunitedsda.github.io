import type { NotificationType } from "../../api/request/types";

export const defaultNotification: Partial<NotificationType> = {
	message: "",
	title: "",
	severity: 1,
};

const notifications: NotificationType[] = [
	{
		id: 1,
		message: "Welcome to the platform!",
		title: "Greetings",
		severity: 1,
		expires_at: (Date.now() + 7 * 24 * 60 * 60 * 1000).toString(), // expires in 7 days
	},
	{
		id: 2,
		message: "Your password will expire soon.",
		title: "Password Expiry",
		severity: 2,
		expires_at: (Date.now() + 2 * 24 * 60 * 60 * 1000).toString(), // expires in 2 days
	},
	{
		id: 3,
		message: "Failed login attempt detected.",
		title: "Security Alert",
		severity: 3,
	},
	{
		id: 4,
		message: "Profile updated successfully.",
		title: "Update Success",
		severity: 4,
	},
];

export default notifications;
