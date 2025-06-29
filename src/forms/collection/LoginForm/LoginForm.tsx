import Stack from "@mui/material/Stack";
import { useCallback, useMemo, type FC } from "react";
import type { UserType } from "../../../api/request/types";
import FormContainer from "../../FormBuilder/FormContainer";
import InputField from "../../Input/FormField";
import {
  configurePasswordInput,
  configureUsernameInput,
} from "../commonInputs";
import { loginSchema } from "./schema";

const REMEMBER_ME = "Remember me";
const SIGN_IN = "Sign In";
const DEFAULT_VALUES: Partial<UserType> = {
	username: "",
	password: "",
	remember_me: false,
};

const LoginForm: FC = () => {
	const { passwordProps, usernameProps } = useMemo(
		() => ({
			passwordProps: configurePasswordInput(),
			usernameProps: configureUsernameInput(),
		}),
		[],
	);

	const _handleSubmit = useCallback(() => {
		// TODO: Implement form submission logic
		// Handle form submission logic here for login or registration
		// This could involve calling an API, updating state, etc.
	}, []);

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
          sx={{ '& .MuiFormControlLabel-root': { 
            color: "text.primary",
          }
         }}
				/>
			</Stack>
		</FormContainer>
	);
};

export default LoginForm;
