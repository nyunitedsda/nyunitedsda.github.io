import { LockOutlined, UserOutlined } from "@ant-design/icons";
import type { FormFieldType } from "@forms/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { Skeleton } from "antd";
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
				<Suspense fallback={<Skeleton.Avatar />}>
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
				<Suspense fallback={<Skeleton.Avatar />}>
					<UserOutlined color="primary" />
				</Suspense>
			</InputAdornment>
		),
	},
});
