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
