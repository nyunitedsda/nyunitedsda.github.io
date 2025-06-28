import type { FC } from "react";
import type { NotificationType } from "../../../api/request/types";
import EntityManager from "../../../components/EntityManager";
import NotificationEditor from "../../../forms/collection/NotificationEditor/NotificationEditor";
import DonationItem from "../../Donations/components/DonationItem";

const NOTIFICATION_SUBHEADER = "Manage application notifications";
const DELETE_ITEM_TITLE = "Delete Notification";
const DELETE_CONFIRMATION_TEXT =
	"Are you sure you want to delete this notification? This action cannot be undone.";
const EMPTY_NOTIFICATIONS_TEXT = "No notifications available.";

// Wrapper component to handle type compatibility
const WrappedNotificationEditor = ({
	open,
	entity,
	onClose,
	onSuccess,
}: {
	open: boolean;
	entity?: Partial<NotificationType>;
	onClose: () => void;
	onSuccess?: (data?: NotificationType) => void;
}) => (
	<NotificationEditor
		open={open}
		entity={entity}
		onClose={onClose}
		onSuccess={onSuccess ? () => onSuccess() : undefined}
	/>
);

const NotificationAdmin: FC = () => {
	return (
		<EntityManager<NotificationType>
			entityName="notifications"
			queryKey="admin-notifications"
			title=""
			subtitle={NOTIFICATION_SUBHEADER}
			emptyText={EMPTY_NOTIFICATIONS_TEXT}
			deleteConfirmation={{
				title: DELETE_ITEM_TITLE,
				message: DELETE_CONFIRMATION_TEXT,
			}}
			ItemComponent={DonationItem}
			EditorComponent={WrappedNotificationEditor}
			getItemTitle={(notification: NotificationType) =>
				notification?.title as string
			}
			getItemSubtitle={(notification: NotificationType) =>
				notification.message as string
			}
			createNewEntity={() => ({ title: "", message: "" })}
			successMessages={{
				save: "Notification saved successfully",
				delete: "Notification deleted successfully",
			}}
		/>
	);
};

export default NotificationAdmin;
