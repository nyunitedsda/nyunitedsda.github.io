import type { LoginCredentials } from "@/api";
import {
	configurePasswordInput,
	configureUsernameInput,
	loginSchema,
} from "@forms/collection";
import { FormContainer } from "@forms/FormBuilder";
import { InputField } from "@forms/Input";
import { useAuthentication } from "@hooks/auth";
import { routePaths } from "@hooks/routes";
import Stack from "@mui/material/Stack";
import type { FormikHelpers } from "formik";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const REMEMBER_ME = "Remember me";
const SIGN_IN = "Sign In";
const DEFAULT_VALUES: LoginCredentials = {
	username: "",
	password: "",
	remember_me: false,
};

const LoginForm: FC = () => {
	const { login } = useAuthentication();
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const { passwordProps, usernameProps } = useMemo(
		() => ({
			passwordProps: configurePasswordInput(),
			usernameProps: configureUsernameInput(),
		}),
		[],
	);

	const _handleSubmit = useCallback(
		async (
			values: LoginCredentials,
			formikHelpers: FormikHelpers<LoginCredentials>,
		) => {
			await login(values)
				.then((data) => {
					navigate(routePaths.ADMIN_USERS, { replace: true });
					data?.message &&
						enqueueSnackbar(data?.message, {
							variant: "success",
						});
				})
				.catch((error) => {
					if (error) {
						console.error("Login error:", error.message || error);
						enqueueSnackbar(error.message || "Login failed", {
							variant: "error",
						});
						error.message &&
							formikHelpers.setErrors({
								username: error.message,
								password: error.message,
							});
					}
				})
				.finally(() => {
					formikHelpers.setSubmitting(false);
				});
		},
		[login, navigate, enqueueSnackbar],
	);

	return (
		<FormContainer
			initialValues={DEFAULT_VALUES}
			validationSchema={loginSchema}
			onSubmit={_handleSubmit}
			submitButtonText={SIGN_IN}
		>
			<Stack spacing={3}>
				<InputField {...usernameProps} />
				<InputField {...passwordProps} />
				<InputField
					name="remember_me"
					label={REMEMBER_ME}
					fieldType="checkbox"
					sx={{
						"& .MuiFormControlLabel-root": {
							color: "text.primary",
						},
					}}
				/>
			</Stack>
		</FormContainer>
	);
};

export default LoginForm;
