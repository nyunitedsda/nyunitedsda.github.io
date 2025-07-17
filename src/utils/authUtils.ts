import type { AxiosRequestConfig } from "axios";

/**
 * Auth utility functions for managing request authorization
 */

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
	token: string | null,
	config?: AxiosRequestConfig,
): AxiosRequestConfig => {
	if (token) {
		return {
			...config,
			headers: {
				...config?.headers,
				Authorization: `Bearer ${token}`,
			},
		};
	}

	return config || {};
};
