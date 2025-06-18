import {
	type FC,
	type PropsWithChildren,
	useCallback,
	useMemo,
	useState,
} from "react";
import type { NotificationProps } from "../../components/NotificationBanner/types";
import context from "./context";
import type { NotificationContextProps } from "./types";

const { Provider } = context;
const MAX_NOTIFICATIONS = 3;

const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
	const [notificationList, setNotificationList] = useState<NotificationProps[]>(
		[
			{
				id: "3",
			} as NotificationProps,
			{
				id: "23",
			} as NotificationProps,
			{
				id: "34",
			} as NotificationProps,
			{
				id: "4",
			} as NotificationProps,
		],
	);

	const notifications = useMemo(
		() =>
			notificationList.length > MAX_NOTIFICATIONS
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
		[notifications],
	);

	return <Provider value={value}>{children}</Provider>;
};

export default NotificationProvider;
