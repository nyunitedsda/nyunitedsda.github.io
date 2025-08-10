import Stack from "@mui/material/Stack";
import { type FC, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import type { LoginCredentials } from "../../../api/request";
import { useAuthentication } from "../../../hooks/auth";
import FormContainer from "../../FormBuilder/FormContainer";
import InputField from "../../Input/FormField";
import {
	configurePasswordInput,
	configureUsernameInput,
} from "../commonInputs";
import { loginSchema } from "./schema";

const REMEMBER_ME = "Remember me";
const SIGN_IN = "Sign In";
const DEFAULT_VALUES: LoginCredentials & { id?: number } = {
	username: "",
	password: "",
	remember_me: false,
	id: undefined,
};

const LoginForm: FC = () => {
	const { login } = useAuthentication();
	const navigate = useNavigate();

	const { passwordProps, usernameProps } = useMemo(
		() => ({
			passwordProps: configurePasswordInput(),
			usernameProps: configureUsernameInput(),
		}),
		[],
	);

	const _handleSubmit = useCallback(
		async (values: LoginCredentials & { id?: number }) => {
			const { id, ...loginValues } = values;
			await login(loginValues);
			navigate("/admin/users");
		},
		[login, navigate],
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
