import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import type { UserType } from "../../../../api/request/types";
import { userColumns } from "../../../../pages/Admin/constants/userColumns";
import users from "../../../../test/mock_data/users";
import type { GenericType } from "../../types";
import TableCard from "./TableCard";
import type { TableCardProps } from "./types";

type StoryDataType = UserType & GenericType;
const user: StoryDataType = { ...users[0] } as StoryDataType;

const columns = userColumns;

const meta: Meta<typeof TableCard> = {
	title: "DataTable/TableCard",
	component: TableCard,
	tags: ["autodocs"],
	args: {
		data: user,
		columns,
		onEdit: action("edit-clicked"),
		onDelete: action("delete-clicked"),
		onView: action("view-clicked"),
	},
	parameters: {
		docs: {
			description: {
				component: "A card component to display row data with action buttons.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<TableCardProps<StoryDataType>>;

export const Default: Story = {
	args: {
		data: user,
		columns,
		onEdit: action("edit-clicked"),
		onDelete: action("delete-clicked"),
		onView: action("view-clicked"),
	},
	parameters: {
		docs: {
			description: {
				story: "Shows the TableCard with all actions enabled.",
			},
		},
	},
};

export const OnlyEdit: Story = {
	args: {
		data: user,
		columns,
		onDelete: undefined,
		onView: undefined,
	},
	parameters: {
		docs: {
			description: {
				story: "Shows the TableCard with only the Edit action.",
			},
		},
	},
};

export const OnlyDelete: Story = {
	args: {
		data: user,
		columns,
		onEdit: undefined,
		onView: undefined,
	},
	parameters: {
		docs: {
			description: {
				story: "Shows the TableCard with only the Delete action.",
			},
		},
	},
};

export const OnlyView: Story = {
	args: {
		data: user,
		columns,
		onEdit: undefined,
		onDelete: undefined,
	},
	parameters: {
		docs: {
			description: {
				story: "Shows the TableCard with only the View action.",
			},
		},
	},
};

export const CustomRenderAction: Story = {
	args: {
		data: user,
		columns,
		renderAction: (data: StoryDataType) => (
			<span>Custom Action for {data.name}</span>
		),
	},
	parameters: {
		docs: {
			description: {
				story: "Shows the TableCard with a custom renderAction.",
			},
		},
	},
};

export const MobileDefault: Story = {
	args: {
		data: user,
		columns,
		onEdit: action("edit-clicked"),
		onDelete: action("delete-clicked"),
		onView: action("view-clicked"),
	},
	parameters: {
		docs: {
			description: {
				story: "Shows the TableCard in a mobile viewport.",
			},
		},
	},
};
