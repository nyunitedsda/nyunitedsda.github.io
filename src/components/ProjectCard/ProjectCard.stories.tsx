import ProjectCard from "@components/ProjectCard";
import Button from "@mui/material/Button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof ProjectCard> = {
	title: "Components/Card",
	component: ProjectCard,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A card component to display project details.",
			},
		},
		excludeProviders: ["All"],
	},
	argTypes: {
		header: {
			control: "object",
			description: "Header content of the card",
			defaultValue: {
				title: "Project Title",
				description: "Project Subtitle",
			},
		},
		content: {
			control: "text",
			description: "Main content of the card",
			defaultValue: "This is a sample project card content.",
		},
		actions: {
			control: "object",
			description: "Actions to display at the bottom of the card",
			defaultValue: <Button variant="contained">Action</Button>,
		},
	},
};

export default meta;

type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
	args: {
		header: {
			title: "Project Title",
			description: "Project Subtitle",
		},
		content: "This is a sample project card content.",
		actions: [<Button variant="contained">Action</Button>],
	},
};

export const WithMultipleActions: Story = {
	args: {
		header: {
			title: "Project with Actions",
			description: "Multiple actions available",
		},
		content: "This project card has multiple actions.",
		actions: (
			[<Button variant="contained" color="primary">
				Primary
			</Button>,
			<Button variant="outlined" color="secondary">
				Secondary
			</Button>]

		),
	},
};

export const NoActions: Story = {
	args: {
		header: {
			title: "Project without Actions",
			description: "No actions available",
		},
		content: "This project card does not have any actions.",
		actions: undefined,
	},
};

export const NoContent: Story = {
	args: {
		header: {
			title: "Project with Header Only",
			description: "No content provided",
		},
		content: undefined,
		actions: [<Button variant="contained">Action</Button>],
	},
};

export const CustomHeader: Story = {
	args: {
		header: {
			title: "Custom Project",
			description: "With custom header props",
			avatar: (
				<span role="img" aria-label="rocket">
					🚀
				</span>
			),
		},
		content: "This project card has a custom header with an avatar.",
		actions: [<Button variant="outlined">Action</Button>],
	},
};

export const ActionHeader: Story = {
	args: {
		header: {
			title: "Custom Project",
			description: "With custom header props",

		},
		content: "This project card has a custom header with an avatar.",
		actions: [<Button variant="outlined">Action</Button>],
	},
};
