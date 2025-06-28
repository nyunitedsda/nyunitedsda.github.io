import type { Meta, StoryObj } from "@storybook/react";
import { SnackbarProvider } from "notistack";
import type { ServiceType } from "../../../api/request/types";
import ServiceEditor from "./ServiceEditor";

// Sample service data
const sampleSundayService: ServiceType = {
	id: 1,
	title: "Sunday Morning Worship",
	time: "10:00 AM",
	created_at: new Date("2025-01-01T00:00:00"),
	modified_at: new Date("2025-01-15T00:00:00"),
};

const sampleWednesdayService: ServiceType = {
	id: 2,
	title: "Wednesday Bible Study",
	time: "7:00 PM",
	created_at: new Date("2025-01-01T00:00:00"),
	modified_at: new Date("2025-01-15T00:00:00"),
};

const sampleSabbathService: ServiceType = {
	id: 3,
	title: "Sabbath School",
	time: "9:30 AM",
	created_at: new Date("2025-01-01T00:00:00"),
	modified_at: new Date("2025-01-15T00:00:00"),
};

// Define the meta for the story
const meta: Meta<typeof ServiceEditor> = {
	title: "Forms/ServiceEditor",
	component: ServiceEditor,
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
			defaultValue: false,
		},
		entity: {
			control: "object",
			description: "Service entity to edit (undefined for create mode)",
		},
		onClose: {
			action: "onClose",
			description: "Callback when modal is closed",
		},
		onSuccess: {
			action: "onSuccess",
			description: "Callback when service is successfully saved",
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
		onSuccess: (data: ServiceType) => console.log("Service created:", data),
	},
};

// Edit mode - Sunday Service
export const EditModeSundayService: Story = {
	args: {
		open: true,
		entity: sampleSundayService,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ServiceType) =>
			console.log("Sunday service updated:", data),
	},
};

// Edit mode - Wednesday Service
export const EditModeWednesdayService: Story = {
	args: {
		open: true,
		entity: sampleWednesdayService,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ServiceType) =>
			console.log("Wednesday service updated:", data),
	},
};

// Edit mode - Sabbath School
export const EditModeSabbathSchool: Story = {
	args: {
		open: true,
		entity: sampleSabbathService,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ServiceType) =>
			console.log("Sabbath school updated:", data),
	},
};

// Closed modal story
export const ClosedModal: Story = {
	args: {
		open: false,
		entity: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ServiceType) => console.log("Service saved:", data),
	},
};

// Create mode with pre-filled data
export const CreateModePreFilled: Story = {
	args: {
		open: true,
		entity: {
			id: 0,
			title: "Evening Prayer Service",
			time: "6:00 PM",
		} as ServiceType,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ServiceType) =>
			console.log("Evening service created:", data),
	},
};
