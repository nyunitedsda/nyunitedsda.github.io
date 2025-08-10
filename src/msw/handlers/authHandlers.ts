import { HttpResponse, http } from "msw";
import type { UserDT } from "../../api/request";
import { mockLoginResponse, users as userData } from "../../test/mock_data";

const { VITE_API_URL, VITE_API_AUTH_URL } = (
	import.meta as unknown as ImportMeta
).env;
const USER_STORY_URL = `${VITE_API_URL || "http://localhost:3000"}${VITE_API_AUTH_URL || "/api/auth"}`;

const fetchUserById = (id: number) => {
	const user = userData.find((u) => u.id === id);
	console.info(`Fetching user by ID: ${id}`, user);
	if (!user) {
		return { error: "User not found" };
	}
	return { data: user };
};

const userHandlers = [
	// Get user by ID
	http.get(`${USER_STORY_URL}/users/:id`, async ({ params: { id } }) => {
		console.log(`Inside get user by ID handler for ID: ${id}`);

		const user = fetchUserById(parseInt(id as string));

		if (user.error) {
			return HttpResponse.json({ error: user.error }, { status: 404 });
		}
		return HttpResponse.json({ data: user.data }, { status: 200 });
	}),

	// Delete user by ID
	http.delete(`${USER_STORY_URL}/users/:id`, async ({ params: { id } }) => {
		console.log(`Inside delete user by ID handler for ID: ${id}`);
		const user = fetchUserById(parseInt(id as string));
		if (user.error) {
			return HttpResponse.json({ error: user.error }, { status: 404 });
		}

		// Simulate deletion
		return HttpResponse.json(
			{ message: "User deleted successfully" },
			{ status: 200 },
		);
	}),

	// Update user profile
	http.put(`${USER_STORY_URL}/users/:id`, async ({ params: { id } }) => {
		const user = fetchUserById(parseInt(id as string));
		if (user.error) {
			return HttpResponse.json({ error: user.error }, { status: 404 });
		}

		return HttpResponse.json({ ...user }, { status: 200 });
	}),

	// Register user
	http.post(`${USER_STORY_URL}/users/register`, async ({ request }) => {
		const reqBody = (await request.json()) as Pick<
			UserDT,
			"username" | "password"
		>;

		if (!reqBody?.username || !reqBody?.password) {
			return HttpResponse.json(
				{ error: "Username and password are required" },
				{ status: 400 },
			);
		}
		// Simulate registration
		return HttpResponse.json(
			{
				user: { ...userData[0], username: reqBody.username },
				message: "User registered",
			},
			{ status: 201 },
		);
	}),

	// Mock login handler
	http.post(`${USER_STORY_URL}/login`, async ({ request }) => {
		const reqBody = (await request.json()) as Pick<
			UserDT,
			"username" | "password"
		>;

		if (!reqBody?.username || !reqBody?.password) {
			return HttpResponse.json(
				{ error: "Username and password are required" },
				{ status: 400 },
			);
		}
		const user = userData.find((u) => u.username === reqBody.username);
		if (!user) {
			return HttpResponse.json(
				{ error: "Invalid username or password" },
				{ status: 401 },
			);
		}
		// You can add credential checks here if needed
		return HttpResponse.json({
			user: { ...mockLoginResponse, username: reqBody.username },
			status: 200,
		});
	}),

	// Logout user
	http.post(`${USER_STORY_URL}/logout`, async () => {
		// Simulate logout
		return HttpResponse.json({ message: "User logged out" }, { status: 200 });
	}),

	// Change user password
	http.put(
		`${USER_STORY_URL}/users/:id/change-password`,
		async ({ params, request }) => {
			const reqBody = (await request.json()) as Pick<UserDT, "password">;
			const { id } = params;
			const { password } = reqBody;

			if (!password || !id) {
				return HttpResponse.json(
					{ error: "Password and user ID are required" },
					{ status: 400 },
				);
			}

			const user = fetchUserById(parseInt(id as string));
			if (user.error) {
				return HttpResponse.json({ error: user.error }, { status: 404 });
			}
			// Simulate password change
			return HttpResponse.json(
				{ message: "Password changed" },
				{ status: 200 },
			);
		},
	),

	// Change my password
	http.put(`${USER_STORY_URL}/change-password`, async ({ request }) => {
		const reqBody = (await request.json()) as Pick<UserDT, "password" | "id">;
		const { password, id } = reqBody;

		if (!password || !id) {
			return HttpResponse.json(
				{ error: "Password and user ID are required" },
				{ status: 400 },
			);
		}

		const user = fetchUserById(id);
		if (user.error) {
			return HttpResponse.json({ error: user.error }, { status: 401 });
		}
		// Simulate password change
		return HttpResponse.json(
			{ message: "Password changed successfully" },
			{ status: 200 },
		);
	}),

	// Get current user
	http.get(`${USER_STORY_URL}/profile`, async () => {
		// Simulate current user info (using first user as example)
		return HttpResponse.json({ data: userData[0] }, { status: 200 });
	}),

	// Get user status
	http.get(`${USER_STORY_URL}/authenticated`, async () => {
		// Simulate user status
		return HttpResponse.json(
			{ message: "User is authenticated" },
			{ status: 200 },
		);
	}),

	// Refresh auth token
	http.post(`${USER_STORY_URL}/refresh`, async () => {
		// TODO: verify refreshToken from cookies
		// Simulate token refresh
		return HttpResponse.json(
			{ message: "Token refreshed successfully" },
			{ status: 200 },
		);
	}),

	// Get all users
	http.get(`${USER_STORY_URL}/users`, async () => {
		return HttpResponse.json({ data: userData }, { status: 200 });
	}),
];

export default userHandlers;
