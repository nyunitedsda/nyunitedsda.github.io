import type { FC } from "react";
import type { UserType } from "../../../api/request/types";
import EntityManager from "../../../components/EntityManager";
import UserEditor from "../../../forms/collection/UserEditor/UserEditor";
import DonationItem from "../../Donations/components/DonationItem";

const USER_SUBHEADER = "Manage system users and their permissions";
const DELETE_ITEM_TITLE = "Delete User";
const DELETE_CONFIRMATION_TEXT =
	"Are you sure you want to delete this user? This action cannot be undone.";
const EMPTY_USERS_TEXT = "No users available.";

// Wrapper component to handle type compatibility
const WrappedUserEditor = ({
	open,
	entity,
	onClose,
	onSuccess,
}: {
	open: boolean;
	entity?: Partial<UserType>;
	onClose: () => void;
	onSuccess?: (data?: UserType) => void;
}) => (
	<UserEditor
		open={open}
		entity={entity as UserType}
		onClose={onClose}
		onSuccess={onSuccess ? () => onSuccess() : undefined}
	/>
);

const UserManagement: FC = () => {
	return (
		<EntityManager<UserType>
			entityName="users"
			queryKey="admin-users"
			title=""
			subtitle={USER_SUBHEADER}
			emptyText={EMPTY_USERS_TEXT}
			deleteConfirmation={{
				title: DELETE_ITEM_TITLE,
				message: DELETE_CONFIRMATION_TEXT,
			}}
			ItemComponent={DonationItem}
			EditorComponent={WrappedUserEditor}
			getItemTitle={(user: UserType) =>
				user?.email as string
			}
			getItemSubtitle={(user: UserType) =>
				`${user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'No name'} - ${user.role}` as string
			}
			createNewEntity={() => ({
				email: "",
				firstName: "",
				lastName: "",
				role: "guest",
				emailVerified: false,
			})}
			successMessages={{
				save: "User saved successfully",
				delete: "User deleted successfully",
			}}
		/>
	);
};

export default UserManagement;
