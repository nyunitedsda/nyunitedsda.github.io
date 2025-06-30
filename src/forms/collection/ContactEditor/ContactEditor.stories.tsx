import type { Meta, StoryObj } from "@storybook/react";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
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

// Interactive wrapper component with open button
const InteractiveWrapper = ({
	entity,
	onClose,
	onSuccess,
	buttonText = "Open Editor",
}: {
	entity?: ContactInfoType;
	onClose?: () => void;
	onSuccess?: (data: ContactInfoType) => void;
	buttonText?: string;
}) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		onClose?.();
	};

	const handleSuccess = (data: ContactInfoType) => {
		setOpen(false);
		onSuccess?.(data);
	};

	return (
		<div style={{ padding: "20px" }}>
			<button
				onClick={handleOpen}
				style={{
					padding: "12px 24px",
					fontSize: "16px",
					backgroundColor: "#007bff",
					color: "white",
					border: "none",
					borderRadius: "8px",
					cursor: "pointer",
					boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
					marginBottom: "20px",
				}}
			>
				{buttonText}
			</button>
			<ContactEditor
				open={open}
				entity={entity}
				onClose={handleClose}
				onSuccess={handleSuccess}
			/>
		</div>
	);
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
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		entity: {
			control: "object",
			description: "Contact entity to edit (undefined for create mode)",
			table: {
				type: { summary: "ContactInfoType | undefined" },
				defaultValue: { summary: "undefined" },
			},
		},
		onClose: {
			action: "onClose",
			description: "Callback when modal is closed",
			table: {
				type: { summary: "() => void" },
			},
		},
		onSuccess: {
			action: "onSuccess",
			description: "Callback when contact is successfully saved",
			table: {
				type: { summary: "(data: ContactInfoType) => void" },
			},
		},
	},
	parameters: {
		docs: {
			description: {
				component: `
The ContactEditor is a comprehensive form component for creating and editing contact information. 
It handles church contacts, pastor contacts, and various other contact types with validation.

## Features:
- ✅ Complete address management
- ✅ Email and phone validation
- ✅ Mailing address formatting
- ✅ Modal interface with responsive design
- ✅ Form validation and error handling

## Usage:
Use this component when you need to manage contact information for the church.
				`,
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create mode story
export const CreateMode: Story = {
	render: (args) => (
		<InteractiveWrapper
			entity={args.entity}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="🆕 Create New Contact"
		/>
	),
	args: {
		entity: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ContactInfoType) => console.log("Contact created:", data),
	},
	parameters: {
		docs: {
			description: {
				story:
					"**🆕 Create a new contact** - Click the button to open the contact form and start from scratch.",
			},
			source: {
				code: `
const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>
  Create New Contact
</button>

<ContactEditor
  open={open}
  entity={undefined}
  onClose={() => setOpen(false)}
  onSuccess={(data) => {
    console.log("Created:", data);
    setOpen(false);
  }}
/>`,
			},
		},
	},
};

// Edit mode - Church Contact
export const EditModeChurchContact: Story = {
	render: (args) => (
		<InteractiveWrapper
			entity={args.entity}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="⛪ Edit Church Contact"
		/>
	),
	args: {
		entity: sampleChurchContact,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ContactInfoType) =>
			console.log("Church contact updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**⛪ Church Contact Editor**

**Click to see:**
- 📧 Complete contact information form
- 🏢 Full address management
- 📮 Mailing address formatting
- 📱 Phone and email validation
				`,
			},
		},
	},
};

// Edit mode - Pastor Contact
export const EditModePastorContact: Story = {
	render: (args) => (
		<InteractiveWrapper
			entity={args.entity}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="👨‍💼 Edit Pastor Contact"
		/>
	),
	args: {
		entity: samplePastorContact,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ContactInfoType) =>
			console.log("Pastor contact updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**👨‍💼 Pastor Contact Editor**

**Click to explore:**
- 📧 Pastor-specific contact details
- 📮 Personalized mailing recipient
- 🏢 Professional contact management
- 📱 Dedicated pastor communication channels
				`,
			},
		},
	},
};

