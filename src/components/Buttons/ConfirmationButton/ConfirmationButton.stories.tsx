
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveIcon from "@mui/icons-material/Save";
// biome-ignore lint/nursery/noUnresolvedImports: Storybook types are intentionally imported from @storybook/react-vite
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ConfirmationButtonProps } from "../types";
import ConfirmationButton from "./ConfirmationButton";

let argTypes: Meta<ConfirmationButtonProps>["argTypes"] = {};


// Define the meta for the story
const meta: Meta<ConfirmationButtonProps> = {
	title: "Components/Buttons/ConfirmationButton",
	component: ConfirmationButton,
	tags: ["autodocs"],
	decorators: [(Story: React.ComponentType) => (
		<div style={{ padding: "20px" }}>
			<Story />
		</div>
	)],
	argTypes,
	parameters: {
		docs: {
			description: {
				component:
					"A button component that can optionally show a confirmation dialog before executing the onClick action. It supports both regular buttons and icon buttons, with customizable confirmation messages and labels.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof ConfirmationButton>;

// Regular button without confirmation
export const WithoutConfirmation: Story = {
	args: {
		shouldConfirm: false,
		children: "Regular Button",
		confirmVariant: "button",
		color: "primary",
		onClick: () => console.log("Button clicked directly!"),
	} as Story["args"],
	parameters: {
		docs: {
			description: {
				story:
					"A regular button that does not require confirmation before executing the onClick action.",
			},
		},
	},
};

// Button with confirmation dialog
export const WithConfirmation: Story = {
	args: {
		shouldConfirm: true,
		children: "Delete Item",
		confirmVariant: "button",
		color: "error",
		confirmationTitle: "Delete Item",
		confirmationContent:
			"Are you sure you want to delete this item? This action cannot be undone.",
		cancelLabel: "Cancel",
		confirmLabel: "Delete",
		onClick: () => console.log("Item deleted!"),
	} as Story["args"],
	parameters: {
		docs: {
			description: {
				story:
					"A button that shows a confirmation dialog before executing the onClick action. Useful for destructive actions like deleting items.",
			},
		},
	},
};

// Save action with confirmation
export const SaveWithConfirmation: Story = {
	args: {
		shouldConfirm: true,
		children: "Save Changes",
		confirmVariant: "button",
		color: "primary",
		confirmationTitle: "Save Changes",
		confirmationContent: "Are you sure you want to save these changes?",
		cancelLabel: "Cancel",
		confirmLabel: "Save",
		onClick: () => console.log("Changes saved!"),
	} as Story["args"],
	parameters: {
		docs: {
			description: {
				story:
					"A button that shows a confirmation dialog before saving changes. Useful for ensuring users want to commit their changes.",
			},
		},
	},
};

// Logout action with confirmation
export const LogoutWithConfirmation: Story = {
	args: {
		shouldConfirm: true,
		children: "Logout",
		confirmVariant: "button",
		color: "secondary",
		confirmationTitle: "Logout",
		confirmationContent:
			"Are you sure you want to logout? Any unsaved changes will be lost.",
		cancelLabel: "Stay",
		confirmLabel: "Logout",
		onClick: () => console.log("User logged out!"),
	} as Story["args"],
	parameters: {
		docs: {
			description: {
				story:
					"A button that shows a confirmation dialog before logging out. Useful for preventing accidental logouts.",
			},
		},
	},
};

// Icon button without confirmation
export const IconButtonWithoutConfirmation: Story = {
	args: {
		shouldConfirm: false,
		children: <EditIcon />,
		confirmVariant: "icon",
		color: "primary",
		onClick: () => console.log("Edit icon clicked!"),
	} as Story["args"],
};

// Icon button with confirmation - Delete
export const DeleteIconWithConfirmation: Story = {
	args: {
		shouldConfirm: true,
		children: <DeleteIcon />,
		confirmVariant: "icon",
		color: "error",
		confirmationTitle: "Delete Item",
		confirmationContent:
			"Are you sure you want to delete this item? This action cannot be undone.",
		cancelLabel: "Cancel",
		confirmLabel: "Delete",
		onClick: () => console.log("Item deleted via icon!"),
	} as Story["args"],
	parameters: {
		docs: {
			description: {
				story:
					"An icon button that shows a confirmation dialog before executing the onClick action. Useful for destructive actions like deleting items.",
			},
		},
	},
};

// Icon button with confirmation - Save
export const SaveIconWithConfirmation: Story = {
	args: {
		shouldConfirm: true,
		children: <SaveIcon />,
		confirmVariant: "icon",
		color: "primary",
		confirmationTitle: "Save Changes",
		confirmationContent: "Are you sure you want to save these changes?",
		cancelLabel: "Cancel",
		confirmLabel: "Save",
		onClick: () => console.log("Changes saved via icon!"),
	} as Story["args"],
	parameters: {
		docs: {
			description: {
				story:
					"An icon button that shows a confirmation dialog before saving changes. Useful for ensuring users want to commit their changes.",
			},
		},
	},
};

// Icon button with confirmation - Logout
export const LogoutIconWithConfirmation: Story = {
	args: {
		shouldConfirm: true,
		children: <LogoutIcon />,
		confirmVariant: "icon",
		color: "secondary",
		confirmationTitle: "Logout",
		confirmationContent:
			"Are you sure you want to logout? Any unsaved changes will be lost.",
		cancelLabel: "Stay",
		confirmLabel: "Logout",
		onClick: () => console.log("User logged out via icon!"),
	} as Story["args"],
	parameters: {
		docs: {
			description: {
				story:
					"An icon button that shows a confirmation dialog before logging out. Useful for preventing accidental logouts.",
			},
		},
	},
};

// Disabled button state
export const DisabledButton: Story = {
	args: {
		shouldConfirm: true,
		children: "Disabled Action",
		confirmVariant: "button",
		color: "primary",
		disabled: true,
		confirmationTitle: "Disabled Action",
		confirmationContent: "This action is disabled.",
		onClick: () => console.log("This should not be called"),
	} as Story["args"],
	parameters: {
		docs: {
			description: {
				story:
					"A button that is disabled and does not respond to clicks. Useful for indicating unavailable actions.",
			},
		},
	},
};

// Disabled icon button
export const DisabledIconButton: Story = {
	args: {
		shouldConfirm: true,
		children: <DeleteIcon />,
		confirmVariant: "icon",
		color: "error",
		disabled: true,
		confirmationTitle: "Disabled Delete",
		confirmationContent: "This delete action is disabled.",
		onClick: () => console.log("This should not be called"),
	} as Story["args"],
	parameters: {
		docs: {
			description: {
				story:
					"An icon button that is disabled and does not respond to clicks. Useful for indicating unavailable actions.",
			},
		},
	},
};

argTypes = {
	shouldConfirm: {
		control: "boolean",
		description: "Whether to show confirmation dialog before executing onClick",
		defaultValue: false,
	},
	confirmationTitle: {
		control: "text",
		description: "Title for the confirmation dialog",
		defaultValue: "Confirm Action",
	},
	confirmationContent: {
		control: "text",
		description: "Content/message for the confirmation dialog",
		defaultValue: "Are you sure you want to proceed?",
	},
	cancelLabel: {
		control: "text",
		description: "Label for the cancel button",
		defaultValue: "Cancel",
	},
	confirmLabel: {
		control: "text",
		description: "Label for the confirm button",
		defaultValue: "Confirm",
	},
	onClick: {
		action: "clicked",
		description:
			"Function called when button is clicked (after confirmation if needed)",
	},
	confirmVariant: {
		control: "select",
		options: ["button", "icon"],
		description: "Button type: regular button or icon button",
		defaultValue: "button",
	},
	color: {
		control: "select",
		options: ["primary", "secondary", "error", "warning", "info", "success"],
		defaultValue: "primary",
	},
	disabled: {
		control: "boolean",
		defaultValue: false,
	},
	children: {
		control: "radio",
		options: [
			"Test Button",
			"AddIcon",
			"EditIcon",
			"DeleteIcon",
			"SaveIcon",
			"LogoutIcon"
		],
		mapping: {
			"Test Button": "Test Button",
			AddIcon: <AddIcon />,
			EditIcon: <EditIcon />,
			DeleteIcon: <DeleteIcon />,
			SaveIcon: <SaveIcon />,
			LogoutIcon: <LogoutIcon />,
		},
		description:
			"Content of the button (text for button variant, icon for icon variant)",
		defaultValue: "Test Button",
	},
};
