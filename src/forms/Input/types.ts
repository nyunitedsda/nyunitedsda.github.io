import type { SelectProps } from "@mui/material/Select";
import type { SxProps, Theme } from "@mui/material/styles";
import type { DateTimePickerProps } from "@mui/x-date-pickers";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import type { Dayjs } from "dayjs";
import type { FieldHelperProps, FieldInputProps, FieldMetaProps } from "formik";
import type { ReactNode } from "react";

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

export type InputFieldProps<
	T extends Record<string, string | number | boolean>,
	S extends Record<string, string | number | boolean | Dayjs>,
> = {
	validateFieldCondition?: (data: S) => boolean;
	name: string;
	label: string;
	type?: string;
	fieldType?: FormFieldType;
	defaultValue?: string | number | boolean | Dayjs | PickerValue;
	placeholder?: string;
	multiline?: boolean;
	required?: boolean;
	rows?: number;
	minRows?: number;
	maxRows?: number;
	sx?: SxProps<Theme>;
	items?: T[]; // For select fields, the items to display
	valueResolver?: (item: T) => string | number; // Function to resolve the value for select options
	renderItemLabel?: (item: T) => string | ReactNode; // Function to render the label
};

export interface SelectFieldProps<T> extends Omit<SelectProps, "error"> {
	items?: T[];
	label: string;
	error?: string;
	required?: boolean;
	valueResolver: (item: T) => string | number;
	renderItemLabel: (item: T) => string;
}

export type PickerType = "DateTime" | "Time" | "Date";

export type DTPickerProps = DateTimePickerProps & { type: PickerType };