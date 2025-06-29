import type { DatabaseEntity, Permission, PermissionString, UserRole } from "./types";

// ===== Permission Constants =====

// Admin Permissions
export const ADMIN_USERS_READ: PermissionString = "admin.users.read";
export const ADMIN_USERS_WRITE: PermissionString = "admin.users.write";
export const ADMIN_USERS_DELETE: PermissionString = "admin.users.delete";
export const ADMIN_USERS_MODIFY: PermissionString = "admin.users.modify";

export const ADMIN_DONATIONS_READ: PermissionString = "admin.donations.read";
export const ADMIN_DONATIONS_WRITE: PermissionString = "admin.donations.write";
export const ADMIN_DONATIONS_DELETE: PermissionString = "admin.donations.delete";
export const ADMIN_DONATIONS_MODIFY: PermissionString = "admin.donations.modify";

export const ADMIN_ARTICLES_READ: PermissionString = "admin.articles.read";
export const ADMIN_ARTICLES_WRITE: PermissionString = "admin.articles.write";
export const ADMIN_ARTICLES_DELETE: PermissionString = "admin.articles.delete";
export const ADMIN_ARTICLES_MODIFY: PermissionString = "admin.articles.modify";

export const ADMIN_ANNOUNCEMENTS_READ: PermissionString = "admin.announcements.read";
export const ADMIN_ANNOUNCEMENTS_WRITE: PermissionString = "admin.announcements.write";
export const ADMIN_ANNOUNCEMENTS_DELETE: PermissionString = "admin.announcements.delete";
export const ADMIN_ANNOUNCEMENTS_MODIFY: PermissionString = "admin.announcements.modify";

export const ADMIN_NOTIFICATIONS_READ: PermissionString = "admin.notifications.read";
export const ADMIN_NOTIFICATIONS_WRITE: PermissionString = "admin.notifications.write";
export const ADMIN_NOTIFICATIONS_DELETE: PermissionString = "admin.notifications.delete";
export const ADMIN_NOTIFICATIONS_MODIFY: PermissionString = "admin.notifications.modify";

export const ADMIN_SERVICES_READ: PermissionString = "admin.services.read";
export const ADMIN_SERVICES_WRITE: PermissionString = "admin.services.write";
export const ADMIN_SERVICES_DELETE: PermissionString = "admin.services.delete";
export const ADMIN_SERVICES_MODIFY: PermissionString = "admin.services.modify";

export const ADMIN_CONTACTS_READ: PermissionString = "admin.contacts.read";
export const ADMIN_CONTACTS_WRITE: PermissionString = "admin.contacts.write";
export const ADMIN_CONTACTS_DELETE: PermissionString = "admin.contacts.delete";
export const ADMIN_CONTACTS_MODIFY: PermissionString = "admin.contacts.modify";

// Moderator Permissions
export const MODERATOR_USERS_READ: PermissionString = "moderator.users.read";

export const MODERATOR_DONATIONS_READ: PermissionString = "moderator.donations.read";

export const MODERATOR_ARTICLES_READ: PermissionString = "moderator.articles.read";
export const MODERATOR_ARTICLES_WRITE: PermissionString = "moderator.articles.write";
export const MODERATOR_ARTICLES_MODIFY: PermissionString = "moderator.articles.modify";

export const MODERATOR_ANNOUNCEMENTS_READ: PermissionString = "moderator.announcements.read";
export const MODERATOR_ANNOUNCEMENTS_WRITE: PermissionString = "moderator.announcements.write";
export const MODERATOR_ANNOUNCEMENTS_MODIFY: PermissionString = "moderator.announcements.modify";

export const MODERATOR_NOTIFICATIONS_READ: PermissionString = "moderator.notifications.read";
export const MODERATOR_NOTIFICATIONS_WRITE: PermissionString = "moderator.notifications.write";
export const MODERATOR_NOTIFICATIONS_MODIFY: PermissionString = "moderator.notifications.modify";

export const MODERATOR_SERVICES_READ: PermissionString = "moderator.services.read";
export const MODERATOR_SERVICES_WRITE: PermissionString = "moderator.services.write";
export const MODERATOR_SERVICES_MODIFY: PermissionString = "moderator.services.modify";

export const MODERATOR_CONTACTS_READ: PermissionString = "moderator.contacts.read";

