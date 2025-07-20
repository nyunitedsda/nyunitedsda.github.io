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
import ADMIN_GENERAL_CONSTANTS from "../constants/general";
import notificationsColumns from "../constants/notificationsColumns";
import { useSnackbar } from "notistack";

const { NOTIFICATION_SUBHEADER: SUBHEADER } = ADMIN_GENERAL_CONSTANTS;

const NotificationAdmin: FC = () => {
	const { accessToken } = useToken();
	const { enqueueSnackbar } = useSnackbar();

	const [notificationData, setNotificationData] = useState<
		Partial<NotificationType>[]
	>([]);
	const [createNotificationOpen, setCreateNotificationOpen] =
		useState<Partial<NotificationType> | null>(null);

	const { data: queryData, refetch } = useQuery<NotificationType[] | undefined>(
		{
			queryKey: ["notifications"],
			queryFn: () =>
				getDatabaseList("notifications", createAuthConfig(accessToken)),
			staleTime: 5 * 60 * 1000,
			refetchOnWindowFocus: false,
		},
	);

	useEffect(() => {
		if (queryData && Array.isArray(queryData)) {
			setNotificationData(queryData);
		}
	}, [queryData]);

	const _handleDeleteNotification = useCallback(
		(id: number) => {
			deleteEntity("notifications", id, createAuthConfig(accessToken))
				.then(() => {
					refetch();
					enqueueSnackbar("Notification deleted successfully", {
						variant: "success",
					});
				})
				.catch((error) => {
					console.error("Failed to delete notification:", error);
					enqueueSnackbar("Failed to delete notification", {
						variant: "error",
					});
				});
		},
		[accessToken],
	);

	return (
		<>
			<PageTitle
				title=""
				subtitle={SUBHEADER}
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
