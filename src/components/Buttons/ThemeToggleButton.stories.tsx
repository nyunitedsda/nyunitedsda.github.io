import type { Meta, StoryObj } from "@storybook/react";
import ThemeToggleButton from "./ThemeToggleButton";

const meta: Meta<typeof ThemeToggleButton> = {
	title: "Components/Buttons/ThemeToggleButton",
	component: ThemeToggleButton,
	tags: ["autodocs"],
	argTypes: {
		expanded: {
			control: "boolean",
			description: "Whether the button is in expanded mode",
			defaultValue: false,
		},
	},
	args: {
		expanded: false,
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Expanded: Story = {
	args: {
		expanded: true,
	},
};
