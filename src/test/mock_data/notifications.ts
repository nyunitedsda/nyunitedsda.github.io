import type { NotificationDT } from "../../api/request/databaseTypes";


export const initialState: Partial<NotificationDT> = {
	message: "",
	title: "",
	severity_id: 1,
};

const notifications: NotificationDT[] = [
	{
		id: 1,
		message: "Welcome to the platform!",
		title: "Greetings",
		severity_id: 1,
		expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
	},
	{
		id: 2,
		message: "Your password will expire soon.",
		title: "Password Expiry",
		severity_id: 2,
		expires_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
	},
	{
		id: 3,
		message: "Failed login attempt detected.",
		title: "Security Alert",
		severity_id: 3,
	},
	{
		id: 4,
		message: "Profile updated successfully.",
		title: "Update Success",
		severity_id: 4,
	},
];

export default notifications;
