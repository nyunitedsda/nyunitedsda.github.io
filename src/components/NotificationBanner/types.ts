import type { NotificationType } from "../../api/request/types";

export type NotificationPosition = "top" | "bottom";
export type NotificationVariant = "banner" | "sticky" | "popup";

export interface NotificationProps extends NotificationType {
	/**
	 * Whether the notification should be shown
	 */
	open?: boolean;
	/**
	 * Callback when notification is closed
	 */
	onClose?: () => void;
}
