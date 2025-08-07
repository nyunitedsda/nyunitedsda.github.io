import { type SxProps, type Theme, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useMemo } from "react";
import * as Yup from "yup";
import {
	changeMyPassword,
	changeUserPassword,
} from "../../../api/request/authAndUserRequest";
import ProjectModal from "../../../components/ProjectModal/ProjectModal";

import FormContainer from "../../FormBuilder/FormContainer";
import InputField from "../../Input/FormField";
import { configurePasswordInput } from "../commonInputs";
import { passwordSchema } from "../commonSchemas";
import type { PasswordEditorProps } from "./types";

const titleSx: SxProps<Theme> = {
	position: "sticky",
	top: 0,
	backgroundColor: "inherit",
	zIndex: 1,
};

const CURRENT_PASSWORD_FIELD_LABEL = "Current Password";
const NEW_PASSWORD_FIELD_LABEL = "New Password";
const CONFIRM_PASSWORD_FIELD_LABEL = "Confirm Password";
const TITLE = "Change User Password";

const initialValues: ChangePasswordFormData = {
	id: 0,
	old_Password: "",
	password: "",
	confirmPassword: "",
};

interface ChangePasswordFormData {
	id: number;
	old_Password: string;
	password: string;
	confirmPassword: string;
}
const changeUserPasswordSchema = Yup.object().shape({
	id: Yup.number().required(),
	password: passwordSchema,
	confirmPassword: Yup.string().oneOf(
		[Yup.ref("password"), undefined],
		"Passwords must match",
	),
});

const changeMyPasswordSchema = changeUserPasswordSchema.concat(
	Yup.object().shape({
		currentPassword: Yup.string().required("Current password is required"),
	}),
);

const PasswordEditor: FC<PasswordEditorProps> = ({
	data,
	onClose,
	onSuccess,
	open,
	type = "user",
	confirmOnSave = false,
}) => {
	const { enqueueSnackbar } = useSnackbar();

	const passwordProps = useMemo(() => {
		return configurePasswordInput();
	}, []);

	const currentPasswordProps = useMemo(() => {
		return {
			...passwordProps,
			name: "currentPassword",
			label: CURRENT_PASSWORD_FIELD_LABEL,
			placeholder: "Enter your current password",
		};
	}, [passwordProps]);

	const newPasswordProps = useMemo(() => {
		return {
			...passwordProps,
			name: "password",
			label: NEW_PASSWORD_FIELD_LABEL,
			placeholder: "Enter your new password",
		};
	}, [passwordProps]);

	const confirmPasswordProps = useMemo(() => {
		return {
			...passwordProps,
			name: "confirmPassword",
			label: CONFIRM_PASSWORD_FIELD_LABEL,
			placeholder: "Confirm your new password",
		};
	}, [passwordProps]);

	const _handleSubmit = useCallback(
		async (values: ChangePasswordFormData) => {
			try {
				if (type === "admin") {
					await changeUserPassword(values.id, values.password);

					enqueueSnackbar("Password changed successfully!", {
						variant: "success",
					});
				} else {
					await changeMyPassword({
						old_Password: values.old_Password,
						new_password: values.password,
						id: values.id,
					});

					enqueueSnackbar("Your password has been changed successfully!", {
						variant: "success",
					});
				}
				onSuccess?.();
				onClose();
			} catch (error) {
				enqueueSnackbar(
					error instanceof Error ? error.message : "Failed to change password",
					{ variant: "error" },
				);
			}
		},
		[enqueueSnackbar, onSuccess, onClose],
	);

	return (
		<ProjectModal open={open} onClose={onClose}>
			<Typography variant="h6" gutterBottom sx={titleSx}>
				{TITLE}
			</Typography>

			<FormContainer
				initialValues={{ ...initialValues, id: data?.id || 0 }}
				validationSchema={
					type === "admin" ? changeUserPasswordSchema : changeMyPasswordSchema
				}
				onSubmit={_handleSubmit}
				submitButtonText="Change Password"
				onCancel={onClose}
				confirmOnSave={confirmOnSave}
			>
				{type === "user" && <InputField {...currentPasswordProps} />}

				<InputField {...newPasswordProps} />

				<InputField {...confirmPasswordProps} />
			</FormContainer>
		</ProjectModal>
	);
};

export default PasswordEditor;
