export type DatabaseEntity =
	| "donations"
	| "users"
	| "articles"
	| "announcements"
	| "notifications";

/**
 * Represents a user in the system
 */
export interface UserType {
	/** Unique identifier for the user */
	id: number;
	/** User's email address */
	email: string;
	/** User's first name */
	firstName?: string;
	/** User's last name */
	lastName?: string;
	/** User's role in the system */
	role: "admin" | "user" | "moderator";
	/** Whether the user's email is verified */
	emailVerified?: boolean;
	/** Timestamp when the user was created */
	createdAt?: Date;
	/** Timestamp when the user was last updated */
	updatedAt?: Date;
}

/**
 * Represents an donation payment method in the system
 */
export interface DonationType {
	id: number;
	title: string;
	description: string;
}

/**
 * Represents an article in the system
 */
export type ArticleType = {
	/** Unique identifier (auto-incremented) */
	id: number;
	/** Article title */
	title: string;
	/** ID of the author who wrote the article */
	author_id: number;
	/** Date when the article was published */
	publishDate: Date | string;
	/** Number of views the article has received */
	views?: number;
	/** Number of comments on the article */
	comments?: number;
	/** Rating of the article (out of 5.00) */
	rating?: number | null;
	/** Article category */
	category?: string | null;
	/** Path or URL to the article's image */
	img_src?: string | null;
	/** Full HTML/text content of the article */
	content: string;
	/** Timestamp when the article was created */
	created_at?: Date;
	/** Timestamp when the article was last modified */
	modified_at?: Date;
};

export type EventType = "event" | "service" | "conference" | "zoom";

/**
 * Represents an announcement in the system
 */
export type AnnouncementType = {
	/** Unique identifier (auto-incremented) */
	id: number;
	/** Announcement title */
	title: string;
	/** Type of announcement */
	type: EventType;
	/** Optional description of the announcement */
	description?: string;
	/** Physical location where the event will take place */
	location?: string;
	/** Conference code for virtual events */
	conference_code?: string;
	/** Contact phone number */
	phone_number?: string;
	/** Sermon title or topic */
	sermon?: string;
	/** Name of the speaker */
	speaker?: string;
	/** Whether the event is recurring */
	recurring?: boolean;
	/** When the announcement was created */
	created_at?: Date;
	/** ID of the author who created the announcement */
	author_id: number;
	/** Date and time when the event will occur */
	event_date?: Date;
	/** Display date format for event_date */
	date_format: string;
	/** Optional Zoom meeting ID for virtual events */
	zoom_id?: string;
	/** Optional passcode for Zoom meetings */
	passcode?: string;
};

/**
 * Represents a notification severity level
 * Used to categorize notifications by their importance or urgency
 * "information" for neutral messages,
 * "caution" for warnings, "error" for critical issues,
 * and "success" for positive confirmations.
 */
export type NotificationSeverity =
	| "information"
	| "caution"
	| "error"
	| "success";

/**
 * Represents an option for notification severity.
 *
 * @remarks
 * This type defines the structure of an option that includes a unique identifier, a severity value,
 * and a human-readable label used to identify a particular notification severity in the application.
 *
 * @property id - The unique identifier for the notification severity option.
 * @property value - The notification severity value; typically, this corresponds to one of the defined
 * severity levels.
 * @property label - A descriptive text label representing the notification severity.
 */
export type NotificationSeverityOption = {
	id: number;
	value: NotificationSeverity;
	label: string;
};
/**
 * Represents a notification in the system
 * Notifications can be used to inform users about important events, updates, or actions required.
 */
export interface NotificationType {
	/**
	 * Unique identifier for the notification
	 */
	id: number;
	/**
	 * The main message to display
	 */
	message: string;
	/**
	 * Optional title for the notification
	 */
	title?: string;
	/**
	 * The severity level of the notification
	 */
	severity?: NotificationSeverity;
	/**
	 * The date and time when the notification will expire
	 * If not provided, the notification will not expire automatically
	 */
	expires_at?: Date;
}
