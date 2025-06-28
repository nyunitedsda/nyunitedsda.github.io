import type { Meta, StoryObj } from "@storybook/react";
import { SnackbarProvider } from "notistack";
import type { ContactInfoType } from "../../../api/request/types";
import ContactEditor from "./ContactEditor";

// Sample contact data
const sampleChurchContact: ContactInfoType = {
	id: 1,
	email: "info@nyunitedsda.org",
	phone: "+1-212-555-0123",
	street: "163 West 131st Street",
	city: "New York",
	zip_code: "10027",
	country: "United States",
	mail_address:
		"NY United SDA Church, 163 West 131st Street, New York, NY 10027",
	mailing_recipient: "Church Office",
	created_at: new Date("2025-01-01T00:00:00"),
	modified_at: new Date("2025-01-15T00:00:00"),
};

const samplePastorContact: ContactInfoType = {
	id: 2,
	email: "pastor@nyunitedsda.org",
	phone: "+1-212-555-0456",
	street: "163 West 131st Street",
	city: "New York",
	zip_code: "10027",
	country: "United States",
	mail_address:
		"Pastor John Lomacang, NY United SDA Church, 163 West 131st Street, New York, NY 10027",
	mailing_recipient: "Pastor John Lomacang",
	created_at: new Date("2025-01-01T00:00:00"),
	modified_at: new Date("2025-01-15T00:00:00"),
};

const sampleMinimalContact: ContactInfoType = {
	id: 3,
	email: "contact@example.org",
	phone: "+1-555-123-4567",
	street: "123 Main Street",
	city: "Anytown",
	zip_code: "12345",
	country: "United States",
	created_at: new Date("2025-01-01T00:00:00"),
	modified_at: new Date("2025-01-15T00:00:00"),
};

// Define the meta for the story
const meta: Meta<typeof ContactEditor> = {
	title: "Forms/ContactEditor",
	component: ContactEditor,
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
			description: "Contact entity to edit (undefined for create mode)",
		},
		onClose: {
			action: "onClose",
			description: "Callback when modal is closed",
		},
		onSuccess: {
			action: "onSuccess",
			description: "Callback when contact is successfully saved",
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
		onSuccess: (data: ContactInfoType) => console.log("Contact created:", data),
	},
};

// Edit mode - Church Contact
export const EditModeChurchContact: Story = {
	args: {
		open: true,
		entity: sampleChurchContact,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ContactInfoType) =>
			console.log("Church contact updated:", data),
	},
};

// Edit mode - Pastor Contact
export const EditModePastorContact: Story = {
	args: {
		open: true,
		entity: samplePastorContact,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ContactInfoType) =>
			console.log("Pastor contact updated:", data),
	},
};

// Edit mode - Minimal Contact
export const EditModeMinimalContact: Story = {
	args: {
		open: true,
		entity: sampleMinimalContact,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ContactInfoType) =>
			console.log("Minimal contact updated:", data),
	},
};

// Closed modal story
export const ClosedModal: Story = {
	args: {
		open: false,
		entity: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ContactInfoType) => console.log("Contact saved:", data),
	},
};

// Create mode with pre-filled data
export const CreateModePreFilled: Story = {
	args: {
		open: true,
		entity: {
			id: 0,
			email: "example@church.org",
			phone: "+1-555-000-0000",
			street: "123 Church Street",
			city: "Springfield",
			zip_code: "12345",
			country: "United States",
			mail_address: "",
			mailing_recipient: "",
		} as ContactInfoType,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ContactInfoType) =>
			console.log("Pre-filled contact created:", data),
	},
};

// International contact example
export const InternationalContact: Story = {
	args: {
		open: true,
		entity: {
			id: 4,
			email: "international@example.org",
			phone: "+44-20-7946-0958",
			street: "10 Downing Street",
			city: "London",
			zip_code: "SW1A 2AA",
			country: "United Kingdom",
			mail_address:
				"International Office, 10 Downing Street, London SW1A 2AA, UK",
			mailing_recipient: "International Coordinator",
		} as ContactInfoType,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ContactInfoType) =>
			console.log("International contact updated:", data),
	},
};
