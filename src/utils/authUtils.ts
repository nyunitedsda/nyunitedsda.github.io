import type { AxiosRequestConfig } from "axios";

/**
 * Auth utility functions for managing request authorization
 */

/**
 * Sets the Authorization header for an axios request config
 *
 * @param token - The access token to use for authorization
 * @param config - Optional existing axios request config to merge with
 * @returns AxiosRequestConfig with Authorization header set
 *
 * @example
 * ```typescript
 * const token = getStoredToken();
 * const config = setAuthorizationHeader(token);
 * const response = await axiosInstance.get('/api/users', config);
 * ```
 */
export const setAuthorizationHeader = (
	token: string,
	config?: AxiosRequestConfig,
): AxiosRequestConfig => {
	return {
		...config,
		headers: {
			...config?.headers,
			Authorization: `Bearer ${token}`,
		},
	};
};

/**
 * Gets the stored access token from localStorage
 *
 * @returns The stored access token or null if not found
 */
export const getStoredToken = (): string | null => {
	return localStorage.getItem("accessToken");
};

/**
 * Gets the stored refresh token from localStorage
 *
 * @returns The stored refresh token or null if not found
 */
export const getStoredRefreshToken = (): string | null => {
	return localStorage.getItem("refreshToken");
};

/**
 * Stores authentication tokens in localStorage
 *
 * @param accessToken - The access token to store
 * @param refreshToken - The refresh token to store
 */
export const storeTokens = (
	accessToken: string,
	refreshToken: string,
): void => {
	localStorage.setItem("accessToken", accessToken);
	localStorage.setItem("refreshToken", refreshToken);
};

/**
 * Removes authentication tokens from localStorage
 */
export const clearTokens = (): void => {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("refreshToken");
};

/**
 * Creates an axios config with authorization header using stored token
 *
 * @param config - Optional existing axios request config to merge with
 * @returns AxiosRequestConfig with Authorization header set if token exists
 *
 * @example
 * ```typescript
 * const config = createAuthConfig();
 * const response = await axiosInstance.get('/api/protected-route', config);
 * ```
 */
export const createAuthConfig = (
	config?: AxiosRequestConfig,
): AxiosRequestConfig => {
	const token = getStoredToken();

	console.log("token: ", token);

	if (token) {
		return setAuthorizationHeader(token, config);
	}

	return config || {};
};

/**
 * Checks if user is authenticated by verifying token existence
 *
 * @returns true if access token exists in localStorage
 */
export const isAuthenticated = (): boolean => {
	return !!getStoredToken();
};

/**
 * Creates axios config with custom authorization token
 *
 * @param token - Custom token to use (overrides stored token)
 * @param config - Optional existing axios request config to merge with
 * @returns AxiosRequestConfig with custom Authorization header
 */
export const createCustomAuthConfig = (
	token: string,
	config?: AxiosRequestConfig,
): AxiosRequestConfig => {
	return setAuthorizationHeader(token, config);
};
