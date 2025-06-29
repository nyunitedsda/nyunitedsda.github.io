import { type FC, type PropsWithChildren, Fragment } from "react";
import type { PermissionString } from "../../api/request/types";
import usePermissions from "../../hooks/usePermissions";

interface PermissionGuardProps extends PropsWithChildren {
  /**
   * Array of permissions - if any match, content will be shown
   * If empty, content will always be shown
   */
  permissions?: PermissionString[];
  
  /**
   * Optional fallback component to render when user doesn't have permission
   * If not provided, nothing will be rendered
   */
  fallback?: React.ReactNode;
  
  /**
   * If true, admin users always see content (default: true)
   */
  adminOverride?: boolean;
}

/**
 * A component that conditionally renders content based on user permissions
 * Use this to protect UI elements that require specific permissions
 */
const PermissionGuard: FC<PermissionGuardProps> = ({
  children,
  permissions = [],
  fallback = null,
  adminOverride = true,
}) => {
  const { checkAnyPermission, isAdmin } = usePermissions();
  
  // If no permissions are specified, or admin override is enabled and user is admin,
  // always render the content
  const hasAccess = 
    permissions.length === 0 || 
    (adminOverride && isAdmin) ||
    checkAnyPermission(permissions);
  
  return (
    <Fragment>
      {hasAccess ? children : fallback}
    </Fragment>
  );
};

export default PermissionGuard;
