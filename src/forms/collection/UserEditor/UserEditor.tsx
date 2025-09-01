import type { RoleDT, UserDT } from "@/api";
import { getUserById, updateUser } from "@/api";
import ProjectModal from "@components/ProjectModal/ProjectModal";
import {
	configurePasswordInput,
	createUserSchema,
	updateUserSchema,
	type UserEditorProps,
} from "@forms/collection";
import FormContainer from "@forms/FormBuilder/FormContainer";
import { InputField } from "@forms/Input";
import { useEntityList } from "@hooks/api";
import { useRegister } from "@hooks/auth";
import { capitalize, Grid } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import type { FormikHelpers } from "formik";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useMemo } from "react";

const EMAIL_FIELD_LABEL = "Email Address";
const FIRST_NAME_FIELD_LABEL = "First Name";
const LAST_NAME_FIELD_LABEL = "Last Name";
const ROLE_FIELD_LABEL = "User Role";
const IS_ACTIVE_FIELD_LABEL = "Active";

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
	const { enqueueSnackbar } = useSnackbar();
	const registerUser = useRegister();
	const { data: roleData } = useEntityList<RoleDT>("roles");

	const { data: userData } = useQuery<UserDT>({
		queryKey: ["users", data?.id],
		queryFn: async () => await getUserById(data?.id),
		enabled: !!data?.id,
	});

	const title = useMemo(() => {
		return data?.id ? EDIT_TITLE : CREATE_TITLE;
	}, [data]);

	const passwordProps = useMemo(() => {
		return configurePasswordInput();
	}, []);

	const _handleEditSubmit = useCallback(
		(values: UserDT) => {
			const { id, last_login, ...rest } = values;

			updateUser(id, {
				...rest,
				last_login: last_login ? new Date(last_login) : undefined,
			}).then(() => {
				enqueueSnackbar("User updated successfully", { variant: "success" });
				onSuccess?.();
				onClose();
			});
		},
		[onClose, onSuccess, enqueueSnackbar],
	);

	const _handleCreateSubmit = useCallback(
		(values: UserDT) => {
			registerUser.mutateAsync(values).then(() => {
				onSuccess?.();
				onClose();
			});
		},
		[onClose, onSuccess, registerUser],
	);

	const _handleSubmit = useCallback(
		(values: UserDT, _helper: FormikHelpers<UserDT>) => {
			if (data?.id) {
				_handleEditSubmit(values);
			} else {
				_handleCreateSubmit(values);
			}
			_helper.setSubmitting(false);
			return Promise.resolve();
		},
		[data, _handleCreateSubmit, _handleEditSubmit],
	);

	return (
		<ProjectModal open={open} onClose={onClose}>
			<Typography variant="h6" gutterBottom sx={titleSx}>
				{title}
			</Typography>

			<FormContainer
				initialValues={data?.id ? (userData ?? {}) : data}
				validationSchema={data?.id ? updateUserSchema : createUserSchema}
				onSubmit={(val, helper) =>
					_handleSubmit(val as UserDT, helper as FormikHelpers<UserDT>)
				}
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
					name="first_name"
					label={FIRST_NAME_FIELD_LABEL}
					fieldType="text"
					placeholder="Enter first name (optional)"
				/>

				<InputField
					name="last_name"
					label={LAST_NAME_FIELD_LABEL}
					fieldType="text"
					placeholder="Enter last name (optional)"
				/>

				<InputField
					name="role_id"
					defaultValue=""
					label={ROLE_FIELD_LABEL}
					fieldType="select"
					items={(roleData ?? []) as (RoleDT & any)[]}
					renderItemLabel={({ name }) => capitalize(name)}
					valueResolver={(item) => item.id}
				/>
				<Grid container size={12} sx={{ p: 2, py: 0 }}>
					<Grid size={6}>
						<InputField
							defaultValue={true}
							fieldType="checkbox"
							label={IS_ACTIVE_FIELD_LABEL}
							name="is_active"
						/>
					</Grid>
					<Grid size={6}>
						<InputField
							name="remember_me"
							label="Remember Me"
							fieldType="checkbox"
						/>
					</Grid>
				</Grid>
			</FormContainer>
		</ProjectModal>
	);
};

export default UserEditor;
