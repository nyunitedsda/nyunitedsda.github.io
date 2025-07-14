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
	| "contacts";

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
 * Represents a user in the system
 *
 * @remarks
 * This interface defines the complete user model including authentication,
 * profile information, and system metadata. Used for user management
 * and authentication throughout the application.
 *
 * @property id - Unique identifier for the user
 * @property email - User's email address (optional for some user types)
 * @property firstName - User's first name (optional)
 * @property lastName - User's last name (optional)
 * @property username - User's unique username (required)
 * @property password - User's password hash (optional for security)
 * @property role - User's role in the system (admin, moderator, or guest)
 * @property permissions - Array of specific permissions granted to the user
 * @property remember_me - Whether the user has opted for "Remember Me" functionality
 * @property emailVerified - Whether the user's email address has been verified
 * @property createdAt - Timestamp when the user account was created
 * @property updatedAt - Timestamp when the user account was last updated
 */
export interface UserType {
	id: number;
	email?: string;
	firstName?: string;
	lastName?: string;
	username: string;
	password?: string;
	role: UserRole;
	permissions?: string[];
	remember_me: boolean;
	emailVerified?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

/**
 * Represents a donation payment method in the system
 *
 * @remarks
 * This interface defines the structure of donation options available
 * to users for making contributions to the organization.
 *
 * @property id - Unique identifier for the donation type
 * @property title - Display name of the donation method
 * @property description - Detailed description of the donation option
 */
export interface DonationType {
	id: number;
	title: string;
	description: string;
}

/**
 * Represents an article in the system
 *
 * @remarks
 * This type defines the complete structure of articles/blog posts in the system,
 * including content, metadata, and engagement metrics. Used for content
 * management and display throughout the application.
 *
 * @property id - Unique identifier (auto-incremented)
 * @property title - Article title
 * @property author_id - ID of the author who wrote the article
 * @property publishDate - Date when the article was published
 * @property views - Number of views the article has received
 * @property comments - Number of comments on the article
 * @property rating - Rating of the article (out of 5.00)
 * @property category - Article category for organization
 * @property img_src - Path or URL to the article's featured image
 * @property content - Full HTML/text content of the article
 * @property created_at - Timestamp when the article was created
 * @property modified_at - Timestamp when the article was last modified
 */
export type ArticleType = {
	id: number;
	title: string;
	author_id: number;
	publishDate: Date | string;
	views?: number;
	comments?: number;
	rating?: number | null;
	category?: string | null;
	img_src?: string | null;
	content: string;
	created_at?: Date;
	modified_at?: Date;
};

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
 * @property event_date - Date and time when the event will occur
 * @property date_format - Display format for the event date
 * @property zoom_id - Zoom meeting ID for virtual events
 * @property passcode - Passcode for Zoom meetings
 */
export type AnnouncementType = {
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
	created_at?: Date;
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

/**
 * Represents an option for notification severity
 *
 * @remarks
 * This type defines the structure of a notification severity option that includes
 * a unique identifier, a severity value, and a human-readable label. Used for
 * building UI components and managing notification severity selections.
 *
 * @property id - The unique identifier for the notification severity option
 * @property value - The notification severity value from NotificationSeverity type
 * @property label - A descriptive text label representing the notification severity
 */
export type NotificationSeverityOption = {
	id: number;
	value: NotificationSeverity;
	label: string;
};

/**
 * Represents a notification in the system
 *
 * @remarks
 * Notifications are used to inform users about important events, updates,
 * or actions required. They can have different severity levels and optional
 * expiration dates for automatic cleanup.
 *
 * @property id - Unique identifier for the notification
 * @property message - The main message content to display
 * @property title - Optional title for the notification
 * @property severity - The severity level of the notification
 * @property expires_at - Date and time when the notification expires (optional)
 */
export interface NotificationType {
	id: number;
	message: string;
	title?: string;
	severity?: NotificationSeverity;
	expires_at?: Date;
}

/**
 * Represents a service in the system
 *
 * @remarks
 * This interface defines the structure of religious services and events
 * offered by the organization, including scheduling and descriptive information.
 *
 * @property id - Unique identifier (auto-incremented)
 * @property time - Time when the service takes place
 * @property title - Title or name of the service
 * @property created_at - Timestamp when the service was created
 * @property modified_at - Timestamp when the service was last modified
 */
export interface ServiceType {
	id: number;
	time: string;
	title: string;
	created_at?: Date;
	modified_at?: Date;
}

/**
 * Represents contact information in the system
 *
 * @remarks
 * This interface defines the structure of contact information for the organization,
 * including physical address, digital contact methods, and mailing details.
 * Used for displaying contact information and handling correspondence.
 *
 * @property id - Unique identifier (auto-incremented)
 * @property email - Contact email address
 * @property phone - Contact phone number
 * @property street - Street address
 * @property city - City name
 * @property zip_code - ZIP or postal code
 * @property country - Country name
 * @property mail_address - Optional separate mailing address
 * @property mailing_recipient - Optional name for mailing recipient
 * @property created_at - Timestamp when the contact info was created
 * @property modified_at - Timestamp when the contact info was last modified
 */
export interface ContactInfoType {
	id: number;
	email: string;
	phone: string;
	street: string;
	city: string;
	zip_code: string;
	country: string;
	mail_address?: string;
	mailing_recipient?: string;
	created_at?: Date;
	modified_at?: Date;
}
