import type { SelectProps } from "@mui/material/Select";
import type { SxProps, Theme } from "@mui/material/styles";
import type { FieldHelperProps, FieldInputProps, FieldMetaProps } from "formik";

export interface RenderFieldProps<T> {
	inputProps: FieldInputProps<T>;
	metaProps: FieldMetaProps<T>;
	helperProps: FieldHelperProps<T>;
	formValues: T;
}

export type FormFieldType =
	| "text"
	| "datetime-local"
	| "select"
	| "checkbox"
	| "radio";

export type InputFieldProps <
	T extends Record<string, string | number | boolean>,
	S extends Record<string, string | number | boolean | Date>,
> = {
	validateFieldCondition?: (data: S) => boolean;
	name: string;
	label: string;
	type?: string;
	fieldType: FormFieldType;
	defaultValue?: string | number | boolean;
	placeholder?: string;
	multiline?: boolean;
	required?: boolean;
	rows?: number;
	minRows?: number;
	maxRows?: number;
	sx?: SxProps<Theme>;
	items?: T[]; // For select fields, the items to display
	valueResolver?: (item: T) => string | number; // Function to resolve the value for select options
	renderItemLabel?: (item: T) => string; // Function to render the label
};

export interface SelectFieldProps<T> extends Omit<SelectProps, "error"> {
	items: T[];
	label: string;
	error?: string;
	required?: boolean;
	valueResolver: (item: T) => string | number;
	renderItemLabel: (item: T) => string;
}
