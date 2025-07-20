import { useQuery } from "@tanstack/react-query";
import { type FC, useCallback, useEffect, useState } from "react";
import { getAllUsers } from "../../../api/request/authAndUserRequest";
import type { UserType } from "../../../api/request/types";
import DataTable from "../../../components/DataTable/DataTable";
import RingLoader from "../../../components/Loaders/RingLoader";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import UserEditor from "../../../forms/collection/UserEditor";
import { useDeleteUser } from "../../../hooks/auth/useAuthAPI";
import useToken from "../../../hooks/auth/useToken";
import { initialValues } from "../../../test/mock_data/users";
import { createAuthConfig } from "../../../utils/authUtils";
import userColumns from "../constants/userColumns";

const USER_SUBHEADER = "Manage system users and their permissions";

const UserManagement: FC = () => {
	const [userData, setUserData] = useState<Partial<UserType>[]>([]);
	const [createUserOpen, setCreateUserOpen] =
		useState<Partial<UserType> | null>(null);
	const { accessToken } = useToken();
	const deleteUser = useDeleteUser();

	const {
		data: queryData,
		refetch,
		isLoading,
	} = useQuery<UserType[] | undefined>({
		queryKey: ["users"],
		queryFn: () => getAllUsers(createAuthConfig(accessToken)),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		enabled: !!accessToken,
	});

	useEffect(() => {
		if (queryData) {
			setUserData(queryData);
		}
	}, [queryData]);

	console.log("userData: ", userData);

	const _handleDeleteUser = useCallback(async (id: number) => {
		await deleteUser.mutateAsync(id).then(() => refetch());
	}, []);

	return (
		<>
			<PageTitle
				title=""
				subtitle={USER_SUBHEADER}
				handleClick={() => setCreateUserOpen(initialValues)}
			/>

			{!isLoading ? (
				<DataTable
					data={userData}
					columns={userColumns}
					onEdit={(d) => setCreateUserOpen(d)}
					onDelete={(d) => _handleDeleteUser(d?.id as number)}
				/>
			) : (
				<RingLoader />
			)}

			{createUserOpen && (
				<UserEditor
					open={!!createUserOpen}
					data={createUserOpen as UserType}
					onClose={() => setCreateUserOpen(null)}
					onSuccess={() => {
						refetch();
						setCreateUserOpen(null);
					}}
				/>
			)}
		</>
	);
};

export default UserManagement;
