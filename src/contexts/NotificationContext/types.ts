import type { NotificationProps } from "@components/NotificationBanner";
import type { PropsWithChildren } from "react";

type NotificationContextProps = PropsWithChildren<{
	notifications: NotificationProps[];
	registerNotification: (notice: NotificationProps) => void;
	dismissNotification: (id: NotificationProps["id"]) => void;
	clearNotification: () => void;
}>;

export type { NotificationContextProps };
