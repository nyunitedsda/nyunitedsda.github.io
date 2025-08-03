import type { AxiosRequestConfig } from "axios";
import { createAuthConfig } from "../../utils/authUtils";
import axiosInstance from "../axiosInstance";
import { handleOperationError } from "./helpers";
import type { AuthTokenResponse, DatabaseEntity } from "./types";
import type { UserDT } from "./databaseTypes";

const AUTH_API_URL = import.meta.env.VITE_API_AUTH_URL || "/api/auth";

/**
 * Authentication API calls
 */

/**
 * Get list of data for a specific entity
 * * @template T - Type of the entity
 * @param entity
 * @param config
 * @returns Promise<AxiosResponse<T[], any>>
 */
const getDatabaseList = async <T extends { id: number }>(
	entity: DatabaseEntity,
	config?: AxiosRequestConfig,
): Promise<T[]> => {
	try {
		const response = await axiosInstance.get(`/api/${entity}`, config);
		return response?.data || response;
	} catch (error: unknown) {
		return handleOperationError("getList", entity, error);
	}
};

/**
 * Get a single item by ID from a specific entity
 * * @template T - Type of the entity
 * @param entity
 * @param id
 * @param config
 * @returns Promise<AxiosResponse<T, any>>
 */
const getDatabaseItem = async <T extends { id: number }>(
	entity: DatabaseEntity,
	id: number,
	config?: AxiosRequestConfig,
): Promise<T> => {
	try {
		const response = await axiosInstance.get(`/api/${entity}/${id}`, config);
		return response?.data;
	} catch (error: unknown) {
		return handleOperationError("getItem", entity, error);
	}
};

/**
 * Refresh authentication token
 * This is an Authenticated API call that requires a valid refresh token
 * @param refreshToken - Refresh token to use for getting new access token
 * @param config - Optional axios request config
 * @returns Promise<AuthTokenResponse>
 */
const refreshAuthToken = async (
	refreshToken: string,
	config?: AxiosRequestConfig,
): Promise<AuthTokenResponse> => {
	try {
		const response = await axiosInstance.post(
			`${AUTH_API_URL}refresh`,
			{ refreshToken },
			config,
		);
		return response?.data;
	} catch (error: unknown) {
		return handleOperationError("refresh", "users", error);
	}
};

/**
 * Logout user and invalidate tokens
 * This is an Authenticated API call that requires a valid token
 * @param config - Optional axios request config
 * @returns Promise<{ message: string }>
 */
const logoutUser = async (
	config?: AxiosRequestConfig,
): Promise<{ message: string }> => {
	try {
		const response = await axiosInstance.post(
			`${AUTH_API_URL}logout`,
			{},
			config,
		);
		return response?.data;
	} catch (error: unknown) {
		return handleOperationError("logout", "users", error);
	}
};

/**
 * Get current user profile
 * This is an Authenticated API call that requires a valid token
 * @param config - Optional axios request config
 * @returns Promise<UserDT>
 */
const getCurrentUser = async (config?: AxiosRequestConfig): Promise<UserDT> => {
	try {
		const response = await axiosInstance.get(`${AUTH_API_URL}profile`, config);
		return response?.data;
	} catch (error: unknown) {
		return handleOperationError("getCurrentUser", "users", error);
	}
};

const getUserStatus = async (
	token: string,
	config?: AxiosRequestConfig,
): Promise<{ message: string }> => {
	try {
		const response = await axiosInstance.get(
			`${AUTH_API_URL}authenticated`,
			createAuthConfig(token, config),
		);
		return response?.data || response;
	} catch (error: unknown) {
		return handleOperationError("getUserStatus", "users", error);
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
			`${AUTH_API_URL}forgot-password`,
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
			`${AUTH_API_URL}reset-password`,
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
			`${AUTH_API_URL}verify-email`,
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
	getUserStatus,
	// Authentication exports
	logoutUser,
	refreshAuthToken,
	requestPasswordReset,
	resetPassword,
	verifyEmail,
};
