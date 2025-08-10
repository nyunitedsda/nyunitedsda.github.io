import type { Meta, StoryObj } from "@storybook/react-vite";
import { smallLogo } from "@/assets";
import MinistryCard from "./MinistryCard";
import type { MinistryCardProps } from "./types";

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
		header: {
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
		header: {
			title: "Card with Actions",
			subheader: "Has Some Actions",
		},
		content: "🚀This card has an avatar.",
		image: {
			src: smallLogo,
		},
	},
};

export const WithNoAction: Story = {
	args: {
		header: {
			title: "Card without Actions",
			subheader: "No Actions Provided",
		},
		content: "This card has no actions.",
	},
};
