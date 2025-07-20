import { useQuery } from "@tanstack/react-query";
import { type FC, useCallback, useEffect, useState } from "react";
import { getDatabaseList } from "../../../api/request/commonQueries";
import { deleteEntity } from "../../../api/request/mutations";
import type { NotificationType } from "../../../api/request/types";
import DataTable from "../../../components/DataTable/DataTable";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import NotificationEditor from "../../../forms/collection/NotificationEditor/NotificationEditor";
import useToken from "../../../hooks/auth/useToken";
import { initialValues } from "../../../test/mock_data/notifications";
import { createAuthConfig } from "../../../utils/authUtils";
import notificationsColumns from "../constants/notificationsColumns";

const NOTIFICATION_SUBHEADER = "Manage application notifications";

const NotificationAdmin: FC = () => {
	const [notificationData, setNotificationData] = useState<
		Partial<NotificationType>[]
	>([]);
	const [createNotificationOpen, setCreateNotificationOpen] =
		useState<Partial<NotificationType> | null>(null);
	const { accessToken } = useToken();

	const { data: queryData, refetch } = useQuery<
		{ data: NotificationType[] } | undefined
	>({
		queryKey: ["notifications"],
		queryFn: () =>
			getDatabaseList("notifications", createAuthConfig(accessToken)),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (queryData && Array.isArray(queryData.data)) {
			setNotificationData(queryData.data);
		}
	}, [queryData]);

	const _handleDeleteNotification = useCallback((id: number) => {
		deleteEntity("notifications", id, createAuthConfig(accessToken))
			.then(() => {
				setNotificationData((prev) =>
					prev.filter((notification) => notification?.id !== id),
				);
			})
			.catch((error) => {
				console.error("Failed to delete notification:", error);
			});
	}, []);

	return (
		<>
			<PageTitle
				title=""
				subtitle={NOTIFICATION_SUBHEADER}
				handleClick={() => setCreateNotificationOpen(initialValues)}
			/>

			<DataTable
				data={notificationData}
				columns={notificationsColumns}
				onEdit={(d) => setCreateNotificationOpen(d)}
				onDelete={(d) => _handleDeleteNotification(d?.id as number)}
				onView={(d) => setCreateNotificationOpen(d)}
			/>

			{createNotificationOpen && (
				<NotificationEditor
					open={!!createNotificationOpen}
					data={createNotificationOpen as NotificationType}
					onClose={() => setCreateNotificationOpen(null)}
					onSuccess={() => {
						refetch();
						setCreateNotificationOpen(null);
					}}
				/>
			)}
		</>
	);
};

export default NotificationAdmin;