// Edit mode - Minimal Contact
export const EditModeMinimalContact: Story = {
	render: (args) => (
		<InteractiveWrapper
			entity={args.entity}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="📝 Edit Minimal Contact"
		/>
	),
	args: {
		entity: sampleMinimalContact,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ContactInfoType) =>
			console.log("Minimal contact updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**📝 Minimal Contact Editor**

**Click to see:**
- 📧 Basic contact information only
- 🏠 Simple address fields
- 📱 Essential contact details
- ✅ Required fields validation
				`,
			},
		},
	},
};

// Closed modal story
export const ClosedModal: Story = {
	render: () => {
		const ClosedModalDemo = () => {
			const [open, setOpen] = useState(false);
			const [selectedEntity, setSelectedEntity] = useState<
				ContactInfoType | undefined
			>(undefined);

			const entityOptions = [
				{ label: "None (Create Mode)", value: undefined },
				{ label: "Church Contact", value: sampleChurchContact },
				{ label: "Pastor Contact", value: samplePastorContact },
				{ label: "Minimal Contact", value: sampleMinimalContact },
			];

			return (
				<div style={{ padding: "20px" }}>
					<div
						style={{
							marginBottom: "20px",
							padding: "16px",
							backgroundColor: "#f8f9fa",
							borderRadius: "8px",
						}}
					>
						<h4 style={{ margin: "0 0 12px 0", color: "#333" }}>
							👻 Component State Demo
						</h4>
						<p style={{ margin: "0 0 16px 0", color: "#666" }}>
							This demonstrates the component's default closed state. Select a
							contact type and click the button to see it open.
						</p>
						<div style={{ marginBottom: "12px" }}>
							<label
								style={{
									display: "block",
									marginBottom: "8px",
									fontWeight: "bold",
								}}
							>
								Pre-select contact for modal:
							</label>
							<select
								title="Select contact type for modal"
								value={entityOptions.findIndex(
									(opt) => opt.value === selectedEntity,
								)}
								onChange={(e) =>
									setSelectedEntity(entityOptions[Number(e.target.value)].value)
								}
								style={{
									padding: "8px 12px",
									fontSize: "14px",
									border: "1px solid #ccc",
									borderRadius: "4px",
									marginRight: "12px",
								}}
							>
								{entityOptions.map((option, index) => (
									<option key={index} value={index}>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</div>
					<button
						onClick={() => setOpen(true)}
						style={{
							padding: "12px 24px",
							fontSize: "16px",
							backgroundColor: "#6c757d",
							color: "white",
							border: "none",
							borderRadius: "8px",
							cursor: "pointer",
							boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
						}}
					>
						{open ? "✅ Modal is Open" : "👆 Click to Open Contact Editor"}
					</button>
					<ContactEditor
						open={open}
						entity={selectedEntity}
						onClose={() => setOpen(false)}
						onSuccess={(data) => {
							console.log("Contact saved:", data);
							setOpen(false);
						}}
					/>
				</div>
			);
		};

		return <ClosedModalDemo />;
	},
	args: {
		entity: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ContactInfoType) => console.log("Contact saved:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**👻 Closed Modal State**

**Interactive demo of component lifecycle:**
- 🎯 **Default state** - Component starts closed (normal behavior)
- 📝 **Pre-configure data** - Select contact type before opening
- 👆 **Manual trigger** - Click button to open modal
- 🔄 **State management** - See how open/close states work
				`,
			},
		},
	},
};

// Create mode with pre-filled data
export const CreateModePreFilled: Story = {
	render: (args) => (
		<InteractiveWrapper
			entity={args.entity}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="📝 Create Pre-filled Contact"
		/>
	),
	args: {
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
	parameters: {
		docs: {
			description: {
				story: `
**📝 Pre-filled Contact Creation**

**Click to see:**
- 🎯 Form pre-populated with sample data
- 📧 Default email and phone formats
- 🏠 Standard address structure
- ✏️ Editable template for quick creation
				`,
			},
		},
	},
};

// International contact example
export const InternationalContact: Story = {
	render: (args) => (
		<InteractiveWrapper
			entity={args.entity}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="🌍 Edit International Contact"
		/>
	),
	args: {
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
	parameters: {
		docs: {
			description: {
				story: `
**🌍 International Contact Editor**

**Click to explore:**
- 🌎 International address formatting
- ☎️ International phone number format
- 📮 Complex mailing address structure
- 🌍 Non-US country examples
				`,
			},
		},
	},
};