/**
 * Complete list of permissions with descriptions
 */
export const PERMISSIONS: Permission[] = [
  // Admin User Permissions
  { 
    id: ADMIN_USERS_READ, 
    description: "View user details and account information" 
  },
  { 
    id: ADMIN_USERS_WRITE, 
    description: "Create new user accounts" 
  },
  { 
    id: ADMIN_USERS_DELETE, 
    description: "Remove user accounts from the system" 
  },
  { 
    id: ADMIN_USERS_MODIFY, 
    description: "Update existing user account details, including roles and permissions" 
  },
  
  // Admin Donations Permissions
  { 
    id: ADMIN_DONATIONS_READ, 
    description: "View donation details and transaction history" 
  },
  { 
    id: ADMIN_DONATIONS_WRITE, 
    description: "Create new donation records" 
  },
  { 
    id: ADMIN_DONATIONS_DELETE, 
    description: "Remove donation records from the system" 
  },
  { 
    id: ADMIN_DONATIONS_MODIFY, 
    description: "Update existing donation information" 
  },
  
  // Admin Articles Permissions
  { 
    id: ADMIN_ARTICLES_READ, 
    description: "View all published and draft articles" 
  },
  { 
    id: ADMIN_ARTICLES_WRITE, 
    description: "Create new articles" 
  },
  { 
    id: ADMIN_ARTICLES_DELETE, 
    description: "Remove articles from the system" 
  },
  { 
    id: ADMIN_ARTICLES_MODIFY, 
    description: "Update existing article content" 
  },
  
  // Admin Announcements Permissions
  { 
    id: ADMIN_ANNOUNCEMENTS_READ, 
    description: "View all announcements" 
  },
  { 
    id: ADMIN_ANNOUNCEMENTS_WRITE, 
    description: "Create new announcements" 
  },
  { 
    id: ADMIN_ANNOUNCEMENTS_DELETE, 
    description: "Remove announcements from the system" 
  },
  { 
    id: ADMIN_ANNOUNCEMENTS_MODIFY, 
    description: "Update existing announcement details" 
  },
  
  // Admin Notifications Permissions
  { 
    id: ADMIN_NOTIFICATIONS_READ, 
    description: "View all system notifications" 
  },
  { 
    id: ADMIN_NOTIFICATIONS_WRITE, 
    description: "Create new system notifications" 
  },
  { 
    id: ADMIN_NOTIFICATIONS_DELETE, 
    description: "Remove notifications from the system" 
  },
  { 
    id: ADMIN_NOTIFICATIONS_MODIFY, 
    description: "Update existing notification content" 
  },
  
  // Admin Services Permissions
  { 
    id: ADMIN_SERVICES_READ, 
    description: "View all service details" 
  },
  { 
    id: ADMIN_SERVICES_WRITE, 
    description: "Create new services" 
  },
  { 
    id: ADMIN_SERVICES_DELETE, 
    description: "Remove services from the system" 
  },
  { 
    id: ADMIN_SERVICES_MODIFY, 
    description: "Update existing service information" 
  },
  
  // Admin Contacts Permissions
  { 
    id: ADMIN_CONTACTS_READ, 
    description: "View all contact information" 
  },
  { 
    id: ADMIN_CONTACTS_WRITE, 
    description: "Create new contact records" 
  },
  { 
    id: ADMIN_CONTACTS_DELETE, 
    description: "Remove contact information from the system" 
  },
  { 
    id: ADMIN_CONTACTS_MODIFY, 
    description: "Update existing contact details" 
  },
  
  // Moderator User Permissions
  { 
    id: MODERATOR_USERS_READ, 
    description: "View basic user information" 
  },
  
  // Moderator Donations Permissions
  { 
    id: MODERATOR_DONATIONS_READ, 
    description: "View donation summary information" 
  },
  
  // Moderator Articles Permissions
  { 
    id: MODERATOR_ARTICLES_READ, 
    description: "View all published articles" 
  },
  { 
    id: MODERATOR_ARTICLES_WRITE, 
    description: "Create draft articles (requires approval)" 
  },
  { 
    id: MODERATOR_ARTICLES_MODIFY, 
    description: "Update existing article content (requires approval)" 
  },
  
  // Moderator Announcements Permissions
  { 
    id: MODERATOR_ANNOUNCEMENTS_READ, 
    description: "View all announcements" 
  },
  { 
    id: MODERATOR_ANNOUNCEMENTS_WRITE, 
    description: "Create new announcements (requires approval)" 
  },
  { 
    id: MODERATOR_ANNOUNCEMENTS_MODIFY, 
    description: "Update existing announcement details (requires approval)" 
  },
  
  // Moderator Notifications Permissions
  { 
    id: MODERATOR_NOTIFICATIONS_READ, 
    description: "View all standard notifications" 
  },
  { 
    id: MODERATOR_NOTIFICATIONS_WRITE, 
    description: "Create new standard notifications" 
  },
  { 
    id: MODERATOR_NOTIFICATIONS_MODIFY, 
    description: "Update existing notification content (non-critical only)" 
  },
  
  // Moderator Services Permissions
  { 
    id: MODERATOR_SERVICES_READ, 
    description: "View all service details" 
  },
  { 
    id: MODERATOR_SERVICES_WRITE, 
    description: "Create new service entries (requires approval)" 
  },
  { 
    id: MODERATOR_SERVICES_MODIFY, 
    description: "Update service information (requires approval)" 
  },
  
  // Moderator Contacts Permissions
  { 
    id: MODERATOR_CONTACTS_READ, 
    description: "View public contact information" 
  },
];

