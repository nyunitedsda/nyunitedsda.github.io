import { StarOutlineOutlined } from "@mui/icons-material";
import { Icon, IconButton } from "@mui/material";
import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-vite";
import DataTable from "./DataTable";
import type { ColumnDefinition } from "./types";

interface User {
	id: number;
	name: string;
	email: string;
}

const users: Partial<User>[] = [
	{ id: 1, name: "John Doe", email: "john@example.com" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const columns: ColumnDefinition<Partial<User>>[] = [
	{
		id: "name",
		title: "Name",
		field: "name",
	},
	{
		id: "email",
		title: "Email",
		field: "email",
	},
];

const meta: Meta<typeof DataTable> = {
	title: "DataTable/DataTable",
	component: DataTable,
	tags: ["autodocs"],
	args: {
		columns,
		data: users,
		onEdit: action("edit-clicked"),
		onDelete: action("delete-clicked"),
		onView: action("view-clicked"),
	},
	parameters: {
		docs: {
			description: {
				component:
					"A flexible data table component with optional action column.",
			},
		},
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
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"Default table with name and email columns, and action buttons for each row.",
			},
		},
	},
	args: {
		columns,
		data: users,
		onEdit: action("edit-clicked"),
		onDelete: action("delete-clicked"),
		onView: action("view-clicked"),
	},
};

export const NoData: Story = {
	args: {
		data: [],
	},
	parameters: {
		docs: {
			description: {
				story: "Table with columns but no data rows.",
			},
		},
	},
};

export const ModifyActions: Story = {
	args: {
		columns: [...columns],
	},
	parameters: {
		docs: {
			description: {
				story:
					"Table with a custom actions column using inline buttons for Edit and Delete.",
			},
		},
	},
};

export const CustomActionColumns: Story = {
	args: {
		columns,
		renderAction: (data) => (
			<IconButton
				onClick={() => action("custom-action-clicked")(data)}
				sx={{ color: "warning.main" }}
			>
				<StarOutlineOutlined />
			</IconButton>
		),
	},
	parameters: {
		docs: {
			description: {
				story: "Table with a custom column rendering user ID.",
			},
		},
	},
};
