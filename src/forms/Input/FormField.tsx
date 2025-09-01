import {
	SelectField,
	type InputFieldProps,
	type SelectFieldProps,
} from "@/forms";
import type { InputProps } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel, {
	type FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { useField, useFormikContext } from "formik";
import { useCallback, useMemo } from "react";

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

	// biome-ignore lint/correctness/useExhaustiveDependencies(props): suppress dependency props
	const memoProps = useMemo(() => {
		return props;
	}, []);

	const renderInputField = useCallback(() => {
		const { fieldType = "text", type, required = false, ...rest } = memoProps;
		const { error, touched } = meta;
		const errorText = error && touched ? error : "";

		const commonProps = {
			type,
			error: !!errorText,
			helperText: errorText,
			fullWidth: true,
			margin: "normal" as InputProps["margin"],
			required,
		};

		switch (fieldType) {
			case "select":
				return (
					<SelectField<T>
						{...field}
						{...rest}
						error={error}
						items={memoProps.items}
						valueResolver={
							memoProps.valueResolver as SelectFieldProps<T>["valueResolver"]
						}
						renderItemLabel={
							memoProps.renderItemLabel as SelectFieldProps<T>["renderItemLabel"]
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
							{...(rest as FormControlLabelProps)}
							control={<Checkbox />}
							checked={field.value}
							onChange={field.onChange}
							onBlur={field.onBlur}
							name={field.name}
							label={memoProps?.label || ""}
						/>
						{errorText && <FormHelperText>{errorText}</FormHelperText>}
					</FormControl>
				);
			case "datetime-local":
				return (
					<TextField
						{...field}
						{...rest}
						{...commonProps}
						type="datetime-local"
						sx={{
							'& input[type="month"]::-webkit-calendar-picker-indicator': {
								filter: `invert(1) brightness(0.5)`,
							},
						}}
					/>
				);

			default:
				return <TextField {...field} {...rest} {...commonProps} />;
		}
	}, [field, meta, memoProps]);

	return <>{isValidConditions && renderInputField()}</>;
};

export default InputField;
