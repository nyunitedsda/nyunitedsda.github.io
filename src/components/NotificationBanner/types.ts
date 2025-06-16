export type NotificationSeverity = "info" | "warning" | "error" | "success";
export type NotificationPosition = "top" | "bottom";
export type NotificationVariant = "banner" | "sticky" | "popup";

interface NotificationProps {
	/**
	 * Unique identifier for the notification
	 */
	id: string;
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
	 * Whether the notification can be dismissed
	 */
	dismissible?: boolean;
	/**
	 * Whether the notification should be shown
	 */
	open?: boolean;
	/**
	 * Callback when notification is closed
	 */
	onClose?: () => void;
	/**
	 * Optional action button text
	 */
	actionText?: string;
	/**
	 * Optional action button link
	 */
	actionLink?: string;
	/**
	 * Optional action button click handler
	 */
	onActionClick?: () => void;
	/**
	 * Display variant
	 */
	variant?: NotificationVariant;
	/**
	 * Position for sticky and popup variants
	 */
	position?: NotificationPosition;
	/**
	 * Auto hide duration in milliseconds (0 for no auto-hide)
	 */
	autoHideDuration?: number;
	/**
	 * Whether to show the notification icon
	 */
	showIcon?: boolean;
}

export type { NotificationProps };
