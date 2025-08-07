import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import { getDatabaseList } from "../../../api/request/commonQueries";
import type { NotificationDT } from "../../../api/request/databaseTypes";
import { deleteEntity } from "../../../api/request/mutations";
import DataTable from "../../../components/DataTable/DataTable";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import NotificationEditor from "../../../forms/collection/NotificationEditor/NotificationEditor";
import usePermission from "../../../hooks/auth/usePermission";
import { initialNotification } from "../../../test/mock_data";
import ADMIN_GENERAL_CONSTANTS from "../constants/general";
import notificationsColumns from "../constants/notificationsColumns";

const { NOTIFICATION_SUBHEADER: SUBHEADER } = ADMIN_GENERAL_CONSTANTS;

const NotificationAdmin: FC = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { canCreate, canEdit, canDelete } = usePermission("notifications");

	const [createNotificationOpen, setCreateNotificationOpen] =
		useState<Partial<NotificationDT> | null>(null);

	const {
		data: queryData,
		refetch,
		isLoading,
	} = useQuery<Partial<NotificationDT>[] | undefined>({
		queryKey: ["notifications"],
		queryFn: () => getDatabaseList("notifications"),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	const _handleDeleteNotification = useCallback(
		(data: Partial<NotificationDT>) => {
			const { id } = data as NotificationDT;
			deleteEntity("notifications", id)
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
		[refetch],
	);

	return (
		<>
			<PageTitle
				title=""
				subtitle={SUBHEADER}
				handleClick={
					canCreate
						? () => setCreateNotificationOpen(initialNotification)
						: undefined
				}
			/>

			<DataTable
				isLoading={isLoading}
				data={(queryData as Partial<NotificationDT>[]) ?? []}
				columns={notificationsColumns}
				onEdit={canEdit ? setCreateNotificationOpen : undefined}
				onDelete={canDelete ? _handleDeleteNotification : undefined}
			/>

			{createNotificationOpen && (
				<NotificationEditor
					open={!!createNotificationOpen}
					data={createNotificationOpen as NotificationDT}
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
