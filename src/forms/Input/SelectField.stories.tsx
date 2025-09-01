import { SelectField, type SelectFieldProps } from "@forms/Input";
import type { Meta, StoryObj } from "@storybook/react-vite";

// Sample data for select options
type Option = { id: number; name: string; value: string };
const options: Option[] = [
	{ id: 1, name: "Option One", value: "one" },
	{ id: 2, name: "Option Two", value: "two" },
	{ id: 3, name: "Option Three", value: "three" },
];

const meta: Meta<SelectFieldProps<Option>> = {
	title: "Forms/SelectField",
	component: SelectField,
	tags: ["autodocs"],
	argTypes: {
		error: { control: "text" },
		label: { control: "text" },
		items: { control: "object" },
	},
};
export default meta;
type Story = StoryObj<SelectFieldProps<Option>>;

/**
 * Basic usage with string values
 */
export const Basic: Story = {
	args: {
		label: "Basic Select",
		items: options,
		value: "one",
		valueResolver: (item: Option) => item.value,
		renderItemLabel: (item: Option) => item.name,
		onChange: () => {},
	},
};

/**
 * Edge case: No options available
 */
export const NoOptions: Story = {
	args: {
		label: "No Options",
		items: [],
		value: "",
		valueResolver: (item: Option) => item.value,
		renderItemLabel: (item: Option) => item.name,
		onChange: () => {},
	},
};

/**
 * Edge case: Duplicate values
 * Demonstrates how duplicate values are handled (should warn in dev, only first is selected)
 */
export const DuplicateValues: Story = {
	args: {
		label: "Duplicate Values",
		items: [
			{ id: 1, name: "Duplicate One", value: "dup" },
			{ id: 2, name: "Duplicate Two", value: "dup" },
		],
		value: "dup",
		valueResolver: (item: Option) => item.value,
		renderItemLabel: (item: Option) => item.name,
		onChange: () => {},
	},
};

/**
 * Edge case: Long labels and values
 */
export const LongLabels: Story = {
	args: {
		label: "Long Labels",
		items: [
			{
				id: 1,
				name: "This is a very long label that should be truncated or wrapped",
				value: "long1",
			},
			{
				id: 2,
				name: "Another extremely long label for testing UI overflow handling",
				value: "long2",
			},
		],
		value: "long1",
		valueResolver: (item: Option) => item.value,
		renderItemLabel: (item: Option) => item.name,
		onChange: () => {},
	},
};

/**
 * Edge case: Non-string values (numbers)
 */
export const NumberValues: Story = {
	args: {
		label: "Number Values",
		items: [
			{ id: 1, name: "One", value: "1" },
			{ id: 2, name: "Two", value: "2" },
		],
		value: "1",
		valueResolver: (item) => item.value,
		renderItemLabel: (item) => item.name,
		onChange: () => {},
	},
};

/**
 * Edge case: Custom renderItemLabel
 * Shows how to render complex labels (e.g., with icons or formatting)
 */
export const CustomLabel: Story = {
	args: {
		label: "Custom Label",
		items: options,
		value: "one",
		valueResolver: (item: Option) => item.value,
		// For edge case: custom label, but must return string for SelectField
		renderItemLabel: (item: Option) => `⭐ ${item.name}`,
		onChange: () => {},
	},
};
