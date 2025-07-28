import type { UserType } from "../../api/request/types";

const initialValues: Partial<UserType> = {
	email: "",
	first_name: "",
	is_active: true,
	last_name: "",
	password: "",
	remember_me: false,
	role_id: 1,
	username: "",
};

const userData: UserType[] = [
	{
		id: 1,
		email: "admin@nyunitedsda.org",
		first_name: "John",
		last_name: "Doe",
		role_id: 3,
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
		username: "guestbob",
		remember_me: false,
		is_active: false,
	},
	{
		id: 4,
		email: "minimal@example.com",
		role_id: 1,
		username: "minimaluser",
		remember_me: false,
		is_active: true,
	},
];

export default userData;
export { initialValues };
