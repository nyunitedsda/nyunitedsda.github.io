import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel, {
	type FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { useField, useFormikContext } from "formik";
import { useCallback, useMemo } from "react";
import SelectField from "./SelectField";
import type { InputFieldProps } from "./types";

const InputField = <
	T extends { [key: string]: string | number | boolean },
	S extends { [key: string]: string | number | boolean | Date },
>({
	validateFieldCondition,
	name,
	...props
}: InputFieldProps<T, S>) => {
	const [field, meta] = useField(name);
	const { values } = useFormikContext<S>();

	const isValidConditions = useMemo(() => {
		return validateFieldCondition?.(values) ?? true;
	}, [validateFieldCondition, values]);

	const renderInputField = useCallback(() => {
		// Always destructure fieldType out so it is not passed to DOM elements
		const { fieldType, type, required = false, ...rest } = props;
		const { error, touched } = meta;
		const errorText = error && touched ? error : "";

		switch (fieldType) {
			case "text":
				return (
					<TextField
						{...field}
						{...rest}
						type={type ?? undefined}
						error={!!error}
						helperText={errorText}
						fullWidth
						margin="normal"
						required={required}
					/>
				);
			case "select":
				return (
					<SelectField<T>
						{...field}
						{...rest}
						error={error}
						items={props?.items || []}
						label={(props?.label ?? "") as string}
						valueResolver={
							typeof props.valueResolver === "function"
								? props.valueResolver
								: (item) => String(item.value)
						}
						renderItemLabel={
							typeof props?.renderItemLabel === "function"
								? props?.renderItemLabel
								: (item) => String(item.value)
						}
						required={required}
					/>
				);
			case "checkbox":
				return (
					<FormControl
						error={!!errorText}
						component="fieldset"
						variant="standard"
						required={required}
					>
						<FormControlLabel
							control={<Checkbox />}
							checked={field.value}
							onChange={field.onChange}
							onBlur={field.onBlur}
							name={field.name}
							label={(props as unknown as FormControlLabelProps)?.label || ""}
							{...(rest as Omit<
								FormControlLabelProps,
								"control" | "checked" | "onChange" | "onBlur" | "name" | "label"
							>)}
						/>
						{errorText && <FormHelperText>{errorText}</FormHelperText>}
					</FormControl>
				);
			case "datetime-local":
				return (
					<TextField
						{...field}
						{...rest}
						type="datetime-local"
						error={!!errorText}
						helperText={errorText}
						fullWidth
						margin="normal"
						required={required}
						sx={{
							'& input[type="month"]::-webkit-calendar-picker-indicator': {
								filter: `invert(1) brightness(0.5)`,
							},
						}}
					/>
				);
			default:
				return (
					<TextField
						{...field}
						{...rest}
						type={type ?? undefined}
						error={!!errorText}
						helperText={errorText}
						fullWidth
						margin="normal"
						required={required}
					/>
				);
		}
	}, [field, props, meta]);

	return <>{isValidConditions && renderInputField()}</>;
};

export default InputField;
