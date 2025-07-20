import type { UserType } from "../../api/request/types";

const initialValues: Partial<UserType> = {
	email: "",
	first_name: "",
	last_name: "",
	role_id: 1,
	is_active: true,
	permissions: [],
	emailVerified: false,
	username: "",
	remember_me: false,
};

const userData: UserType[] = [
	{
		id: 1,
		email: "admin@nyunitedsda.org",
		first_name: "John",
		last_name: "Doe",
		role_id: 3,
		permissions: ["manage_users", "view_reports", "edit_content"],
		emailVerified: true,
		createdAt: "2025-01-01T00:00:00",
		updatedAt: "2025-01-15T00:00:00",
		username: "adminjohn",
		remember_me: false,
		is_active: true,
	},

	{
		id: 2,
		email: "moderator@nyunitedsda.org",
		first_name: "Jane",
		last_name: "Smith",
		role_id: 2,
		emailVerified: true,
		createdAt: "2025-01-05T00:00:00",
		updatedAt: "2025-01-20T00:00:00",
		username: "modjane",
		remember_me: false,
		is_active: false,
	},
	{
		id: 3,
		email: "guest@example.com",
		first_name: "Bob",
		last_name: "Johnson",
		role_id: 1,
		emailVerified: false,
		createdAt: "2025-01-10T00:00:00",
		updatedAt: "2025-01-25T00:00:00",
		username: "guestbob",
		remember_me: false,
		is_active: false,
	},
	{
		id: 4,
		email: "minimal@example.com",
		role_id: 1,
		emailVerified: false,
		createdAt: "2025-01-15T00:00:00",
		updatedAt: "2025-01-25T00:00:00",
		username: "minimaluser",
		remember_me: false,
		is_active: true,
	},
];

export default userData;
export { initialValues };
