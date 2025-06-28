import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveIcon from "@mui/icons-material/Save";
import type { Meta, StoryObj } from "@storybook/react";
import { SnackbarProvider } from "notistack";
import ConfirmationButton from "./ConfirmationButton";

// Define the meta for the story
const meta: Meta<typeof ConfirmationButton> = {
	title: "Components/Buttons/ConfirmationButton",
	component: ConfirmationButton,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<SnackbarProvider maxSnack={3}>
				<div style={{ padding: "20px" }}>
					<Story />
				</div>
			</SnackbarProvider>
		),
	],
	argTypes: {
		shouldConfirm: {
			control: "boolean",
			description:
				"Whether to show confirmation dialog before executing onClick",
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
		variant: {
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
	},
};

export default meta;
type Story = StoryObj<typeof ConfirmationButton>;

// Regular button without confirmation
export const WithoutConfirmation: Story = {
	args: {
		shouldConfirm: false,
		children: "Regular Button",
		variant: "button",
		color: "primary",
		onClick: () => console.log("Button clicked directly!"),
	} as any,
};

// Button with confirmation dialog
export const WithConfirmation: Story = {
	args: {
		shouldConfirm: true,
		children: "Delete Item",
		variant: "button",
		color: "error",
		confirmationTitle: "Delete Item",
		confirmationContent:
			"Are you sure you want to delete this item? This action cannot be undone.",
		cancelLabel: "Cancel",
		confirmLabel: "Delete",
		onClick: () => console.log("Item deleted!"),
	} as any,
};

// Save action with confirmation
export const SaveWithConfirmation: Story = {
	args: {
		shouldConfirm: true,
		children: "Save Changes",
		variant: "button",
		color: "primary",
		confirmationTitle: "Save Changes",
		confirmationContent: "Are you sure you want to save these changes?",
		cancelLabel: "Cancel",
		confirmLabel: "Save",
		onClick: () => console.log("Changes saved!"),
	} as any,
};

// Logout action with confirmation
export const LogoutWithConfirmation: Story = {
	args: {
		shouldConfirm: true,
		children: "Logout",
		variant: "button",
		color: "secondary",
		confirmationTitle: "Logout",
		confirmationContent:
			"Are you sure you want to logout? Any unsaved changes will be lost.",
		cancelLabel: "Stay",
		confirmLabel: "Logout",
		onClick: () => console.log("User logged out!"),
	} as any,
};

// Icon button without confirmation
export const IconButtonWithoutConfirmation: Story = {
	args: {
		shouldConfirm: false,
		children: <EditIcon />,
		variant: "icon",
		color: "primary",
		onClick: () => console.log("Edit icon clicked!"),
	} as any,
};

// Icon button with confirmation - Delete
export const DeleteIconWithConfirmation: Story = {
	args: {
		shouldConfirm: true,
		children: <DeleteIcon />,
		variant: "icon",
		color: "error",
		confirmationTitle: "Delete Item",
		confirmationContent:
			"Are you sure you want to delete this item? This action cannot be undone.",
		cancelLabel: "Cancel",
		confirmLabel: "Delete",
		onClick: () => console.log("Item deleted via icon!"),
	} as any,
};

// Icon button with confirmation - Save
export const SaveIconWithConfirmation: Story = {
	args: {
		shouldConfirm: true,
		children: <SaveIcon />,
		variant: "icon",
		color: "primary",
		confirmationTitle: "Save Changes",
		confirmationContent: "Are you sure you want to save these changes?",
		cancelLabel: "Cancel",
		confirmLabel: "Save",
		onClick: () => console.log("Changes saved via icon!"),
	} as any,
};

// Icon button with confirmation - Logout
export const LogoutIconWithConfirmation: Story = {
	args: {
		shouldConfirm: true,
		children: <LogoutIcon />,
		variant: "icon",
		color: "secondary",
		confirmationTitle: "Logout",
		confirmationContent:
			"Are you sure you want to logout? Any unsaved changes will be lost.",
		cancelLabel: "Stay",
		confirmLabel: "Logout",
		onClick: () => console.log("User logged out via icon!"),
	} as any,
};

// Disabled button state
export const DisabledButton: Story = {
	args: {
		shouldConfirm: true,
		children: "Disabled Action",
		variant: "button",
		color: "primary",
		disabled: true,
		confirmationTitle: "Disabled Action",
		confirmationContent: "This action is disabled.",
		onClick: () => console.log("This should not be called"),
	} as any,
};

// Disabled icon button
export const DisabledIconButton: Story = {
	args: {
		shouldConfirm: true,
		children: <DeleteIcon />,
		variant: "icon",
		color: "error",
		disabled: true,
		confirmationTitle: "Disabled Delete",
		confirmationContent: "This delete action is disabled.",
		onClick: () => console.log("This should not be called"),
	} as any,
};
