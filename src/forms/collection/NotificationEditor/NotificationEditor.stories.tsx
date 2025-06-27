import type { Meta, StoryObj } from "@storybook/react";
import { SnackbarProvider } from "notistack";
import type { NotificationType } from "../../../api/request/types";
import NotificationEditor from "./NotificationEditor";

// Sample notification data
const sampleNotification: NotificationType = {
	id: 1,
	message:
		"The system will be down for maintenance from 2:00 AM to 4:00 AM EST.",
	title: "System Maintenance",
	severity: "information",
	expires_at: new Date("2025-12-31T23:59:59"),
};

// Define the meta for the story
const meta: Meta<typeof NotificationEditor> = {
	title: "Forms/NotificationEditor",
	component: NotificationEditor,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<SnackbarProvider maxSnack={3}>
				<div style={{ minHeight: "100vh", padding: "20px" }}>
					<Story />
				</div>
			</SnackbarProvider>
		),
	],
	argTypes: {
		open: {
			control: "boolean",
			description: "Whether the modal is open",
		},
		entity: {
			control: "object",
			description: "Notification entity to edit (undefined for create mode)",
		},
		onClose: {
			action: "onClose",
			description: "Callback when modal is closed",
		},
		onSuccess: {
			action: "onSuccess",
			description: "Callback when notification is successfully saved",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create mode story
export const CreateMode: Story = {
	args: {
		open: true,
		entity: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: NotificationType) =>
			console.log("Notification created:", data),
	},
};

// Edit mode story
export const EditMode: Story = {
	args: {
		open: true,
		entity: sampleNotification,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: NotificationType) =>
			console.log("Notification updated:", data),
	},
};

// Edit mode with different severity levels
export const EditModeError: Story = {
	args: {
		open: true,
		entity: {
			...sampleNotification,
			id: 2,
			message:
				"A critical error has occurred in the system. Please contact support immediately.",
			title: "Critical Error",
			severity: "error",
		},
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: NotificationType) =>
			console.log("Error notification updated:", data),
	},
};

export const EditModeSuccess: Story = {
	args: {
		open: true,
		entity: {
			...sampleNotification,
			id: 3,
			message: "The system update has been completed successfully.",
			title: "Update Complete",
			severity: "success",
		},
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: NotificationType) =>
			console.log("Success notification updated:", data),
	},
};

export const EditModeCaution: Story = {
	args: {
		open: true,
		entity: {
			...sampleNotification,
			id: 4,
			message: "Your session will expire in 5 minutes. Please save your work.",
			title: "Warning",
			severity: "caution",
		},
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: NotificationType) =>
			console.log("Caution notification updated:", data),
	},
};

// Closed modal story
export const ClosedModal: Story = {
	args: {
		open: false,
		entity: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: NotificationType) =>
			console.log("Notification saved:", data),
	},
};
