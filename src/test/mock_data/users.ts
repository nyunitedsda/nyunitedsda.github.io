import type { UserType } from "../../api/request/types";

const initialValues: UserType = {
	id: 0,
	email: "",
	firstName: "",
	lastName: "",
	role: "guest",
	permissions: [],
	emailVerified: false,
	username: "",
	remember_me: false,
};

const userData: UserType[] = [
	{
		id: 1,
		email: "admin@nyunitedsda.org",
		firstName: "John",
		lastName: "Doe",
		role: "admin",
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
		firstName: "Jane",
		lastName: "Smith",
		role: "moderator",
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
		firstName: "Bob",
		lastName: "Johnson",
		role: "guest",
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
		role: "guest",
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
