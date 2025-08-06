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
		const { fieldType, type } = props;
		const { error, touched } = meta;
		const errorText = error && touched ? error : "";

		switch (fieldType) {
			case "text":
				return (
					<TextField
						{...field}
						{...props}
						type={type ?? undefined}
						error={!!error}
						helperText={errorText}
						fullWidth
						margin="normal"
					/>
				);
			case "select":
				return (
					<SelectField<T>
						{...field}
						{...props}
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
					/>
				);
			case "checkbox":
				return (
					<FormControl
						error={!!errorText}
						component="fieldset"
						variant="standard"
					>
						<FormControlLabel
							control={<Checkbox />}
							checked={field.value}
							onChange={field.onChange}
							onBlur={field.onBlur}
							name={field.name}
							label={(props as unknown as FormControlLabelProps)?.label || ""}
							{...(props as Omit<
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
						{...props}
						type="datetime-local"
						error={!!errorText}
						helperText={errorText}
						fullWidth
						margin="normal"
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
						{...props}
						type={type ?? undefined}
						error={!!errorText}
						helperText={errorText}
						fullWidth
						margin="normal"
					/>
				);
		}
	}, [field, props, meta]);

	return <>{isValidConditions && renderInputField()}</>;
};

export default InputField;
