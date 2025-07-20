import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import { getDatabaseList } from "../../../api/request/commonQueries";
import { deleteEntity } from "../../../api/request/mutations";
import type { NotificationType } from "../../../api/request/types";
import DataTable from "../../../components/DataTable/DataTable";
import type { GenericType } from "../../../components/DataTable/types";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import NotificationEditor from "../../../forms/collection/NotificationEditor/NotificationEditor";
import useToken from "../../../hooks/auth/useToken";
import { defaultNotification } from "../../../test/mock_data/notifications";
import { createAuthConfig } from "../../../utils/authUtils";
import ADMIN_GENERAL_CONSTANTS from "../constants/general";
import notificationsColumns from "../constants/notificationsColumns";

const { NOTIFICATION_SUBHEADER: SUBHEADER } = ADMIN_GENERAL_CONSTANTS;

const NotificationAdmin: FC = () => {
	const { accessToken } = useToken();
	const { enqueueSnackbar } = useSnackbar();

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
				handleClick={() => setCreateNotificationOpen(defaultNotification)}
			/>

			<DataTable
				data={queryData as unknown as GenericType[]}
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
