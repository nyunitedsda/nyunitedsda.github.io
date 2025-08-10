import type { NotificationDT } from "../../api/request";

export type NotificationPosition = "top" | "bottom";
export type NotificationVariant = "banner" | "sticky" | "popup";

export interface NotificationProps extends NotificationDT {
	open?: boolean;
	onClose?: () => void;
}

export type NotificationBannerProps = NotificationProps & {};
