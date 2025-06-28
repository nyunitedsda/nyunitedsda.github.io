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
			options: ["text", "outlined", "contained"],
			defaultValue: "contained",
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
type Story = StoryObj<typeof meta>;

// Regular button without confirmation
export const WithoutConfirmation: Story = {
	args: {
		shouldConfirm: false,
		children: "Regular Button",
		variant: "contained",
		color: "primary",
		onClick: () => console.log("Button clicked directly!"),
	},
};

// Button with confirmation dialog
export const WithConfirmation: Story = {
	args: {
		shouldConfirm: true,
		children: "Delete Item",
		variant: "contained",
		color: "error",
		confirmationTitle: "Delete Item",
		confirmationContent:
			"Are you sure you want to delete this item? This action cannot be undone.",
		cancelLabel: "Cancel",
		confirmLabel: "Delete",
		onClick: () => console.log("Item deleted!"),
	},
};

// Save action with confirmation
export const SaveWithConfirmation: Story = {
	args: {
		shouldConfirm: true,
		children: "Save Changes",
		variant: "contained",
		color: "primary",
		confirmationTitle: "Save Changes",
		confirmationContent: "Are you sure you want to save these changes?",
		cancelLabel: "Cancel",
		confirmLabel: "Save",
		onClick: () => console.log("Changes saved!"),
	},
};

// Logout action with confirmation
export const LogoutWithConfirmation: Story = {
	args: {
		shouldConfirm: true,
		children: "Logout",
		variant: "outlined",
		color: "secondary",
		confirmationTitle: "Logout",
		confirmationContent:
			"Are you sure you want to logout? Any unsaved changes will be lost.",
		cancelLabel: "Stay",
		confirmLabel: "Logout",
		onClick: () => console.log("User logged out!"),
	},
};

// Disabled state
export const DisabledButton: Story = {
	args: {
		shouldConfirm: true,
		children: "Disabled Action",
		variant: "contained",
		color: "primary",
		disabled: true,
		confirmationTitle: "Disabled Action",
		confirmationContent: "This action is disabled.",
		onClick: () => console.log("This should not be called"),
	},
};

// Custom styling
export const CustomStyling: Story = {
	args: {
		shouldConfirm: true,
		children: "Custom Styled",
		variant: "contained",
		color: "warning",
		confirmationTitle: "Warning Action",
		confirmationContent:
			"This action may have unintended consequences. Continue?",
		cancelLabel: "No, Cancel",
		confirmLabel: "Yes, Continue",
		onClick: () => console.log("Warning action executed!"),
		sx: {
			borderRadius: 2,
			textTransform: "none",
			fontSize: "1.1rem",
		},
	},
};
