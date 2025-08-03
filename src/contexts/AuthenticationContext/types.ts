import type { PropsWithChildren } from "react";
import type { UserDT } from "../../api/request/databaseTypes";
import type { LoginCredentials, UserDT } from "../../api/request/types";

/**
 * Registration data for new users
 * @description This type defines the structure of user registration data.
 * It includes the user's email, username, password, first name, and last name.
 * @property {string} username - The username of the user required.
 * @property {string} password - The password of the user required.
 */
export type RegisterData = Omit<UserDT, "id" | "is_system" | "last_login">;

/**
 * Authentication context properties
 * @description This interface defines the properties provided by the AuthenticationContext.
 * It includes the current user, loading state, authentication status, and methods for login, register, logout, and refreshing authentication.
 * @property {UserDT | null} user - The currently authenticated user, or null if not authenticated.
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
	user: UserDT | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (credentials: LoginCredentials) => Promise<void>;
	logout: () => void;
	refreshAuth: () => Promise<void>;
}>;
