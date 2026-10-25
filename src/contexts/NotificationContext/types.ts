import type { NotificationDT } from "@/api";
import type { PropsWithChildren } from "react";

type NotificationContextProps = PropsWithChildren<{
	notifications: NotificationDT[];
	registerNotification: (notice: NotificationDT) => void;
	dismissNotification: (id: NotificationDT["id"]) => void;
	clearNotification: () => void;
}>;

export type { NotificationContextProps };
