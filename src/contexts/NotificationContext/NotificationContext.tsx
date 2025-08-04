import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import {
	type FC,
	type PropsWithChildren,
	useCallback,
	useMemo,
	useState,
} from "react";
import { getDatabaseList } from "../../api/request/commonQueries";
import type { NotificationDT } from "../../api/request/types";
import type { NotificationProps } from "../../components/NotificationBanner/types";
import { Provider } from "./context";
import type { NotificationContextProps } from "./types";

const MAX_NOTIFICATIONS = 3;

const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
	const { enqueueSnackbar } = useSnackbar();

	const [notificationList, setNotificationList] = useState<NotificationDT[]>(
		[],
	);

	useQuery({
		queryKey: ["notifications"],
		queryFn: async () =>
			await getDatabaseList<NotificationDT>("notifications")
				.then((res) => {
					if (res) {
						setNotificationList(res);
					}
					return res;
				})
				.catch((error) => {
					enqueueSnackbar(String(error), { variant: "error" });
					Promise.reject(error);
				}),
		staleTime: 1000 * 60 * 5, // 5 minutes
		refetchOnMount: true,
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
