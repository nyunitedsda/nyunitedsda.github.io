import type { PropsWithChildren } from "react";
import type { UserType } from "../../api/request/types";

/**
 * Authentication token response
 * @description This interface defines the structure of the response returned by the authentication API.
 * It includes the access token, refresh token, and expiration time.
 * @property {string} accessToken - The access token for the authenticated user.
 * @property {string} refreshToken - The refresh token for the authenticated user.
 * @property {number} expiresIn - The expiration time of the access token in seconds.
 */
export interface AuthTokenResponse {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

/**
 * Login credentials for user authentication
 * @description This type defines the structure of user login credentials.
 * It includes the username, password, remember_me flag, and an optional user ID.
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 */
export type LoginCredentials = Pick<
	UserType,
	"username" | "password" | "remember_me"
>;

/**
 * Login API response
 * @description This interface defines the structure of the response returned by the login API.
 * It includes the access token, refresh token, expiration time, and user details.
 * @property {string} accessToken - The access token for the authenticated user.
 *
 */
export interface LoginResponse extends AuthTokenResponse {
	message: string;
	user: UserType;
}

/**
 * Registration data for new users
 * @description This type defines the structure of user registration data.
 * It includes the user's email, username, password, first name, and last name.
 * @property {string} username - The username of the user required.
 * @property {string} password - The password of the user required.
 */
export type RegisterData = Pick<
	UserType,
	"email" | "username" | "password" | "first_name" | "last_name"
>;

/**
 * Authentication context properties
 * @description This interface defines the properties provided by the AuthenticationContext.
 * It includes the current user, loading state, authentication status, and methods for login, register, logout, and refreshing authentication.
 * @property {UserType | null} user - The currently authenticated user, or null if not authenticated.
 * @property {boolean} isLoading - Whether the authentication context is currently loading.
 * @property {boolean} isAuthenticated - Whether the user is authenticated.
 * @property {(credentials: LoginCredentials) => Promise<void>} login - Function to log in the user with provided credentials.
 * @property {(data: RegisterData) => Promise<void>} register - Function to register a new user with provided data.
 * @property {() => void} logout - Function to log out the current user.
 * @property {() => Promise<void>} refreshAuth - Function to refresh the authentication status.
 * @example
 * const { user, isLoading, isAuthenticated, login, register, logout, refreshAuth } = useContext(AuthenticationContext);
 */
export type AuthenticationContextProps = PropsWithChildren<{
	user: UserType | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (credentials: LoginCredentials) => Promise<void>;
	register: (data: RegisterData) => Promise<void>;
	logout: () => void;
	refreshAuth: () => Promise<void>;
}>;
