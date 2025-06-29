import Stack from "@mui/material/Stack";
import { type FC, useCallback, useMemo } from "react";
import FormContainer from "../../FormBuilder/FormContainer";
import InputField from "../../Input/FormField";
import {
	configurePasswordInput,
	configureUsernameInput,
} from "../commonInputs";
import { registerSchema } from "./schema";
import type { UserAccessFormProps } from "./types";

const initialRegisterValues = {
	id: undefined,
	username: "",
	password: "",
	confirmPassword: "",
	acceptTerms: false,
};

const CONFIRM_PASSWORD = "Confirm Password";
const REGISTER = "Register";
const ACCEPT_TERMS = "I accept the terms and conditions";

const RegisterForm: FC<UserAccessFormProps> = () => {
	const {
		buttonText,
		confirmPasswordProps,
		passwordProps,
		usernameProps,
		initialValues,
		validationSchema,
	} = useMemo(
		() => ({
			buttonText: REGISTER,
			initialValues: initialRegisterValues,
			validationSchema: registerSchema,
			passwordProps: configurePasswordInput(),
			usernameProps: configureUsernameInput(),
			confirmPasswordProps: configurePasswordInput({
				name: "confirmPassword",
				label: CONFIRM_PASSWORD,
			}),
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
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={_handleSubmit}
			submitButtonText={buttonText}
		>
			<Stack spacing={3}>
				<InputField {...usernameProps} />

				<InputField {...passwordProps} />
				<InputField {...confirmPasswordProps} />
				<InputField
					name="acceptTerms"
					label={ACCEPT_TERMS}
					fieldType="checkbox"
				/>
			</Stack>
		</FormContainer>
	);
};

export default RegisterForm;
