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
	| "ministries";

/**
 * Represents the available user roles in the system
 *
 * @remarks
 * Defines the hierarchy of user permissions:
 * - "admin": Full system access and management capabilities
 * - "moderator": Content management and user moderation
 * - "guest": Limited read-only access
 */
export type UserRole = "admin" | "guest" | "moderator";

/**
 * Represents a user role option in the system
 *
 * @remarks
 * This type defines the structure of a user role option that includes metadata
 * about a specific role, such as its permissions and status. Used for role
 * management and assignment in the application.
 *
 * @property id - Unique identifier for the role option
 * @property name - The role type (admin, guest, or moderator)
 * @property description - Optional human-readable description of the role
 * @property permissions - Optional array of permission strings granted to this role
 * @property is_active - Optional flag indicating if the role is currently active/enabled
 */
export type UserRoleOption = {
	id: number;
	name: UserRole;
	description?: string;
	permissions?: string[];
	is_active?: boolean;
};

/**
 * Login credentials for user authentication
 * @description This type defines the structure of user login credentials.
 * It includes the username, password, remember_me flag, and an optional user ID.
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 */
export type LoginCredentials = Pick<
	UserDT,
	"username" | "password" | "remember_me"
>;

/**
 * Authentication token response
 * @description This interface defines the structure of the response returned by the authentication API.
 * It includes the access token, refresh token, and expiration time.
 * @property {string} accessToken - The access token for the authenticated user.
 * @property {string} refreshToken - The refresh token for the authenticated user.
 * @property {number} expiresIn - The expiration time of the access token in seconds.
 */
export interface AuthTokenResponse {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

/**
 * Login API response
 * @description This interface defines the structure of the response returned by the login API.
 * It includes the access token, refresh token, expiration time, and user details.
 * @property {string} accessToken - The access token for the authenticated user.
 *
 */
export interface LoginResponse extends AuthTokenResponse {
	message: string;
	user: UserDT;
}

/**
 * Represents the available event types in the system
 *
 * @remarks
 * Defines the different types of events that can be announced:
 * - "event": General events and activities
 * - "service": Religious services and worship
 * - "conference": Conferences and meetings
 * - "zoom": Virtual meetings via Zoom
 */
export type EventType = "event" | "service" | "conference" | "zoom";

/**
 * Represents an announcement in the system
 *
 * @remarks
 * This type defines the structure of announcements for events, services,
 * and other activities. Supports both physical and virtual events with
 * comprehensive scheduling and contact information.
 *
 * @property id - Unique identifier (auto-incremented)
 * @property title - Announcement title
 * @property type - Type of announcement (event, service, conference, zoom)
 * @property description - Optional description of the announcement
 * @property location - Physical location where the event will take place
 * @property conference_code - Conference code for virtual events
 * @property phone_number - Contact phone number
 * @property sermon - Sermon title or topic for religious services
 * @property speaker - Name of the speaker or presenter
 * @property recurring - Whether the event repeats on a schedule
 * @property created_at - When the announcement was created
 * @property author_id - ID of the author who created the announcement
 * @property event_date - string and time when the event will occur
 * @property date_format - Display format for the event date
 * @property zoom_id - Zoom meeting ID for virtual events
 * @property passcode - Passcode for Zoom meetings
 */
export type AnnouncementDT = {
	id: number;
	title: string;
	type: EventType;
	description?: string;
	location?: string;
	conference_code?: string;
	phone_number?: string;
	sermon?: string;
	speaker?: string;
	recurring?: boolean;
	created_at?: string;
	author_id: number;
	event_date?: Date;
	date_format: string;
	zoom_id?: string;
	passcode?: string;
};

/**
 * Represents a notification severity level
 *
 * @remarks
 * Used to categorize notifications by their importance or urgency:
 * - "information": Neutral informational messages
 * - "caution": Warning messages requiring attention
 * - "error": Critical issues requiring immediate action
 * - "success": Positive confirmations and successful operations
 */
export type NotificationSeverity =
	| "information"
	| "caution"
	| "error"
	| "success";

export type SeverityPalette = "info" | "warning" | "error" | "success";
