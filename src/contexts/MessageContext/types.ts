import type { PropsWithChildren } from "react";
import type { NotificationProps } from "../../components/NotificationBanner/types";

type MessageContextProps = PropsWithChildren<{
	notifications: NotificationProps[];
	registerNotification: (notice: NotificationProps) => void;
	dismissNotification: (id: NotificationProps["id"]) => void;
	clearNotification: () => void;
}>;

export type { MessageContextProps };
