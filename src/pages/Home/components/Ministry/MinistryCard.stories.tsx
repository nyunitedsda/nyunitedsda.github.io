import { MinistryCard, type MinistryCardProps } from "@pages/Home";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { smallLogo } from "@/assets";

const meta: Meta<MinistryCardProps> = {
	title: "Cards/Ministry",
	component: MinistryCard,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"A card component specifically designed to display ministry details.",
			},
		},
	},
	argTypes: {
		title: {
			control: "object",
			description: "Header content of the MinistryCard",
			defaultValue: {
				title: "Ministry Title",
				subheader: "Ministry Subtitle",
			},
		},
		content: {
			control: "text",
			description: "Main content of the card",
			defaultValue: "This is a sample ministry card content.",
		},
	},
};

export default meta;

type Story = StoryObj<MinistryCardProps>;

export const WithAction: Story = {
	args: {
		title: "Card with Actions",
		content: "🚀This card has an avatar.",
		image: {
			src: smallLogo,
		},
	},
};

export const WithNoAction: Story = {
	args: {
		title: "Card without Actions",
		content: "This card has no actions.",
	},
};
