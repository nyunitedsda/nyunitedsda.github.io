import DataTable from "@components/DataTable";
import { PageTitle } from "@components/PageWrapper";
import { NotificationEditor } from "@forms/collection";
import { useEntityList } from "@hooks/api";
import { usePermission } from "@hooks/auth";
import { initialNotification } from "@test/mock_data";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import type { DonationDT, NotificationDT } from "@/api";
import { deleteEntity } from "@/api";
import ADMIN_GENERAL_CONSTANTS from "../constants/general";
import notificationsColumns from "../constants/notificationsColumns";

const { NOTIFICATION_SUBHEADER: SUBHEADER } = ADMIN_GENERAL_CONSTANTS;

const NotificationAdmin: FC = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { canCreate, canEdit, canDelete } = usePermission("notifications");
	const {
		data: queryData,
		refetch,
		isLoading,
	} = useEntityList<DonationDT>("notifications");

	const [createNotificationOpen, setCreateNotificationOpen] =
		useState<Partial<NotificationDT> | null>(null);

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
		[refetch, enqueueSnackbar],
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
