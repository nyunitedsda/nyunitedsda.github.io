import type { UserDT } from "@api/index.ts";
import { TableAction, type TableActionProps } from "@components/DataTable";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

const user: Partial<UserDT> = { id: 1, username: "John Doe" };

const meta: Meta<TableActionProps<Partial<UserDT>>> = {
	title: "DataTable/TableAction",
	component: TableAction,
	tags: ["autodocs"],
	args: {
		data: user,
		onEdit: action("edit-clicked"),
		onDelete: action("delete-clicked"),
		onView: action("view-clicked"),
	},
	parameters: {
		docs: {
			description: {
				component:
					"A component to render action buttons for each row in a data table.",
			},
		},
		excludeProviders: ["All"],
	},
	decorators: [
		(Story) => (
			<div style={{ padding: "3em" }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<TableActionProps<Partial<UserDT>>>;

export const Default: Story = {
	args: {
		data: user,
		onEdit: action("edit-clicked"),
		onDelete: action("delete-clicked"),
		onView: action("view-clicked"),
	},
	parameters: {
		docs: {
			description: {
				story:
					"Shows all three actions: Edit, Delete, and View for a data row.",
			},
		},
	},
};

export const MobileDefault: Story = {
	args: {
		data: user,
		onEdit: action("edit-clicked"),
		onDelete: action("delete-clicked"),
		onView: action("view-clicked"),
	},
	parameters: {
		docs: {
			description: {
				story: "Shows the default actions in a mobile viewport.",
			},
		},
		viewport: {
			defaultViewport: "mobile1",
		},
	},
};

export const OnlyEdit: Story = {
	args: {
		data: user,
		onDelete: undefined,
		onView: undefined,
	},
	parameters: {
		docs: {
			description: {
				story: "Shows only the Edit action for a data row.",
			},
		},
	},
};

export const OnlyDelete: Story = {
	args: {
		data: user,
		onEdit: undefined,
		onView: undefined,
	},
	parameters: {
		docs: {
			description: {
				story: "Shows only the Delete action for a data row.",
			},
		},
	},
};

export const OnlyView: Story = {
	args: {
		data: user,
		onEdit: undefined,
		onDelete: undefined,
	},
	parameters: {
		docs: {
			description: {
				story: "Shows only the View action for a data row.",
			},
		},
	},
};

export const CustomRender: Story = {
	args: {
		data: user,
		renderAction: (data) => <span>Custom Action for {data.username}</span>,
	},
	parameters: {
		docs: {
			description: {
				story: "Demonstrates a custom renderAction prop for a data row.",
			},
		},
	},
};
