import type { FC } from "react";
import type { ContactInfoType } from "../../../api/request/types";
import EntityManager from "../../../components/EntityManager";
import ContactEditor from "../../../forms/collection/ContactEditor/ContactEditor";
import DonationItem from "../../Donations/components/DonationItem";

const CONTACT_SUBHEADER = "Manage church contact information";
const DELETE_ITEM_TITLE = "Delete Contact";
const DELETE_CONFIRMATION_TEXT =
	"Are you sure you want to delete this contact? This action cannot be undone.";
const EMPTY_CONTACTS_TEXT = "No contact information available.";

// Wrapper component to handle type compatibility
const WrappedContactEditor = ({
	open,
	entity,
	onClose,
	onSuccess,
}: {
	open: boolean;
	entity?: Partial<ContactInfoType>;
	onClose: () => void;
	onSuccess?: (data?: ContactInfoType) => void;
}) => (
	<ContactEditor
		open={open}
		entity={entity as ContactInfoType}
		onClose={onClose}
		onSuccess={onSuccess ? () => onSuccess() : undefined}
	/>
);

const ContactManagement: FC = () => {
	return (
		<EntityManager<ContactInfoType>
			entityName="contacts"
			queryKey="admin-contacts"
			title=""
			subtitle={CONTACT_SUBHEADER}
			emptyText={EMPTY_CONTACTS_TEXT}
			deleteConfirmation={{
				title: DELETE_ITEM_TITLE,
				message: DELETE_CONFIRMATION_TEXT,
			}}
			ItemComponent={DonationItem}
			EditorComponent={WrappedContactEditor}
			getItemTitle={(contact: ContactInfoType) =>
				contact?.email as string
			}
			getItemSubtitle={(contact: ContactInfoType) =>
				`${contact.street}, ${contact.city}, ${contact.zip_code}` as string
			}
			createNewEntity={() => ({
				email: "",
				phone: "",
				street: "",
				city: "",
				zip_code: "",
				country: "",
				mail_address: "",
				mailing_recipient: "",
			})}
			successMessages={{
				save: "Contact information saved successfully",
				delete: "Contact information deleted successfully",
			}}
		/>
	);
};

export default ContactManagement;
