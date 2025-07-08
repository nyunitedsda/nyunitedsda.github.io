import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type {
	AuthTokenResponse,
	LoginCredentials,
	LoginResponse,
	RegisterData,
} from "../../contexts/AuthenticationContext/types";
import axiosInstance from "../axiosInstance";
import { handleOperationError } from "./helpers";
import type { DatabaseEntity, UserType } from "./types";

const getDatabaseList = async <T extends { id: number }>(
	entity: DatabaseEntity,
	config?: AxiosRequestConfig,
): Promise<AxiosResponse<T[], any>> => {
	try {
		const response = await axiosInstance.get(`/api/${entity}`, config);
		return response?.data || response;
	} catch (error: unknown) {
		return handleOperationError("getList", entity, error);
	}
};

const getDatabaseItem = async <T extends { id: number }>(
	entity: DatabaseEntity,
	id: number,
	config?: AxiosRequestConfig,
): Promise<AxiosResponse<T[], any>> => {
	try {
		const response = await axiosInstance.get(`/${entity}/${id}`, config);
		return response?.data.data || response?.data;
	} catch (error: unknown) {
		return handleOperationError("getItem", entity, error);
	}
};

/**
 * Authentication API calls
 */

/**
 * Authenticate user with username and password
 */
const loginUser = async (
	credentials: LoginCredentials,
	config?: AxiosRequestConfig,
): Promise<LoginResponse> => {
	try {
		const response = await axiosInstance.post(
			"/api/auth/login",
			credentials,
			config,
		);
		return response?.data.data || response?.data;
	} catch (error: unknown) {
		return handleOperationError("login", "users", error);
	}
};

/**
 * Register a new user
 */
const registerUser = async (
	userData: RegisterData,
	config?: AxiosRequestConfig,
): Promise<{ user: UserType; tokens: AuthTokenResponse }> => {
	try {
		const response = await axiosInstance.post(
			"/api/auth/register",
			userData,
			config,
		);
		return response?.data.data || response?.data;
	} catch (error: unknown) {
		return handleOperationError("register", "users", error);
	}
};

/**
 * Refresh authentication token
 */
const refreshAuthToken = async (
	refreshToken: string,
	config?: AxiosRequestConfig,
): Promise<AuthTokenResponse> => {
	try {
		const response = await axiosInstance.post(
			"/api/auth/refresh",
			{ refreshToken },
			config,
		);
		return response?.data.data || response?.data;
	} catch (error: unknown) {
		return handleOperationError("refresh", "users", error);
	}
};

/**
 * Logout user and invalidate tokens
 */
const logoutUser = async (
	config?: AxiosRequestConfig,
): Promise<{ message: string }> => {
	try {
		const response = await axiosInstance.post("/api/auth/logout", {}, config);
		return response?.data.data || response?.data;
	} catch (error: unknown) {
		return handleOperationError("logout", "users", error);
	}
};

/**
 * Get current user profile
 */
const getCurrentUser = async (
	config?: AxiosRequestConfig,
): Promise<UserType> => {
	try {
		const response = await axiosInstance.get("/api/auth/me", config);
		return response?.data.data || response?.data;
	} catch (error: unknown) {
		return handleOperationError("getCurrentUser", "users", error);
	}
};

/**
 * Request password reset
 */
const requestPasswordReset = async (
	email: string,
	config?: AxiosRequestConfig,
): Promise<{ message: string }> => {
	try {
		const response = await axiosInstance.post(
			"/api/auth/forgot-password",
			{ email },
			config,
		);
		return response?.data.data || response?.data;
	} catch (error: unknown) {
		return handleOperationError("requestPasswordReset", "users", error);
	}
};

/**
 * Reset password with token
 */
const resetPassword = async (
	token: string,
	newPassword: string,
	config?: AxiosRequestConfig,
): Promise<{ message: string }> => {
	try {
		const response = await axiosInstance.post(
			"/api/auth/reset-password",
			{ token, password: newPassword },
			config,
		);
		return response?.data.data || response?.data;
	} catch (error: unknown) {
		return handleOperationError("resetPassword", "users", error);
	}
};

/**
 * Verify email address
 */
const verifyEmail = async (
	token: string,
	config?: AxiosRequestConfig,
): Promise<{ message: string }> => {
	try {
		const response = await axiosInstance.post(
			"/api/auth/verify-email",
			{ token },
			config,
		);
		return response?.data.data || response?.data;
	} catch (error: unknown) {
		return handleOperationError("verifyEmail", "users", error);
	}
};

export {
	getCurrentUser,
	getDatabaseItem,
	getDatabaseList,
	// Authentication exports
	loginUser,
	logoutUser,
	refreshAuthToken,
	registerUser,
	requestPasswordReset,
	resetPassword,
	verifyEmail,
};
