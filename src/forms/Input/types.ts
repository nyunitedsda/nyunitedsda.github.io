export type FormFieldType =
	| "text"
	| "datetime-local"
	| "select"
	| "checkbox"
	| "radio";

export interface InputFieldProps {
	dependencies?: string[]; // Fields that this field depends on
	name: string;
	label: string;
	type?: string;
	fieldType: FormFieldType;
	multiline?: boolean;
	rows?: number;
	items?: any[]; // For select fields, the items to display
	valueResolver?: (item: any) => string | number; // Function to resolve the value for select options
	renderItemLabel?: (item: any) => string; // Function to render the label
	[x: string]: any;
}
