import { HttpResponse, http } from "msw";
import type { UserDT } from "../../api/request/databaseTypes";
import { mockLoginResponse, users as userData } from "../../test/mock_data";

const { VITE_API_URL, VITE_API_AUTH_URL } = (
	import.meta as unknown as ImportMeta
).env;
const USER_STORY_URL = `${VITE_API_URL || "http://localhost:3000"}${VITE_API_AUTH_URL || "/api/auth"}`;

const verifyAuthToken = (request: Request) => {
	const [bearer, token] =
		request.headers.get("Authorization")?.split(" ") || [];
	if (!token || bearer !== "Bearer") {
		return HttpResponse.json(
			{ error: "Authorization token is required" },
			{ status: 401 },
		);
	}
	return null;
};

const fetchUserById = (id: number) => {
	const user = userData.find((u) => u.id === id);
	if (!user) {
		return { error: "User not found" };
	}
	return { data: user };
};

const userHandlers = [
	// Get all users
	http.get(`${USER_STORY_URL}/users`, async ({ request }) => {
		const authError = verifyAuthToken(request);
		if (authError) return authError;
		return HttpResponse.json({ data: userData }, { status: 200 });
	}),

	// Get user by ID
	http.get(
		new RegExp(`${USER_STORY_URL}/users/\\d+$`),
		async ({ params: { id }, request }) => {
			const authError = verifyAuthToken(request);
			if (authError) return authError;

			const user = fetchUserById(parseInt(id as string));
			if (user.error) {
				return HttpResponse.json({ error: user.error }, { status: 404 });
			}
			return HttpResponse.json({ data: user.data }, { status: 200 });
		},
	),

	// Delete user by ID
	http.delete(
		new RegExp(`${USER_STORY_URL}/users/\\d+$`),
		async ({ params: { id }, request }) => {
			const authError = verifyAuthToken(request);
			if (authError) return authError;

			const user = fetchUserById(parseInt(id as string));
			if (user.error) {
				return HttpResponse.json({ error: user.error }, { status: 404 });
			}

			// Simulate deletion
			return HttpResponse.json(
				{ message: "User deleted successfully" },
				{ status: 200 },
			);
		},
	),

	// Update user profile
	http.put(
		new RegExp(`${VITE_API_AUTH_URL || "/api/auth"}/users/\\d+$`),
		async ({ params: { id }, request }) => {
			const authError = verifyAuthToken(request);
			if (authError) return authError;

			const user = fetchUserById(parseInt(id as string));
			if (user.error) {
				return HttpResponse.json({ error: user.error }, { status: 404 });
			}

			return HttpResponse.json({ ...user }, { status: 200 });
		},
	),

	// Register user
	http.post(`${USER_STORY_URL}/users/register`, async ({ request }) => {
		const authError = verifyAuthToken(request);
		if (authError) return authError;

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
	http.post(`${USER_STORY_URL}/logout`, async ({ request }) => {
		const authError = verifyAuthToken(request);
		if (authError) return authError;
		// Simulate logout
		return HttpResponse.json({ message: "User logged out" }, { status: 200 });
	}),

	// Change user password
	http.put(
		new RegExp(`${USER_STORY_URL}/users/d+/change-password$`),
		async ({ params, request }) => {
			const authError = verifyAuthToken(request);
			if (authError) return authError;

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
		const authError = verifyAuthToken(request);
		if (authError) return authError;

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
	http.get(`${USER_STORY_URL}/profile`, async ({ request }) => {
		const authError = verifyAuthToken(request);
		if (authError) return authError;

		// Simulate current user info (using first user as example)
		return HttpResponse.json({ data: userData[0] }, { status: 200 });
	}),

	// Get user status
	http.get(`${USER_STORY_URL}/authenticated`, async ({ request }) => {
		const authError = verifyAuthToken(request);
		if (authError) return authError;
		// Simulate user status
		return HttpResponse.json(
			{ message: "User is authenticated" },
			{ status: 200 },
		);
	}),

	// Refresh auth token
	http.post(`${USER_STORY_URL}/refresh`, async ({ request }) => {
		const authError = verifyAuthToken(request);
		if (authError) return authError;

		const reqBody = (await request.json()) as { refreshToken?: string };

		if (!reqBody?.refreshToken) {
			return HttpResponse.json(
				{ error: "Refresh token is required" },
				{ status: 400 },
			);
		}

		// Simulate token refresh
		return HttpResponse.json(
			{ refreshToken: "new-refresh-token", expiresIn: "1h" },
			{ status: 200 },
		);
	}),
];

export default userHandlers;
