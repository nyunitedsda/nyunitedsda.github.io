import type { UserDT } from "../../api/request/databaseTypes";

const initialState: Partial<UserDT> = {
	email: "",
	first_name: "",
	is_active: true,
	last_name: "",
	password: "",
	remember_me: false,
	role_id: 1,
	username: "",
	is_system: false,
	last_login: undefined,
	id: undefined,
};

const adminTokenResponse = {
	accessToken:
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGVfaWQiOjMsImlhdCI6MTc1NDE2NjcxMSwiZXhwIjoxNzU0MTcwMzExLCJhdWQiOiJueXVuaXRlZHNkYS1hcHAiLCJpc3MiOiJueXVuaXRlZHNkYS1hcGkifQ.CctMZHQpnXgRXTKltECTiT0pRj_uTlPkvjNF1E2srjY",
	refreshToken:
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NTQxNjY3MTEsImV4cCI6MTc1NDI1MzExMX0.4LJpIlq88KarZf8hXQel5fm4VGQS1IPu-sLAx17GLds",
	expiresIn: "1h",
};
const adminPermissions = [
	"announcements-manage",
	"articles-manage",
	"contact_info-manage",
	"donations-manage",
	"legal_content-manage",
	"ministries-manage",
	"notifications-manage",
	"permissions-manage",
	"roles-manage",
	"services-manage",
	"severity-manage",
	"users-manage",
];

const userData: Partial<UserDT>[] = [
	{
		id: 1,
		email: "admin@nyunitedsda.org",
		first_name: "John",
		last_name: "Doe",
		role_id: 3,
		username: "adminjohn",
		remember_me: false,
		is_active: true,
		is_system: true,
		last_login: new Date("2023-10-01T12:00:00"),
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

// Mock login response using similar values from userData
const mockLoginResponse = {
	message: "Login successful",
	user: {
		...userData[0],
		permissions: adminPermissions,
	},
	...adminTokenResponse,
};

export default userData;
export { initialState, mockLoginResponse };
