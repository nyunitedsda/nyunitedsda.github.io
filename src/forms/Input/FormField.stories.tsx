import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, Formik } from "formik";
import InputField from "./FormField";
import type { InputFieldProps } from "./types";

// Sample select options
type Option = { id: number; name: string; value: string };
const options: Option[] = [
	{ id: 1, name: "Option One", value: "one" },
	{ id: 2, name: "Option Two", value: "two" },
];
// Helper for Formik wrapper
type FormValues = {
	text: string;
	select: string;
	checkbox: boolean;
	datetime: string;
};

const initialValues: FormValues = {
	text: "",
	select: "one",
	checkbox: false,
	datetime: "2023-01-01T12:00",
};

const meta: Meta<InputFieldProps<Option, FormValues>> = {
	title: "Forms/FormFields",
	component: InputField,
	tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<InputFieldProps<Option, FormValues>>;

/**
 * Basic text field
 */
export const TextField: Story = {
	render: () => (
		<Formik initialValues={initialValues} onSubmit={() => {}}>
			<Form>
				<InputField<FormValues, FormValues>
					name="text"
					label="Text Field"
					fieldType="text"
					placeholder="Enter text"
				/>
			</Form>
		</Formik>
	),
};

/**
 * Select field with options
 */
export const SelectFieldStory: Story = {
	render: () => (
		<Formik initialValues={initialValues} onSubmit={() => {}}>
			<Form>
				<InputField<Option, FormValues>
					name="select"
					label="Select Field"
					fieldType="select"
					items={options}
					valueResolver={(item) => item.value}
					renderItemLabel={(item) => item.name}
				/>
			</Form>
		</Formik>
	),
};

/**
 * Checkbox field
 */
export const CheckboxField: Story = {
	render: () => (
		<Formik initialValues={initialValues} onSubmit={() => {}}>
			<Form>
				<InputField<FormValues, FormValues>
					name="checkbox"
					label="Checkbox Field"
					fieldType="checkbox"
				/>
			</Form>
		</Formik>
	),
};

/**
 * Datetime-local field
 */
export const DateTimeField: Story = {
	render: () => (
		<Formik initialValues={initialValues} onSubmit={() => {}}>
			<Form>
				<InputField<FormValues, FormValues>
					name="datetime"
					label="DateTime Field"
					fieldType="datetime-local"
				/>
			</Form>
		</Formik>
	),
};

/**
 * Edge case: Select field with no options
 */
export const SelectNoOptions: Story = {
	render: () => (
		<Formik initialValues={initialValues} onSubmit={() => {}}>
			<Form>
				<InputField<Option, FormValues>
					name="select"
					label="No Options"
					fieldType="select"
					items={[]}
					valueResolver={(item) => item.value}
					renderItemLabel={(item) => item.name}
				/>
			</Form>
		</Formik>
	),
};

/**
 * Edge case: Checkbox with error
 */
export const CheckboxWithError: Story = {
	render: () => (
		<Formik
			initialValues={{ ...initialValues, checkbox: false }}
			validate={(values) => ({
				checkbox: values.checkbox ? undefined : "Must be checked",
			})}
			onSubmit={() => {}}
		>
			<Form>
				<InputField<FormValues, FormValues>
					name="checkbox"
					label="Checkbox Field"
					fieldType="checkbox"
				/>
			</Form>
		</Formik>
	),
};

/**
 * Edge case: Conditional field rendering
 * Field only renders if another field is true
 */
export const ConditionalField: Story = {
	render: () => (
		<Formik initialValues={initialValues} onSubmit={() => {}}>
			<Form>
				<InputField<FormValues, FormValues>
					name="checkbox"
					label="Show Text Field"
					fieldType="checkbox"
				/>
				<InputField<FormValues, FormValues>
					name="text"
					label="Conditionally Rendered Text"
					fieldType="text"
					validateFieldCondition={(values) => values.checkbox}
				/>
			</Form>
		</Formik>
	),
};
