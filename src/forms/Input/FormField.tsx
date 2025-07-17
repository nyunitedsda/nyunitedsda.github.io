import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useField } from "formik";
import { type FC, useMemo } from "react";
import SelectField from "./SelectField";
import type { InputFieldProps } from "./types";

const InputField: FC<InputFieldProps> = ({
	dependencies,
	name,
	label,
	type = "text",
	fieldType,
	...props
}) => {
	const [field, meta] = useField(name);

	const errorText = useMemo(
		() => (meta.error && meta.touched ? meta.error : ""),
		[meta.error, meta.touched],
	);

	const isDisabled = useMemo(() => {
		if (!dependencies || dependencies.length === 0) return false;
		if (typeof field.value !== "object" || field.value === null) return true;
		return dependencies.some((dep) => !field.value[dep]);
	}, [dependencies, field.value]);

	switch (fieldType) {
		case "text":
			return (
				<TextField
					{...field}
					{...props}
					label={label}
					disabled={props.disabled || isDisabled}
					type={type}
					error={!!errorText}
					helperText={errorText}
					fullWidth
					margin="normal"
				/>
			);

		case "select":
			return (
				<SelectField
					{...field}
					{...props}
					label={label}
					disabled={props.disabled || isDisabled}
					error={errorText}
					items={props.items || []}
					valueResolver={
						props.valueResolver ||
						((item: { value: number | string }) => item.value)
					}
					renderItemLabel={
						(props.renderItemLabel as (item: {
							value: string | number;
						}) => string) ||
						((item: { value: string | number }) => String(item.value))
					}
				/>
			);

		case "checkbox":
			return (
				<FormControlLabel
					{...field}
					{...props}
					disabled={props.disabled || isDisabled}
					control={<Checkbox />}
					label={label}
				/>
			);
		case "datetime-local":
			return (
				<TextField
					{...field}
					{...props}
					label={label}
					type="datetime-local"
					error={!!errorText}
					disabled={props.disabled || isDisabled}
					helperText={errorText}
					fullWidth
					margin="normal"
				/>
			);

		default:
			return (
				<TextField
					{...field}
					{...props}
					label={label}
					type={type}
					error={!!errorText}
					disabled={props.disabled || isDisabled}
					helperText={errorText}
					fullWidth
					margin="normal"
				/>
			);
	}
};

export default InputField;
