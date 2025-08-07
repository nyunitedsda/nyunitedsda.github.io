import type { AxiosRequestConfig } from "axios";
import type { RegisterData } from "../../contexts/AuthenticationContext/types";
import axiosInstance from "../axiosInstance";
import type { UserDT } from "./databaseTypes";
import { handleOperationError } from "./helpers";
import type {
	ChangeMyPassword,
	LoginCredentials,
	LoginResponse,
} from "./types";

const AUTH_API_URL = import.meta.env.VITE_API_AUTH_URL || "/api/auth/";

/**
 * Get a list of all system users
 * This a Authenticated API call
 * @param config - Optional axios request config
 * @returns Promise<UserDT[]>
 * @throws Error if the operation fails
 */
const getAllUsers = async (config?: AxiosRequestConfig): Promise<UserDT[]> => {
	try {
		console.log("All users config: ", config);

		const response = await axiosInstance.get(`${AUTH_API_URL}users`, config);
		return response?.data.data || response.data;
	} catch (error: unknown) {
		return handleOperationError("getAllUsers", "users", error);
	}
};

/**
 * Get a list of all system users
 * This a Authenticated API call
 * @param config - Optional axios request config
 * @returns Promise<UserDT[]>
 * @throws Error if the operation fails
 */
const getUserById = async (
	id: number,
	config?: AxiosRequestConfig,
): Promise<UserDT> => {
	try {
		const response = await axiosInstance.get(
			`${AUTH_API_URL}users/${id}`,
			config,
		);
		return response?.data.data || response.data;
	} catch (error: unknown) {
		return handleOperationError("getUserById", "users", error);
	}
};

/**
 * Delete user by ID
 * @param id - User ID to delete
 * @param config - Optional axios request config
 * @returns Promise<{ success: boolean }>
 */
const deleteUser = async (
	id: number,
	config?: AxiosRequestConfig,
): Promise<{ message: string }> => {
	try {
		const response = await axiosInstance.delete(
			`${AUTH_API_URL}users/${id}`,
			config,
		);
		return response.data;
	} catch (error: unknown) {
		return handleOperationError("delete", "users", error);
	}
};

/**
 * Update user profile data
 * This is an Authenticated API call
 * @param userId - ID of the user to update
 * @param userData - Partial user data to update
 * @param config - Optional axios request config
 * @returns Promise<UserDT>
 * @throws Error if the operation fails
 */
const updateUser = async (
	userId: number,
	userData: Partial<UserDT>,
	config?: AxiosRequestConfig,
): Promise<UserDT> => {
	try {
		const response = await axiosInstance.put(
			`${AUTH_API_URL}/users/${userId}`,
			userData,
			config,
		);
		return response?.data;
	} catch (error: unknown) {
		return handleOperationError("updateUser", "users", error);
	}
};

/**
 * Register/ create a new user
 * @param userData - User registration data
 * @param config - Optional axios request config
 * @returns Promise<{ user: UserDT;  message: string }>
 */
const registerUser = async (
	userData: RegisterData,
	config?: AxiosRequestConfig,
): Promise<{ user: UserDT; message: string }> => {
	try {
		const response = await axiosInstance.post(
			`${AUTH_API_URL}users/register`,
			userData,
			config,
		);
		return response?.data;
	} catch (error: unknown) {
		return handleOperationError("register", "users", error);
	}
};

/**
 * Login user with credentials
 * @param credentials - User login credentials
 * @param config - Optional axios request config
 * @returns Promise<LoginResponse>
 */
const loginUser = async (
	credentials: LoginCredentials,
	config?: AxiosRequestConfig,
): Promise<LoginResponse> => {
	try {
		const response = await axiosInstance.post(
			`${AUTH_API_URL}login`,
			credentials,
			config,
		);
		return response?.data;
	} catch (error: unknown) {
		return handleOperationError("login", "users", error);
	}
};

/**
 * Logout user
 * This is an Authenticated API call
 * @param config - Optional axios request config
 * @returns Promise<{ message: string }>
 */
const logoutUser = async (
	config?: AxiosRequestConfig,
): Promise<{ message: string }> => {
	try {
		const response = await axiosInstance.post(`${AUTH_API_URL}logout`, config);
		return response?.data;
	} catch (error: unknown) {
		return handleOperationError("logout", "users", error);
	}
};

/**
 * Get current user profile
 * This is an Authenticated API call
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
	config?: AxiosRequestConfig,
): Promise<{ message: string }> => {
	try {
		const response = await axiosInstance.get(
			`${AUTH_API_URL}authenticated`,
			config,
		);
		return response?.data || response;
	} catch (error: unknown) {
		return handleOperationError("getUserStatus", "users", error);
	}
};

/**
 * Change user password
 * @param userId - ID of the user whose password is being changed
 * @param password - New password
 * @param config - Optional axios request config
 * @returns Promise<{ message: string }>
 */
const changeUserPassword = async (
	userId: number,
	password: string,
	config?: AxiosRequestConfig,
): Promise<{ message: string }> => {
	try {
		const response = await axiosInstance.put(
			`${AUTH_API_URL}users/${userId}/change-password`,
			{ password },
			config,
		);
		return response?.data;
	} catch (error: unknown) {
		return handleOperationError("changeUserPassword", "users", error);
	}
};

/**
 * Change my password
 * @param param0 - Object containing old password, new password, and user ID
 * @param config - Optional axios request config
 * @returns Promise<{ message: string }>
 */
const changeMyPassword = async (
	{ old_Password, new_password, id }: ChangeMyPassword,
	config?: AxiosRequestConfig,
): Promise<{ message: string }> => {
	try {
		const response = await axiosInstance.put(
			`${AUTH_API_URL}change-password`,
			{ old_Password, new_password, id },
			config,
		);
		return response?.data;
	} catch (error: unknown) {
		return handleOperationError("changeMyPassword", "users", error);
	}
};

export {
	changeMyPassword,
	changeUserPassword,
	deleteUser,
	getAllUsers,
	getCurrentUser,
	getUserById,
	getUserStatus,
	loginUser,
	logoutUser,
	registerUser,
	updateUser,
};