/**
 * Helper function to generate all permissions for a role and entity
 * @param role The user role
 * @param entity The database entity
 * @returns Array of permission strings
 */
export function generateEntityPermissions(
  role: Exclude<UserRole, "guest">,
  entity: DatabaseEntity
): PermissionString[] {
  return [
    `${role}.${entity}.read`,
    `${role}.${entity}.write`,
    `${role}.${entity}.delete`,
    `${role}.${entity}.modify`,
  ] as PermissionString[];
}

/**
 * Default permission sets by role
 */
export const DEFAULT_PERMISSIONS_BY_ROLE = {
  admin: [
    // Admin has full access to everything
    ...generateEntityPermissions("admin", "users"),
    ...generateEntityPermissions("admin", "donations"),
    ...generateEntityPermissions("admin", "articles"),
    ...generateEntityPermissions("admin", "announcements"),
    ...generateEntityPermissions("admin", "notifications"),
    ...generateEntityPermissions("admin", "services"),
    ...generateEntityPermissions("admin", "contacts"),
  ],
  moderator: [
    // Moderators have limited permissions
    MODERATOR_USERS_READ,
    MODERATOR_DONATIONS_READ,
    MODERATOR_ARTICLES_READ,
    MODERATOR_ARTICLES_WRITE,
    MODERATOR_ARTICLES_MODIFY,
    MODERATOR_ANNOUNCEMENTS_READ,
    MODERATOR_ANNOUNCEMENTS_WRITE,
    MODERATOR_ANNOUNCEMENTS_MODIFY,
    MODERATOR_NOTIFICATIONS_READ,
    MODERATOR_NOTIFICATIONS_WRITE,
    MODERATOR_NOTIFICATIONS_MODIFY,
    MODERATOR_SERVICES_READ,
    MODERATOR_SERVICES_WRITE,
    MODERATOR_SERVICES_MODIFY,
    MODERATOR_CONTACTS_READ,
  ],
  guest: [] as string[], // Guests have no explicit permissions
};

/**
 * Checks if a user has a specific permission
 * @param userPermissions List of permission strings that the user has
 * @param requiredPermission The permission to check for
 * @returns Boolean indicating whether the user has the permission
 */
export function hasPermission(
  userPermissions: string[] | undefined,
  requiredPermission: PermissionString
): boolean {
  if (!userPermissions || userPermissions.length === 0) {
    return false;
  }
  return userPermissions.includes(requiredPermission);
}

/**
 * Checks if a user has any of the specified permissions
 * @param userPermissions List of permission strings that the user has
 * @param requiredPermissions The permissions to check for
 * @returns Boolean indicating whether the user has any of the permissions
 */
export function hasAnyPermission(
  userPermissions: string[] | undefined,
  requiredPermissions: PermissionString[]
): boolean {
  if (!userPermissions || userPermissions.length === 0) {
    return false;
  }
  
  return requiredPermissions.some(permission => 
    userPermissions.includes(permission)
  );
}
