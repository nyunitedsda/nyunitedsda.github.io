import type { NotificationProps } from "@components/NotificationBanner";
import { useEntityList } from "@hooks/api";
import {
	type FC,
	type PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import type { NotificationDT } from "@/api";
import { Provider } from "./context";
import type { NotificationContextProps } from "./types";

const MAX_NOTIFICATIONS = 3;

const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
	const { data, refetch } = useEntityList<NotificationDT>("notifications");
	const [notificationList, setNotificationList] = useState<NotificationDT[]>(
		[],
	);

	useEffect(() => {
		if (data) setNotificationList(data as NotificationDT[]);
	}, [data]);

	useEffect(() => {
		const timer = setInterval(() => refetch(), 6000 * 15);
		return clearInterval(timer);
	});

	const notifications = useMemo(
		() =>
			(notificationList.length ?? 0) > MAX_NOTIFICATIONS
				? notificationList.slice(0, MAX_NOTIFICATIONS)
				: notificationList,
		[notificationList],
	);

	const registerNotification = useCallback((notice: NotificationProps) => {
		setNotificationList((d) => [...d, { ...notice }]);
	}, []);

	const dismissNotification = useCallback((id: NotificationProps["id"]) => {
		setNotificationList((d) => d.filter((i) => i.id !== id));
	}, []);

	const clearNotification = useCallback(() => {
		setNotificationList([]);
	}, []);

	const value: NotificationContextProps = useMemo(
		() => ({
			notifications,
			registerNotification,
			dismissNotification,
			clearNotification,
		}),
		[
			notifications,
			registerNotification,
			dismissNotification,
			clearNotification,
		],
	);

	return <Provider value={value}>{children}</Provider>;
};

export default NotificationProvider;
