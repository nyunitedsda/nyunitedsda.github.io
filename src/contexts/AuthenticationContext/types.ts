import type { PropsWithChildren } from "react";

/**
 * Represents the role of a user in the system
 */
export type UserRole = "admin" | "guest" | "moderator";

/**
 * Represents a user in the system
 */
export interface UserType {
	/** Unique identifier for the user */
	id: number;
	/** User's email address */
	email: string;
	/** User's first name */
	firstName?: string;
	/** User's last name */
	lastName?: string;
	/** User's role in the system */
	role: UserRole;
	/** Whether the user's email is verified */
	emailVerified?: boolean;
	/** Timestamp when the user was created */
	createdAt?: Date;
	/** Timestamp when the user was last updated */
	updatedAt?: Date;
}

/**
 * Authentication credentials for login
 */
export interface LoginCredentials {
	email: string;
	password: string;
}

/**
 * Registration data for new users
 */
export interface RegisterData {
	email: string;
	password: string;
	firstName?: string;
	lastName?: string;
}

/**
 * Authentication token response
 */
export interface AuthTokenResponse {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

/**
 * Authentication context properties
 */
export type AuthenticationContextProps = PropsWithChildren<{
	/** Current authenticated user */
	user: UserType | null;
	/** Whether authentication is currently loading */
	isLoading: boolean;
	/** Whether user is authenticated */
	isAuthenticated: boolean;
	/** Login function */
	login: (credentials: LoginCredentials) => Promise<void>;
	/** Register function */
	register: (data: RegisterData) => Promise<void>;
	/** Logout function */
	logout: () => void;
	/** Refresh authentication token */
	refreshAuth: () => Promise<void>;
}>;
