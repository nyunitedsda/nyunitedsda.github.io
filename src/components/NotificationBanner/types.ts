import type { NotificationType } from "../../api/request/types";

export type NotificationPosition = "top" | "bottom";
export type NotificationVariant = "banner" | "sticky" | "popup";

export interface NotificationProps extends NotificationType {
	open?: boolean;
	onClose?: () => void;
}

export type NotificationBannerProps = NotificationProps & {};