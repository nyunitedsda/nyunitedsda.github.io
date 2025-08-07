import type { UserDT } from "./databaseTypes";

/**
 * Represents the available database entities in the system
 *
 * @remarks
 * This type defines all the valid entity names that can be used for
 * database operations throughout the application.
 */
export type DatabaseEntity =
	| "donations"
	| "users"
	| "articles"
	| "announcements"
	| "notifications"
	| "services"
	| "roles"
	| "contact_info"
	| "severity"
	| "legal_content"
	| "ministries"
	| "events";

export type UserRole = "admin" | "guest" | "moderator";

export type UserRoleOption = {
	id: number;
	name: UserRole;
	description?: string;
	permissions?: string[];
	is_active?: boolean;
};

export type LoginCredentials = Pick<
	UserDT,
	"username" | "password" | "remember_me"
>;

export type ChangeMyPassword = {
	old_Password: string;
	new_password: string;
	id: number;
};

export interface LoginResponse {
	message: string;
	user: UserDT;
}

export type EventType = "event" | "service" | "conference" | "zoom";

export type NotificationSeverity =
	| "information"
	| "caution"
	| "error"
	| "success";

export type SeverityPalette = "info" | "warning" | "error" | "success";
