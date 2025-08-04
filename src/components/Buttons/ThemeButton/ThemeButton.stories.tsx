// biome-ignore lint/nursery/noUnresolvedImports: Storybook types are intentionally imported from @storybook/react-vite
import type { Meta, StoryObj } from "@storybook/react-vite";
import ThemeButton from "./ThemeButton";

const meta: Meta<typeof ThemeButton> = {
	title: "Components/Buttons/ThemeButton",
	component: ThemeButton,
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
