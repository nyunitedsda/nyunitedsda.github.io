import type { AxiosRequestConfig } from "axios";
import axiosInstance from "../axiosInstance";
import { handleOperationError } from "./helpers";
import type { LoginCredentials, LoginResponse, UserType } from "./types";

const AUTH_API_URL = import.meta.env.VITE_API_AUTH_URL || "/api/auth/";

/**
 * Get a list of all system users
 * This a Authenticated API call that requires a valid token
 * @param config - Optional axios request config
 * @returns Promise<UserType[]>
 * @throws Error if the operation fails
 */
const getAllUsers = async (
	config?: AxiosRequestConfig,
): Promise<UserType[]> => {
	try {
		console.log("All users config: ", config);

		const response = await axiosInstance.get(`${AUTH_API_URL}users`, config);
		return response?.data.data || response.data;
	} catch (error: unknown) {
		return handleOperationError("getAllUsers", "users", error);
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
): Promise<{ success: boolean }> => {
	try {
		const response = await axiosInstance.delete(
			`${AUTH_API_URL}user/${id}`,
			config,
		);
		return response.data;
	} catch (error: unknown) {
		return handleOperationError("delete", "users", error);
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

export { deleteUser, getAllUsers, loginUser };
