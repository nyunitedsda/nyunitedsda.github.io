import { useCallback } from "react";
import { hasAnyPermission, hasPermission } from "../api/request/permissions";
import type { PermissionString } from "../api/request/types";
import useAuthentication from "./auth/useAuthentication";

/**
 * Custom hook for working with user permissions
 * Provides functions to check user permissions
 */
const usePermissions = () => {
  const { user } = useAuthentication();
  
  /**
   * Checks if the current user has the specified permission
   * @param permission The permission to check
   * @returns Boolean indicating whether the user has the permission
   */
  const checkPermission = useCallback(
    (permission: PermissionString): boolean => {
      // Users must be logged in to have permissions
      if (!user) return false;
      
      // Admin role automatically gets all permissions
      if (user.role === "admin") return true;
      
      return hasPermission(user.permissions, permission);
    },
    [user]
  );
  
  /**
   * Checks if the current user has any of the specified permissions
   * @param permissions Array of permissions to check
   * @returns Boolean indicating whether the user has any of the permissions
   */
  const checkAnyPermission = useCallback(
    (permissions: PermissionString[]): boolean => {
      // Users must be logged in to have permissions
      if (!user) return false;
      
      // Admin role automatically gets all permissions
      if (user.role === "admin") return true;
      
      return hasAnyPermission(user.permissions, permissions);
    },
    [user]
  );
  
  return {
    checkPermission,
    checkAnyPermission,
    isAdmin: user?.role === "admin",
    isModerator: user?.role === "moderator",
    isGuest: !user || user.role === "guest",
  };
};

export default usePermissions;
