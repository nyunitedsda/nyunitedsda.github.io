import type { FC } from "react";
import type { AnnouncementType } from "../../../api/request/types";
import EntityManager from "../../../components/EntityManager";
import AnnouncementEditor from "../../../forms/collection/AnnouncementEditor/AnnouncementEditor";
import DonationItem from "../../Donations/components/DonationItem";

const ANNOUNCEMENT_SUBHEADER = "Manage church announcements and events";
const DELETE_ITEM_TITLE = "Delete Announcement";
const DELETE_CONFIRMATION_TEXT =
	"Are you sure you want to delete this announcement? This action cannot be undone.";
const EMPTY_ANNOUNCEMENTS_TEXT = "No announcements available.";

// Wrapper component to handle type compatibility
const WrappedAnnouncementEditor = ({
	open,
	entity,
	onClose,
	onSuccess,
}: {
	open: boolean;
	entity?: Partial<AnnouncementType>;
	onClose: () => void;
	onSuccess?: (data?: AnnouncementType) => void;
}) => (
	<AnnouncementEditor
		open={open}
		entity={entity as AnnouncementType}
		onClose={onClose}
		onSuccess={onSuccess ? () => onSuccess() : undefined}
	/>
);

const AnnouncementManagement: FC = () => {
	return (
		<EntityManager<AnnouncementType>
			entityName="announcements"
			queryKey="admin-announcements"
			title=""
			subtitle={ANNOUNCEMENT_SUBHEADER}
			emptyText={EMPTY_ANNOUNCEMENTS_TEXT}
			deleteConfirmation={{
				title: DELETE_ITEM_TITLE,
				message: DELETE_CONFIRMATION_TEXT,
			}}
			ItemComponent={DonationItem}
			EditorComponent={WrappedAnnouncementEditor}
			getItemTitle={(announcement: AnnouncementType) =>
				announcement?.title as string
			}
			getItemSubtitle={(announcement: AnnouncementType) =>
				announcement.type as string
			}
			createNewEntity={() => ({
				title: "",
				type: "event",
				description: "",
				recurring: false,
				date_format: "MM/DD/YYYY",
				author_id: 1
			})}
			successMessages={{
				save: "Announcement saved successfully",
				delete: "Announcement deleted successfully",
			}}
		/>
	);
};

export default AnnouncementManagement;
