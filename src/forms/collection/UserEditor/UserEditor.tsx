import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useEffect, useState } from "react";
import {
	getDatabaseList,
	updateUser,
} from "../../../api/request/commonQueries";
import type { UserRoleOption, UserType } from "../../../api/request/types";
import ProjectModal from "../../../components/ProjectModal/ProjectModal";
import FormContainer from "../../FormBuilder/FormContainer";
import { default as InputField } from "../../Input/FormField";
import userSchema from "./schema";

const EMAIL_FIELD_LABEL = "Email Address";
const FIRST_NAME_FIELD_LABEL = "First Name";
const LAST_NAME_FIELD_LABEL = "Last Name";
const ROLE_FIELD_LABEL = "User Role";
const EMAIL_VERIFIED_FIELD_LABEL = "Email Verified";

const titleSx: SxProps<Theme> = {
	position: "sticky",
	top: 0,
	backgroundColor: "inherit",
	zIndex: 1,
};

// const roleOptions: RoleOption[] = [
// 	{ id: 1, value: "guest", label: "Guest" },
// 	{ id: 2, value: "moderator", label: "Moderator" },
// 	{ id: 3, value: "admin", label: "Administrator" },
// ];

interface UserEditorProps {
	initialValues: UserType;
	open: boolean;
	onClose: () => void;
	onSuccess?: (data?: UserType) => void;
}
const TITLE = "Edit User";

const UserEditor: FC<UserEditorProps> = ({
	open,
	initialValues,
	onClose,
	onSuccess,
}) => {
	const { enqueueSnackbar } = useSnackbar();

	const [roles, setRoles] = useState<UserRoleOption[]>([]);

	useEffect(() => {
		getDatabaseList<UserRoleOption>("roles").then((data) => {
			if (data) {
				setRoles(data as unknown as UserRoleOption[]);
			}
		});
	}, []);

	const _handleSubmit = useCallback((values: UserType) => {
		const { id, ...rest } = values;
		updateUser(id, rest).then((result) => {
			if (!result) {
				enqueueSnackbar("Failed to update user", { variant: "error" });
				return;
			}
			// If onSuccess callback is provided, call it with the result

			if (onSuccess) {
				onSuccess(result);
				enqueueSnackbar("User updated successfully", { variant: "success" });
				onClose();
			}
		});
	}, []);

	return (
		<ProjectModal open={open} onClose={onClose}>
			<Typography variant="h6" gutterBottom sx={titleSx}>
				{TITLE}
			</Typography>

			<FormContainer
				initialValues={initialValues}
				validationSchema={userSchema}
				onSubmit={_handleSubmit}
				submitButtonText="Save"
				onCancel={onClose}
			>
				<InputField
					name="username"
					label="Username"
					fieldType="text"
					placeholder="Enter username"
				/>

				<InputField
					name="email"
					label={EMAIL_FIELD_LABEL}
					fieldType="text"
					type="email"
					placeholder="Enter email address"
				/>

				<InputField
					name="firstName"
					label={FIRST_NAME_FIELD_LABEL}
					fieldType="text"
					placeholder="Enter first name (optional)"
				/>

				<InputField
					name="lastName"
					label={LAST_NAME_FIELD_LABEL}
					fieldType="text"
					placeholder="Enter last name (optional)"
				/>

				<InputField
					name="role"
					label={ROLE_FIELD_LABEL}
					fieldType="select"
					items={roles ?? []}
					renderItemLabel={(item) => item.name}
					valueResolver={(item) => item.id}
				/>

				<InputField
					name="emailVerified"
					label={EMAIL_VERIFIED_FIELD_LABEL}
					fieldType="checkbox"
				/>
				<InputField
					name="remember_me"
					label="Remember Me"
					fieldType="checkbox"
					helperText="Enable 'Remember Me' functionality for this user"
				/>
			</FormContainer>
		</ProjectModal>
	);
};

export default UserEditor;
