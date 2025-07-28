import { useQuery } from "@tanstack/react-query";
import { type FC, useCallback, useEffect, useState } from "react";
import { getAllUsers } from "../../../api/request/authAndUserRequest";
import type { UserType } from "../../../api/request/types";
import DataTable from "../../../components/DataTable/DataTable";
import type { GenericType } from "../../../components/DataTable/types";
import RingLoader from "../../../components/Loaders/RingLoader";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import UserEditor from "../../../forms/collection/UserEditor";
import { useDeleteUser } from "../../../hooks/auth/useAuthAPI";
import usePermission from "../../../hooks/auth/usePermission";
import useToken from "../../../hooks/auth/useToken";
import { initialValues } from "../../../test/mock_data/users";
import { createAuthConfig } from "../../../utils/authUtils";
import ADMIN_GENERAL_CONSTANTS from "../constants/general";
import userColumns from "../constants/userColumns";

const { USER_SUBHEADER: SUBHEADER } = ADMIN_GENERAL_CONSTANTS;

const UserManagement: FC = () => {
	const { accessToken } = useToken();
	const deleteUser = useDeleteUser();
	const { canCreate, canEdit, canDelete } = usePermission("users");

	const [userData, setUserData] = useState<Partial<UserType>[]>([]);
	const [createUserOpen, setCreateUserOpen] =
		useState<Partial<UserType> | null>(null);

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

	const _handleDeleteUser = useCallback(
		(data: GenericType & { id: number }) => {
			const { id } = data;
			deleteUser.mutateAsync(id).then(() => refetch());
		},
		[],
	);

	return (
		<>
			<PageTitle
				title=""
				subtitle={SUBHEADER}
				handleClick={
					canCreate ? () => setCreateUserOpen(initialValues) : undefined
				}
			/>

			{!isLoading ? (
				<DataTable
					data={userData}
					columns={userColumns}
					onEdit={canEdit ? setCreateUserOpen : undefined}
					onDelete={canDelete ? _handleDeleteUser : undefined}
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
