import { capitalize } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import {
	getDatabaseList,
	updateUser,
} from "../../../api/request/commonQueries";
import type { UserRoleOption, UserType } from "../../../api/request/types";
import ProjectModal from "../../../components/ProjectModal/ProjectModal";
import { useRegister } from "../../../hooks/auth";
import FormContainer from "../../FormBuilder/FormContainer";
import { default as InputField } from "../../Input/FormField";
import { configurePasswordInput } from "../commonInputs";
import userSchema from "./schema";
import type { UserEditorProps } from "./types";

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

const EDIT_TITLE = "Edit User";
const CREATE_TITLE = "Create New User";

const UserEditor: FC<UserEditorProps> = ({
	data,
	onClose,
	onSuccess,
	open,
}) => {
	useSnackbar();
	const registerUser = useRegister();

	const [roles, setRoles] = useState<UserRoleOption[]>([]);

	useEffect(() => {
		(async () => {
			const response = await getDatabaseList<UserRoleOption>("roles");
			if (response) {
				setRoles(response.data as unknown as UserRoleOption[]);
			}
		})();
	}, []);

	const title = useMemo(() => {
		return data?.id ? EDIT_TITLE : CREATE_TITLE;
	}, [data]);

	const passwordProps = useMemo(() => {
		return configurePasswordInput();
	}, []);

	const _handleEditSubmit = useCallback((values: UserType) => {
		const { id, ...rest } = values;

		updateUser(id, rest).then(() => {
			onSuccess?.();
			onClose();
		});
	}, []);

	const _handleCreateSubmit = useCallback((values: UserType) => {
		registerUser.mutateAsync(values).then(() => {
			onSuccess?.();
			onClose();
		});
	}, []);

	const _handleSubmit = useCallback(
		(values: UserType) => {
			if (data?.id) {
				_handleEditSubmit(values);
			} else {
				_handleCreateSubmit(values);
			}
		},
		[data],
	);

	return (
		<ProjectModal open={open} onClose={onClose}>
			<Typography variant="h6" gutterBottom sx={titleSx}>
				{title}
			</Typography>

			<FormContainer
				initialValues={data || {}}
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

				{!data?.id && <InputField {...passwordProps} />}

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
					defaultValue=""
					label={ROLE_FIELD_LABEL}
					fieldType="select"
					items={roles ?? []}
					renderItemLabel={(item) => capitalize(item.name)}
					valueResolver={(item) => item.name}
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
				/>
			</FormContainer>
		</ProjectModal>
	);
};

export default UserEditor;
