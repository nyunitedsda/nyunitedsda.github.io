import type { UserRoleOption } from "../../api/request/types";

export const roles: UserRoleOption[] = [
	{
		id: 1,
		name: "guest",
		description: "Limited read-only access",
		permissions: [],
		is_active: true,
	},
	{
		id: 2,
		name: "moderator",
		description: "Content management and user moderation",
		permissions: ["manage_content", "moderate_users"],
		is_active: true,
	},
	{
		id: 3,
		name: "admin",
		description: "Full system access and management capabilities",
		permissions: ["manage_all"],
		is_active: true,
	},
];

export default roles;
