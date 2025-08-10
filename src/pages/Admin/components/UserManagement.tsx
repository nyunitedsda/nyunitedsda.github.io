import DataTable from "@components/DataTable";
import { PageTitle } from "@components/PageWrapper";
import { PasswordEditor, UserEditor } from "@forms/collection";
import { useDeleteUser, usePermission } from "@hooks/auth";
import {
	DeleteOutlined,
	Edit,
	KeyOutlined,
	MoreVertOutlined,
} from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { initialUser } from "@test/mock_data";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import type { UserDT } from "@/api";
import { getAllUsers } from "@/api";
import ADMIN_GENERAL_CONSTANTS from "../constants/general";
import userColumns from "../constants/userColumns";

const { USER_SUBHEADER: SUBHEADER } = ADMIN_GENERAL_CONSTANTS;

const UserManagement: FC = () => {
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
		queryFn: () => getAllUsers(),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
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
		[canEdit, canDelete, _handleDeleteUser],
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

			<DataTable
				isLoading={isLoading}
				data={userData as UserDT[]}
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
					{menuOptions.map((option) => (
						<MenuItem
							key={`menu-option-${option.title}`}
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
