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

/**
 * Checks if the user has at least one of the required permissions
 *
 * @param userPermissions - Array of permissions the user has
 * @param requiredPermissions - Array of required permissions to check
 * @returns true if any required permission is present in userPermissions, false otherwise
 *
 * @example
 * hasAnyPermission(['roles-read', 'roles-create'], ['roles-manage', 'roles-create']) // true
 * hasAnyPermission(['roles-read'], ['roles-manage', 'roles-create']) // false
 */
export function hasAnyPermission(
	userPermissions: string[],
	requiredPermissions: string[],
): boolean {
	return requiredPermissions.some((perm) => userPermissions.includes(perm));
}
