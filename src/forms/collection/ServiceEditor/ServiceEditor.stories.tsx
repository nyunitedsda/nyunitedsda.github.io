import type { Meta, StoryObj } from "@storybook/react";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
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

// Interactive wrapper component with open button
const InteractiveWrapper = ({
	entity,
	onClose,
	onSuccess,
	buttonText = "Open Editor",
}: {
	entity?: ServiceType;
	onClose?: () => void;
	onSuccess?: (data: ServiceType) => void;
	buttonText?: string;
}) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		onClose?.();
	};

	const handleSuccess = (data: ServiceType) => {
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
			<ServiceEditor
				open={open}
				entity={entity}
				onClose={handleClose}
				onSuccess={handleSuccess}
			/>
		</div>
	);
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
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		entity: {
			control: "object",
			description: "Service entity to edit (undefined for create mode)",
			table: {
				type: { summary: "ServiceType | undefined" },
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
			description: "Callback when service is successfully saved",
			table: {
				type: { summary: "(data: ServiceType) => void" },
			},
		},
	},
	parameters: {
		docs: {
			description: {
				component: `
The ServiceEditor is a streamlined form component for creating and editing church service times. 
It manages service schedules with simple title and time fields.

## Features:
- ✅ Simple service time management
- ✅ Title and time validation
- ✅ Modal interface with responsive design
- ✅ Form validation and error handling

## Usage:
Use this component when you need to manage church service schedules and times.
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
			buttonText="🆕 Create New Service"
		/>
	),
	args: {
		entity: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ServiceType) => console.log("Service created:", data),
	},
	parameters: {
		docs: {
			description: {
				story:
					"**🆕 Create a new service** - Click the button to open the service form and create a new church service schedule.",
			},
			source: {
				code: `
const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>
  Create New Service
</button>

<ServiceEditor
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

// Edit mode - Sunday Service
export const EditModeSundayService: Story = {
	render: (args) => (
		<InteractiveWrapper
			entity={args.entity}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="☀️ Edit Sunday Service"
		/>
	),
	args: {
		entity: sampleSundayService,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ServiceType) =>
			console.log("Sunday service updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**☀️ Sunday Service Editor**

**Click to see:**
- 📅 Sunday morning worship settings
- ⏰ 10:00 AM service time
- ✏️ Editable service title and schedule
- 📝 Simple form interface
				`,
			},
		},
	},
};

// Edit mode - Wednesday Service
export const EditModeWednesdayService: Story = {
	render: (args) => (
		<InteractiveWrapper
			entity={args.entity}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="📖 Edit Bible Study"
		/>
	),
	args: {
		entity: sampleWednesdayService,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ServiceType) =>
			console.log("Wednesday service updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**📖 Wednesday Bible Study Editor**

**Click to explore:**
- 📚 Bible study service settings
- 🌙 Evening 7:00 PM schedule
- ✏️ Midweek service management
- 📝 Study group timing
				`,
			},
		},
	},
};

// Edit mode - Sabbath School
export const EditModeSabbathSchool: Story = {
	render: (args) => (
		<InteractiveWrapper
			entity={args.entity}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="📚 Edit Sabbath School"
		/>
	),
	args: {
		entity: sampleSabbathService,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ServiceType) =>
			console.log("Sabbath school updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**📚 Sabbath School Editor**

**Click to see:**
- 📖 Sabbath school settings
- 🌅 9:30 AM morning schedule
- 👥 Educational service management
- 📝 Study class timing
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
				ServiceType | undefined
			>(undefined);

			const entityOptions = [
				{ label: "None (Create Mode)", value: undefined },
				{ label: "Sunday Service", value: sampleSundayService },
				{ label: "Wednesday Service", value: sampleWednesdayService },
				{ label: "Sabbath School", value: sampleSabbathService },
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
							👻 Service Editor State Demo
						</h4>
						<p style={{ margin: "0 0 16px 0", color: "#666" }}>
							Select a service type and click the button to see the editor open.
						</p>
						<div style={{ marginBottom: "12px" }}>
							<label
								style={{
									display: "block",
									marginBottom: "8px",
									fontWeight: "bold",
								}}
							>
								Pre-select service for modal:
							</label>
							<select
								title="Select service type for modal"
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
						{open ? "✅ Modal is Open" : "👆 Click to Open Service Editor"}
					</button>
					<ServiceEditor
						open={open}
						entity={selectedEntity}
						onClose={() => setOpen(false)}
						onSuccess={(data) => {
							console.log("Service saved:", data);
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
		onSuccess: (data: ServiceType) => console.log("Service saved:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**👻 Closed Modal State**

**Interactive demo of component lifecycle:**
- 🎯 **Default state** - Component starts closed
- 📝 **Pre-configure data** - Select service type before opening
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
			buttonText="🌅 Create Evening Service"
		/>
	),
	args: {
		entity: {
			id: 0,
			title: "Evening Prayer Service",
			time: "6:00 PM",
		} as ServiceType,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ServiceType) =>
			console.log("Evening service created:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**🌅 Pre-filled Evening Service Creation**

**Click to see:**
- 🎯 Form pre-populated with evening service data
- ⏰ 6:00 PM default time setting
- 📝 "Evening Prayer Service" template
- ✏️ Editable template for quick creation
				`,
			},
		},
	},
};
