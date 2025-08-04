import CloseOutlined from "@mui/icons-material/CloseOutlined";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
// biome-ignore lint/nursery/noUnresolvedImports: Storybook types are intentionally imported from @storybook/react-vite
import type { Meta, StoryObj } from "@storybook/react-vite";
import ProjectCard from "./ProjectCard";

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
				subheader: "Project Subtitle",
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
			subheader: "Project Subtitle",
		},
		content: "This is a sample project card content.",
		actions: <Button variant="contained">Action</Button>,
	},
};

export const WithMultipleActions: Story = {
	args: {
		header: {
			title: "Project with Actions",
			subheader: "Multiple actions available",
		},
		content: "This project card has multiple actions.",
		actions: (
			<>
				<Button variant="contained" color="primary">
					Primary
				</Button>
				<Button variant="outlined" color="secondary">
					Secondary
				</Button>
			</>
		),
	},
};

export const NoActions: Story = {
	args: {
		header: {
			title: "Project without Actions",
			subheader: "No actions available",
		},
		content: "This project card does not have any actions.",
		actions: undefined,
	},
};

export const NoContent: Story = {
	args: {
		header: {
			title: "Project with Header Only",
			subheader: "No content provided",
		},
		content: undefined,
		actions: <Button variant="contained">Action</Button>,
	},
};

export const CustomHeader: Story = {
	args: {
		header: {
			title: "Custom Project",
			subheader: "With custom header props",
			avatar: (
				<span role="img" aria-label="rocket">
					🚀
				</span>
			),
		},
		content: "This project card has a custom header with an avatar.",
		actions: <Button variant="outlined">Action</Button>,
	},
};

export const ActionHeader: Story = {
	args: {
		header: {
			title: "Custom Project",
			subheader: "With custom header props",
			action: (
				<IconButton aria-label="settings" size="small">
					<CloseOutlined fontSize="small" sx={{ color: "action.active" }} />
				</IconButton>
			),
		},
		content: "This project card has a custom header with an avatar.",
		actions: <Button variant="outlined">Action</Button>,
	},
};
