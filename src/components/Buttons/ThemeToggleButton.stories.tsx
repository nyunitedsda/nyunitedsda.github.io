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
	parameters: {
		docs: {
			description: {
				component:
					"Button to toggle between light and dark themes. The button can be expanded to show additional options.",
			},
		},
	},
	args: {
		expanded: false,
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"A basic theme toggle button that switches between light and dark modes.",
			},
		},
	},
};

export const Expanded: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"An expanded version of the theme toggle button that shows additional options.",
			},
		},
	},
	args: {
		expanded: true,
	},
};
