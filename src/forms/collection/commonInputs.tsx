import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { PlaceholderIcon } from "@components/Icons";
import type { FormFieldType } from "@forms/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { Suspense } from "react";


export const configurePasswordInput = ({
	name = "password",
	label = "Password",
} = {}) => ({
	name: name ?? "password",
	label: label ?? "Password",
	fieldType: "text" as FormFieldType,
	type: "password",
	sx: {
		"& .MuiInputBase-inputAdornedEnd": {
			color: "primary.contrastText",
		},
	},
	InputProps: {
		startAdornment: (
			<InputAdornment position="start">
				<Suspense fallback={<PlaceholderIcon />}>
					<LockOutlined color="primary" />
				</Suspense>
			</InputAdornment>
		),
	},
});

export const configureUsernameInput = () => ({
	name: "username",
	label: "Username",
	fieldType: "text" as FormFieldType,
	InputProps: {
		startAdornment: (
			<InputAdornment position="start">
				<Suspense fallback={<PlaceholderIcon />}>
					<UserOutlined color="primary" />
				</Suspense>
			</InputAdornment>
		),
	},
});
