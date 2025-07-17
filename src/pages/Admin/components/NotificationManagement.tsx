import { useEffect, useState, type FC } from "react";
import { deleteEntity } from "../../../api/request/commonMutations";
import { getDatabaseList } from "../../../api/request/commonQueries";
import type { NotificationType } from "../../../api/request/types";
import DataTable from "../../../components/DataTable/DataTable";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import NotificationEditor from "../../../forms/collection/NotificationEditor/NotificationEditor";
import { initialValues } from "../../../test/mock_data/notifications";
import { createAuthConfig } from "../../../utils/authUtils";
import notificationsColumns from "../constants/notificationsColumns";

const NOTIFICATION_SUBHEADER = "Manage application notifications";


const NotificationAdmin: FC = () => {
	const [createOpen, setCreateOpen] = useState<Partial<NotificationType> | null>(null);
	const [notificationsData, setNotificationsData] = useState<Partial<NotificationType>[]>([]);

useEffect(() => {
		const authConfig = createAuthConfig();

		getDatabaseList<NotificationType>('notifications', authConfig)
			.then((res) => {
				if (Array.isArray(res?.data)) {
					setNotificationsData(res.data);
				} else {
					console.error("Unexpected response format:", res);
					setNotificationsData([]);
				}
			})
			.catch((error) => {
				console.error("Failed to fetch users:", error);
				setNotificationsData([]);
			});
	}, []);


	const _handleDelete = (id: number) => {
		deleteEntity<NotificationType>("notifications", id)
			.then((res) => {
				console.log("Notification deleted successfully:", res);

				console.log(`Deleting notification with ID: ${id}`);
				setCreateOpen(null); // Close the editor after deletion
			})
			.catch((error) => {
				console.error("Error deleting notification:", error);
			});
	};

	return (
		<>
			<PageTitle
				title=""
				subtitle={NOTIFICATION_SUBHEADER}
				handleClick={() => setCreateOpen(initialValues)}
			/>

			<DataTable
				data={notificationsData}
				columns={notificationsColumns}
				onEdit={(d) => setCreateOpen(d)}
				onDelete={(d) => _handleDelete(d?.id as number)}
				onView={(d) => setCreateOpen(d)}
			/>

			{createOpen && (
				<NotificationEditor
					open={!!createOpen}
					data={createOpen}
					onClose={() => setCreateOpen(null)}
				/>
			)}
		</>


	);
};

export default NotificationAdmin;
