import { type FC, useEffect, useState } from "react";
import { getAllUsers } from "../../../api/request/commonQueries";
import type { UserType } from "../../../api/request/types";
import { createAuthConfig } from "../../../utils/authUtils";

const USER_SUBHEADER = "Manage system users and their permissions";
const DELETE_ITEM_TITLE = "Delete User";
const DELETE_CONFIRMATION_TEXT =
	"Are you sure you want to delete this user? This action cannot be undone.";
const EMPTY_USERS_TEXT = "No users available.";

// Wrapper component to handle type compatibility
// const WrappedUserEditor = ({
// 	open,
// 	entity,
// 	onClose,
// 	onSuccess,
// }: {
// 	open: boolean;
// 	entity?: Partial<UserType>;
// 	onClose: () => void;
// 	onSuccess?: (data?: UserType) => void;
// }) => (
// 	<UserEditor
// 		open={open}
// 		entity={entity as UserType}
// 		onClose={onClose}
// 		onSuccess={onSuccess ? () => onSuccess() : undefined}
// 	/>
// );

const UserManagement: FC = () => {
	const [userData, setUserData] = useState<UserType[]>([]);

	useEffect(() => {
		const authConfig = createAuthConfig();

		console.log("authConfig: ", authConfig);
		getAllUsers(authConfig)
			.then((data) => {
				if (data) {
					setUserData(data as unknown as UserType[]);
				}
			})
			.catch((error) => {
				console.error("Failed to fetch users:", error);
			});
	}, []);

	console.log("userData: ", userData);

	return (
		// <EntityManager<UserType>
		// 	entityName="users"
		// 	queryKey="admin-users"
		// 	title=""
		// 	subtitle={USER_SUBHEADER}
		// 	emptyText={EMPTY_USERS_TEXT}
		// 	deleteConfirmation={{
		// 		title: DELETE_ITEM_TITLE,
		// 		message: DELETE_CONFIRMATION_TEXT,
		// 	}}
		// 	ItemComponent={DonationItem}
		// 	EditorComponent={WrappedUserEditor}
		// 	getItemTitle={(user: UserType) => user?.username as string}
		// 	getItemSubtitle={(user: UserType) =>
		// 		`${user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "No name"} - ${user.role}` as string
		// 	}
		// 	createNewEntity={() => ({
		// 		email: "",
		// 		firstName: "",
		// 		lastName: "",
		// 		role: "guest",
		// 		emailVerified: false,
		// 	})}
		// 	successMessages={{
		// 		save: "User saved successfully",
		// 		delete: "User deleted successfully",
		// 	}}
		// />
		<></>
	);
};

export default UserManagement;
