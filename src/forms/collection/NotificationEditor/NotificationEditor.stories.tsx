import type { NotificationDT } from "@/api";
import { NotificationEditor } from "@forms/collection";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SnackbarProvider } from "notistack";
import { useId, useState } from "react";

// Sample notification data
const sampleNotification: NotificationDT = {
	id: 1,
	message:
		"The system will be down for maintenance from 2:00 AM to 4:00 AM EST.",
	title: "System Maintenance",
	severity_id: 1,
	expires_at: new Date("2025-12-31T23:59:59"),
};

// Interactive wrapper component with open button
const InteractiveWrapper = ({
	data,
	onClose,
	onSuccess,
	buttonText = "Open Editor",
}: {
	data?: Partial<NotificationDT>;
	onClose?: () => void;
	onSuccess?: (data: Partial<NotificationDT>) => void;
	buttonText?: string;
}) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		onClose?.();
	};

	const handleSuccess = (data: Partial<NotificationDT>) => {
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
			<NotificationEditor
				open={open}
				data={data}
				onClose={handleClose}
				onSuccess={handleSuccess}
			/>
		</div>
	);
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
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		data: {
			control: "object",
			description: "Notification data to edit (undefined for create mode)",
			table: {
				type: { summary: "NotificationDT | undefined" },
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
			description: "Callback when notification is successfully saved",
			table: {
				type: { summary: "(data: Partial<NotificationDT>) => void" },
			},
		},
	},
	parameters: {
		docs: {
			description: {
				component: `
The NotificationEditor is a specialized form component for creating and editing system notifications. 
It supports different severity levels and expiration dates for user notifications.

## Features:
- ✅ Multiple severity levels (information, success, error, caution)
- ✅ Expiration date management
- ✅ Title and message validation
- ✅ Modal interface with responsive design
- ✅ Form validation and error handling

## Usage:
Use this component when you need to manage system notifications and alerts.
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
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="🆕 Create New Notification"
		/>
	),
	args: {
		data: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<NotificationDT>) =>
			console.log("Notification created:", data),
	},
	parameters: {
		docs: {
			description: {
				story:
					"**🆕 Create a new notification** - Click the button to open the notification form and start from scratch.",
			},
			source: {
				code: `
const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>
  Create New Notification
</button>

<NotificationEditor
  open={open}
  data={undefined}
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

// Edit mode story
export const EditMode: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="📝 Edit Notification"
		/>
	),
	args: {
		data: sampleNotification as Partial<NotificationDT>,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<NotificationDT>) =>
			console.log("Notification updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**📝 Edit System Notification**

**Click to see:**
- 📢 Information severity notification
- 📅 Expiration date management
- 📝 Title and message editing
- ⚙️ System maintenance example
				`,
			},
		},
	},
};

// Edit mode with different severity levels
export const EditModeError: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="🚨 Edit Error Notification"
		/>
	),
	args: {
		data: {
			...sampleNotification,
			id: 2,
			message:
				"A critical error has occurred in the system. Please contact support immediately.",
			title: "Critical Error",
			severity_id: 2,
		},
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<NotificationDT>) =>
			console.log("Error notification updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**🚨 Error Notification Editor**

**Click to explore:**
- ❌ Error severity styling
- 🚨 Critical system alerts
- 📱 Urgent notification handling
- 🔴 High-priority messaging
				`,
			},
		},
	},
};

export const EditModeSuccess: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="✅ Edit Success Notification"
		/>
	),
	args: {
		data: {
			...sampleNotification,
			id: 3,
			message: "The system update has been completed successfully.",
			title: "Update Complete",
			severity_id: 3,
		},
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<NotificationDT>) =>
			console.log("Success notification updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**✅ Success Notification Editor**

**Click to see:**
- ✅ Success severity styling
- 🎉 Positive feedback notifications
- 📱 Completion confirmations
- 🟢 Achievement alerts
				`,
			},
		},
	},
};

export const EditModeCaution: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="⚠️ Edit Caution Notification"
		/>
	),
	args: {
		data: {
			...sampleNotification,
			id: 4,
			message: "Your session will expire in 5 minutes. Please save your work.",
			title: "Warning",
			severity_id: 4,
		},
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<NotificationDT>) =>
			console.log("Caution notification updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**⚠️ Caution Notification Editor**

**Click to explore:**
- ⚠️ Warning severity styling
- ⏰ Time-sensitive alerts
- 📱 Precautionary notifications
- 🟡 Attention-requiring messages
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
				Partial<NotificationDT> | undefined
			>(undefined);
			const uId = useId();
			const entityOptions = [
				{ label: "None (Create Mode)", value: undefined },
				{
					label: "Information",
					value: sampleNotification as Partial<NotificationDT>,
				},
				{
					label: "Error",
					value: {
						...sampleNotification,
						id: 2,
						severity: "error" as const,
						title: "Critical Error",
					} as Partial<NotificationDT>,
				},
				{
					label: "Success",
					value: {
						...sampleNotification,
						id: 3,
						severity: "success" as const,
						title: "Update Complete",
					} as Partial<NotificationDT>,
				},
				{
					label: "Caution",
					value: {
						...sampleNotification,
						id: 4,
						severity: "caution" as const,
						title: "Warning",
					} as Partial<NotificationDT>,
				},
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
							notification type and click the button to see it open.
						</p>
						<div style={{ marginBottom: "12px" }}>
							<label
								htmlFor={uId}
								style={{
									display: "block",
									marginBottom: "8px",
									fontWeight: "bold",
								}}
							>
								Pre-select notification for modal:
							</label>
							<select
								id={uId}
								title="Select notification type for modal"
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
									<option key={option.label} value={index}>
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
						{open ? "✅ Modal is Open" : "👆 Click to Open Notification Editor"}
					</button>
					<NotificationEditor
						open={open}
						data={selectedEntity}
						onClose={() => setOpen(false)}
						onSuccess={(data) => {
							console.log("Notification saved:", data);
							setOpen(false);
						}}
					/>
				</div>
			);
		};

		return <ClosedModalDemo />;
	},
	args: {
		data: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<NotificationDT>) =>
			console.log("Notification saved:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**👻 Closed Modal State**

**Interactive demo of component lifecycle:**
- 🎯 **Default state** - Component starts closed (normal behavior)
- 📝 **Pre-configure data** - Select notification type before opening
- 👆 **Manual trigger** - Click button to open modal
- 🔄 **State management** - See how open/close states work
				`,
			},
		},
	},
};
