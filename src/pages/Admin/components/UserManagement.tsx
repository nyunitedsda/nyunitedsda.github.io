import {
	DeleteOutlined,
	Edit,
	KeyOutlined,
	MoreVertOutlined,
} from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import { getAllUsers } from "../../../api/request/authAndUserRequest";
import type { UserDT } from "../../../api/request/databaseTypes";
import DataTable from "../../../components/DataTable/DataTable";
import type { GenericType } from "../../../components/DataTable/types";
import RingLoader from "../../../components/Loaders/RingLoader";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import PasswordEditor from "../../../forms/collection/PasswordEditor/PasswordEditor";
import UserEditor from "../../../forms/collection/UserEditor";
import { useDeleteUser } from "../../../hooks/auth/useAuthAPI";
import usePermission from "../../../hooks/auth/usePermission";
import useToken from "../../../hooks/auth/useToken";
import { initialUser } from "../../../test/mock_data";
import { createAuthConfig } from "../../../utils/authUtils";
import ADMIN_GENERAL_CONSTANTS from "../constants/general";
import userColumns from "../constants/userColumns";

const { USER_SUBHEADER: SUBHEADER } = ADMIN_GENERAL_CONSTANTS;

const UserManagement: FC = () => {
	const { accessToken } = useToken();
	const deleteUser = useDeleteUser();
	const { canCreate, canEdit, canDelete } = usePermission("users");
	useSnackbar();

	const [userData, setUserData] = useState<Partial<UserDT>[]>([]);
	const [createUserOpen, setCreateUserOpen] = useState<Partial<UserDT> | null>(
		null,
	);
	const [changePasswordOpen, setChangePasswordOpen] =
		useState<Partial<UserDT> | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState<{
		data: UserDT;
		anchorEl: HTMLElement;
	} | null>(null);

	const {
		data: queryData,
		refetch,
		isLoading,
	} = useQuery<UserDT[] | undefined>({
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
		(data: UserDT) => {
			const { id } = data;
			deleteUser.mutateAsync(id).then(() => refetch());
		},
		[deleteUser, refetch],
	);

	const handleSuccess = useCallback(() => {
		setChangePasswordOpen(null);
	}, []);

	const menuOptions = useMemo(
		() => [
			{
				title: "Edit User",
				onClick: setCreateUserOpen,
				disabled: !canEdit,
				icon: <Edit color="primary" />,
			},
			{
				title: "Change User Password",
				onClick: setChangePasswordOpen,
				disabled: !canEdit,
				icon: <KeyOutlined color="warning" />,
			},
			{
				title: "Delete User",
				onClick: _handleDeleteUser,
				disabled: !canDelete,
				icon: <DeleteOutlined color="error" />,
			},
		],
		[canEdit, canDelete],
	);

	return (
		<>
			<PageTitle
				title=""
				subtitle={SUBHEADER}
				handleClick={
					canCreate ? () => setCreateUserOpen(initialUser) : undefined
				}
			/>

			{isLoading ? (
				<RingLoader />
			) : (
				<DataTable
					data={userData as (UserDT extends GenericType ? UserDT : never)[]}
					columns={userColumns}
					renderAction={(data) => {
						return (
							<IconButton
								size="small"
								title="View User"
								onClick={(e) =>
									setIsMenuOpen({
										data: data as unknown as UserDT,
										anchorEl: e.currentTarget,
									})
								}
							>
								<MoreVertOutlined color="primary" />
							</IconButton>
						);
					}}
				/>
			)}

			{createUserOpen && (
				<UserEditor
					open={!!createUserOpen}
					data={createUserOpen as UserDT}
					onClose={() => setCreateUserOpen(null)}
					onSuccess={() => {
						refetch();
						setCreateUserOpen(null);
					}}
				/>
			)}
			{changePasswordOpen && (
				<PasswordEditor
					open={!!changePasswordOpen}
					data={changePasswordOpen as UserDT}
					onClose={() => setChangePasswordOpen(null)}
					onSuccess={handleSuccess}
					type="admin"
					confirmOnSave={true}
				/>
			)}
			{isMenuOpen && (
				<Menu
					open={!!isMenuOpen}
					anchorEl={isMenuOpen.anchorEl}
					onClose={() => setIsMenuOpen(null)}
				>
					{menuOptions.map((option, index) => (
						<MenuItem
							key={`menu-option-${index}`}
							onClick={() => {
								option.onClick(isMenuOpen.data);
								setIsMenuOpen(null);
							}}
							disabled={option.disabled}
							sx={{ gap: 1 }}
						>
							{option.icon}
							{option.title}
						</MenuItem>
					))}
				</Menu>
			)}
		</>
	);
};

export default UserManagement;
