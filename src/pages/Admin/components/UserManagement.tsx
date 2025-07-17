import { type FC, useCallback, useEffect, useState } from "react";
import { deleteEntity } from "../../../api/request/commonMutations";
import { getAllUsers } from "../../../api/request/commonQueries";
import type { UserType } from "../../../api/request/types";
import DataTable from "../../../components/DataTable/DataTable";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import UserEditor from "../../../forms/collection/UserEditor";
import { initialValues } from "../../../test/mock_data/users";
import { createAuthConfig } from "../../../utils/authUtils";
import userColumns from "../constants/userColumns";

const USER_SUBHEADER = "Manage system users and their permissions";

const UserManagement: FC = () => {
	const [userData, setUserData] = useState<Partial<UserType>[]>([]);
	const [createUserOpen, setCreateUserOpen] =
		useState<Partial<UserType> | null>(null);

	useEffect(() => {
		const authConfig = createAuthConfig();

		getAllUsers(authConfig)
			.then((res) => {
				if (Array.isArray(res?.data)) {
					setUserData(res.data);
				} else {
					console.error("Unexpected response format:", res);
					setUserData([]);
				}
			})
			.catch((error) => {
				console.error("Failed to fetch users:", error);
				setUserData([]);
			});
	}, []);

	console.log("userData: ", userData);

	const _handleDeleteUser = useCallback((id: number) => {
		const authConfig = createAuthConfig();

		deleteEntity("users", id, authConfig)
			.then(() => {
				setUserData((prev) => prev.filter((user) => user?.id !== id));
			})
			.catch((error) => {
				console.error("Failed to delete user:", error);
			});
	}, []);

	return (
		<>
			<PageTitle
				title=""
				subtitle={USER_SUBHEADER}
				handleClick={() => setCreateUserOpen(initialValues)}
			/>

			<DataTable
				data={userData}
				columns={userColumns}
				onEdit={(d) => setCreateUserOpen(d)}
				onDelete={(d) => _handleDeleteUser(d?.id as number)}
				onView={(d) => setCreateUserOpen(d)}
			/>

			{createUserOpen && (
				<UserEditor
					open={!!createUserOpen}
					data={createUserOpen as UserType}
					onClose={() => setCreateUserOpen(null)}
				/>
			)}
		</>
	);
};

export default UserManagement;
