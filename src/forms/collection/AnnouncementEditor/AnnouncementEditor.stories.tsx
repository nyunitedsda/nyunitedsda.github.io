import type { Meta, StoryObj } from "@storybook/react";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import type { AnnouncementType } from "../../../api/request/types";
import AnnouncementEditor from "./AnnouncementEditor";

// Sample announcement data for different event types
const sampleEventAnnouncement: AnnouncementType = {
	id: 1,
	title: "Community Fellowship Dinner",
	type: "event",
	description:
		"Join us for a wonderful evening of fellowship and great food. All are welcome!",
	location: "Fellowship Hall",
	recurring: false,
	event_date: new Date("2025-07-15T18:00:00"),
	date_format: "MM/DD/YYYY",
	author_id: 1,
};

const sampleServiceAnnouncement: AnnouncementType = {
	id: 2,
	title: "Sunday Morning Worship",
	type: "service",
	description: "Weekly worship service with inspiring music and fellowship",
	location: "Main Sanctuary",
	sermon: "Faith in Action",
	speaker: "Pastor John Smith",
	recurring: true,
	event_date: new Date("2025-07-06T10:00:00"),
	date_format: "MM/DD/YYYY",
	author_id: 1,
};

const sampleConferenceAnnouncement: AnnouncementType = {
	id: 3,
	title: "Annual Church Conference",
	type: "conference",
	description:
		"Join us for our annual conference with special speakers and workshops",
	location: "Conference Center",
	conference_code: "CONF2025",
	phone_number: "+1-555-123-4567",
	speaker: "Dr. Sarah Johnson",
	recurring: false,
	event_date: new Date("2025-08-20T09:00:00"),
	date_format: "MM/DD/YYYY",
	author_id: 1,
};

const sampleZoomAnnouncement: AnnouncementType = {
	id: 4,
	title: "Virtual Bible Study",
	type: "zoom",
	description: "Weekly Bible study session conducted online via Zoom",
	location: "Zoom",
	zoom_id: "123-456-789",
	passcode: "BibleStudy2025",
	recurring: true,
	event_date: new Date("2025-07-03T19:00:00"),
	date_format: "MM/DD/YYYY",
	author_id: 1,
};

// Interactive wrapper component with open button
const InteractiveWrapper = ({
	data,
	onClose,
	onSuccess,
	buttonText = "Open Editor",
}: {
	data?: AnnouncementType;
	onClose?: () => void;
	onSuccess?: (data: AnnouncementType) => void;
	buttonText?: string;
}) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		onClose?.();
	};

	const handleSuccess = (data: AnnouncementType) => {
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
			<AnnouncementEditor
				open={open}
				data={data}
				onClose={handleClose}
				onSuccess={handleSuccess}
			/>
		</div>
	);
};

// Define the meta for the story
const meta: Meta<typeof AnnouncementEditor> = {
	title: "Forms/AnnouncementEditor",
	component: AnnouncementEditor,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<SnackbarProvider maxSnack={3}>
				<div
					style={{
						minHeight: "100vh",
						padding: "20px",
						backgroundColor: "#f5f5f5",
					}}
				>
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
		data: {
			control: "object",
			description: "Announcement data to edit (undefined for create mode)",
			table: {
				type: { summary: "AnnouncementType | undefined" },
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
			description: "Callback when announcement is successfully saved",
			table: {
				type: { summary: "(data: AnnouncementType) => void" },
			},
		},
	},
	parameters: {
		docs: {
			description: {
				component: `
The AnnouncementEditor is a comprehensive form component for creating and editing church announcements. 
It supports different announcement types including events, services, conferences, and Zoom meetings.

## Features:
- ✅ Dynamic form fields based on announcement type
- ✅ Form validation and error handling
- ✅ Date/time pickers for scheduling
- ✅ Recurring event support
- ✅ Modal interface with responsive design
- ✅ Integration with notification system

## Usage:
Use this component when you need to allow users to create or edit announcements. 
The form automatically adapts its fields based on the selected announcement type.
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
			buttonText="🆕 Create New Announcement"
		/>
	),
	args: {
		data: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Announcement created:", data),
	},
	parameters: {
		docs: {
			description: {
				story:
					"**🆕 Create a new announcement** - Click the button to open the form and start from scratch. Build any type of announcement with dynamic form fields.",
			},
			source: {
				code: `
const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>
  Create New Announcement
</button>

<AnnouncementEditor
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

// Interactive playground story
export const Playground: Story = {
	render: (args) => {
		const PlaygroundWrapper = () => {
			const [open, setOpen] = useState(false);
			const [selectedEntity, setSelectedEntity] = useState<
				AnnouncementType | undefined
			>(args.data);

			const entityOptions = [
				{ label: "None (Create Mode)", value: undefined },
				{ label: "Event", value: sampleEventAnnouncement },
				{ label: "Service", value: sampleServiceAnnouncement },
				{ label: "Conference", value: sampleConferenceAnnouncement },
				{ label: "Zoom", value: sampleZoomAnnouncement },
			];

			return (
				<div style={{ padding: "20px" }}>
					<div style={{ marginBottom: "20px" }}>
						<label
							style={{
								display: "block",
								marginBottom: "8px",
								fontWeight: "bold",
							}}
						>
							Select Announcement Type:
						</label>
						<select
							title="Select announcement type"
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
					<button
						onClick={() => setOpen(true)}
						style={{
							padding: "12px 24px",
							fontSize: "16px",
							backgroundColor: "#28a745",
							color: "white",
							border: "none",
							borderRadius: "8px",
							cursor: "pointer",
							boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
						}}
					>
						🎮 Open Playground
					</button>
					<AnnouncementEditor
						open={open}
						data={selectedEntity}
						onClose={() => setOpen(false)}
						onSuccess={(data) => {
							console.log("Announcement saved:", data);
							setOpen(false);
						}}
					/>
				</div>
			);
		};

		return <PlaygroundWrapper />;
	},
	args: {
		data: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Announcement saved:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**🎮 Interactive Playground** - The ultimate testing ground! 

**Try these interactions:**
- 🔄 Select different announcement types from the dropdown
- 🚀 Click "Open Playground" to launch the editor
- 📝 Notice how form fields dynamically change based on announcement type
- 🔍 Check the Actions panel to see callback results

**Pro tip:** This is the best way to understand the component's full capabilities!
				`,
			},
			source: {
				code: `
const [open, setOpen] = useState(false);
const [data, setEntity] = useState(undefined);

// Dynamic data selection
<select onChange={(e) => setEntity(options[e.target.value])}>
  <option value="undefined">Create Mode</option>
  <option value="event">Event</option>
  <option value="service">Service</option>
  // ... more options
</select>

<button onClick={() => setOpen(true)}>
  Open Playground
</button>

<AnnouncementEditor
  open={open}
  data={data}
  onClose={() => setOpen(false)}
  onSuccess={handleSuccess}
/>`,
			},
		},
	},
};

// Edit mode - Event
export const EditModeEvent: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="📅 Edit Event Announcement"
		/>
	),
	args: {
		data: sampleEventAnnouncement,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Event announcement updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**📅 Event Announcement Editor**

**Click the button to see:**
- 🏢 Event-specific fields: location, event_date
- 🔄 Recurring toggle functionality
- 📱 Date/time picker interactions
- ✏️ Pre-populated form with sample event data
				`,
			},
			source: {
				code: `
const eventData = {
  id: 1,
  title: "Community Fellowship Dinner",
  type: "event",
  description: "Join us for fellowship and great food!",
  location: "Fellowship Hall",
  recurring: false,
  event_date: new Date("2025-07-15T18:00:00"),
  // ... other fields
};

<button onClick={() => setOpen(true)}>
  Edit Event
</button>

<AnnouncementEditor
  open={open}
  data={eventData}
  onClose={handleClose}
  onSuccess={handleUpdate}
/>`,
			},
		},
	},
};

// Edit mode - Service
export const EditModeService: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="⛪ Edit Service Announcement"
		/>
	),
	args: {
		data: sampleServiceAnnouncement,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Service announcement updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**⛪ Service Announcement Editor**

**Click to explore service-specific features:**
- 🎤 **Speaker field** - Who's delivering the message
- 📖 **Sermon field** - The sermon title/topic
- 🔁 **Recurring toggle** - For weekly services
- 📍 **Location** - Pre-set to "Main Sanctuary"
				`,
			},
			source: {
				code: `
const serviceData = {
  type: "service",
  title: "Sunday Morning Worship",
  speaker: "Pastor John Smith",
  sermon: "Faith in Action",
  location: "Main Sanctuary",
  recurring: true,
  // ... other fields
};

<button onClick={() => setOpen(true)}>
  Edit Service
</button>`,
			},
		},
	},
};

// Edit mode - Conference
export const EditModeConference: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="🏛️ Edit Conference Announcement"
		/>
	),
	args: {
		data: sampleConferenceAnnouncement,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Conference announcement updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**🏛️ Conference Announcement Editor**

**Click to see conference-specific features:**
- 🔢 **Conference Code** - Registration identifier (e.g., "CONF2025")
- ☎️ **Phone Number** - Contact for registration
- 🎯 **Speaker** - Featured conference speaker
- 📍 **Location** - Conference venue details
				`,
			},
			source: {
				code: `
const conferenceData = {
  type: "conference",
  title: "Annual Church Conference",
  conference_code: "CONF2025",
  phone_number: "+1-555-123-4567",
  speaker: "Dr. Sarah Johnson",
  location: "Conference Center",
  // ... other fields
};

<button onClick={() => setOpen(true)}>
  Edit Conference
</button>`,
			},
		},
	},
};

// Edit mode - Zoom
export const EditModeZoom: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="💻 Edit Zoom Meeting"
		/>
	),
	args: {
		data: sampleZoomAnnouncement,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Zoom announcement updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**💻 Zoom Meeting Announcement Editor**

**Click to explore Zoom-specific features:**
- 🆔 **Zoom ID** - Meeting identifier (e.g., "123-456-789")
- 🔐 **Passcode** - Meeting password for security
- 📍 **Location** - Automatically set to "Zoom"
- 🔁 **Recurring** - Perfect for weekly virtual meetings
				`,
			},
			source: {
				code: `
const zoomData = {
  type: "zoom",
  title: "Virtual Bible Study",
  zoom_id: "123-456-789",
  passcode: "BibleStudy2025",
  location: "Zoom",
  recurring: true,
  // ... other fields
};

<button onClick={() => setOpen(true)}>
  Edit Zoom Meeting
</button>`,
			},
		},
	},
};

// Recurring event
export const RecurringEvent: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="🔄 View Recurring Event"
		/>
	),
	args: {
		data: {
			...sampleEventAnnouncement,
			id: 5,
			title: "Weekly Prayer Meeting",
			description: "Join us every Wednesday for prayer and fellowship",
			recurring: true,
			event_date: new Date("2025-07-02T19:00:00"),
		},
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Recurring event updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**🔄 Recurring Event Example**

**Click to see how recurring events work:**
- ✅ Recurring toggle is enabled
- 📅 Shows how weekly events are configured
- 🔄 Form behavior changes for recurring items
- 📋 Notice the recurring-specific fields and options
				`,
			},
		},
	},
};

// Form validation demo
export const FormValidationDemo: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="🚨 Test Form Validation"
		/>
	),
	args: {
		data: {
			id: 0,
			title: "", // Empty to trigger validation
			type: "event",
			description: "",
			location: "",
			recurring: false,
			date_format: "MM/DD/YYYY",
			author_id: 1,
		} as AnnouncementType,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Announcement saved:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**🚨 Form Validation Demo**

**Click the button to see validation in action:**
- ❌ Required fields show error states when empty
- 📋 Helpful validation messages guide users
- 🚫 Submit button behavior with invalid data
- ✅ Real-time validation feedback

**Try this:** Click "Test Form Validation" and attempt to submit with empty fields!
				`,
			},
			source: {
				code: `
// Example with validation errors
const invalidEntity = {
  title: "", // ❌ Required field empty
  description: "", // ❌ Required field empty
  location: "", // ❌ Required field empty
  type: "event",
  // ... other fields
};

<button onClick={() => setOpen(true)}>
  Test Validation
</button>

// Form will show validation errors
<AnnouncementEditor
  open={open}
  data={invalidEntity}
  // ... other props
/>`,
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
				AnnouncementType | undefined
			>(undefined);

			const entityOptions = [
				{ label: "None (Create Mode)", value: undefined },
				{ label: "Event", value: sampleEventAnnouncement },
				{ label: "Service", value: sampleServiceAnnouncement },
				{ label: "Conference", value: sampleConferenceAnnouncement },
				{ label: "Zoom", value: sampleZoomAnnouncement },
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
							This demonstrates the component's default closed state. Select an
							data type and click the button to see it open.
						</p>
						<div style={{ marginBottom: "12px" }}>
							<label
								style={{
									display: "block",
									marginBottom: "8px",
									fontWeight: "bold",
								}}
							>
								Pre-select data for modal:
							</label>
							<select
								title="Select announcement type for modal"
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
						{open ? "✅ Modal is Open" : "👆 Click to Open Modal"}
					</button>
					<AnnouncementEditor
						open={open}
						data={selectedEntity}
						onClose={() => setOpen(false)}
						onSuccess={(data) => {
							console.log("Announcement saved:", data);
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
		onSuccess: (data: AnnouncementType) =>
			console.log("Announcement saved:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**👻 Closed Modal State**

**Interactive demo of component lifecycle:**
- 🎯 **Default state** - Component starts closed (normal behavior)
- 📝 **Pre-configure data** - Select announcement type before opening
- 👆 **Manual trigger** - Click button to open modal
- 🔄 **State management** - See how open/close states work

**Use case:** This is how the component behaves in real applications.
				`,
			},
			source: {
				code: `
const [open, setOpen] = useState(false); // 👈 Starts closed
const [data, setEntity] = useState(undefined);

// Component starts closed
<AnnouncementEditor
  open={open} // false by default
  data={data}
  onClose={() => setOpen(false)}
  onSuccess={(data) => {
    handleSuccess(data);
    setOpen(false); // Close after success
  }}
/>

// User interaction opens modal
<button onClick={() => setOpen(true)}>
  Open Editor
</button>`,
			},
		},
	},
};

// Create mode with specific event type pre-filled
export const CreateModeService: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="⛪ Create Service Announcement"
		/>
	),
	args: {
		data: {
			id: 0,
			title: "",
			type: "service",
			description: "",
			location: "Main Sanctuary",
			recurring: false,
			date_format: "MM/DD/YYYY",
			author_id: 1,
		} as AnnouncementType,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Service announcement created:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**⛪ Pre-configured Service Creation**

**Click to see:**
- 🎯 Form pre-configured for service type
- 📍 Location pre-filled with "Main Sanctuary"
- 🎤 Service-specific fields ready for input
- 🆕 Create mode with intelligent defaults
				`,
			},
		},
	},
};

export const CreateModeZoom: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="💻 Create Zoom Meeting"
		/>
	),
	args: {
		data: {
			id: 0,
			title: "",
			type: "zoom",
			description: "",
			location: "Zoom",
			recurring: false,
			date_format: "MM/DD/YYYY",
			author_id: 1,
		} as AnnouncementType,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Zoom announcement created:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**💻 Pre-configured Zoom Creation**

**Click to explore:**
- 🎯 Form pre-configured for Zoom meetings
- 📍 Location automatically set to "Zoom"
- 🆔 Zoom-specific fields (ID, passcode) ready
- 🆕 Create mode with smart defaults for virtual meetings
				`,
			},
		},
	},
};

// Mobile responsive demo
export const MobileView: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="📱 Test Mobile View"
		/>
	),
	args: {
		data: sampleEventAnnouncement,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Announcement updated:", data),
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
		docs: {
			description: {
				story: `
**📱 Mobile Responsive Design**

**Click the button to test mobile behavior:**
- 📐 **Layout adaptation** - Form fields stack nicely on mobile
- 👆 **Touch-friendly** - Larger tap targets and spacing
-  **Scroll behavior** - Modal handles mobile scrolling smoothly
- 🔄 **Responsive fields** - All form elements adapt to mobile screens

**Note:** This story is displayed in mobile viewport by default.
				`,
			},
		},
	},
};

// Dark theme demo (if supported)
export const DarkTheme: Story = {
	render: (args) => (
		<div
			style={{
				backgroundColor: "#1a1a1a",
				minHeight: "100vh",
				padding: "20px",
			}}
		>
			<SnackbarProvider maxSnack={3}>
				<InteractiveWrapper
					data={args.data}
					onClose={args.onClose}
					onSuccess={args.onSuccess}
					buttonText="🌙 Test Dark Theme"
				/>
			</SnackbarProvider>
		</div>
	),
	args: {
		data: sampleConferenceAnnouncement,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Announcement updated:", data),
	},
	parameters: {
		backgrounds: {
			default: "dark",
			values: [
				{ name: "dark", value: "#1a1a1a" },
				{ name: "light", value: "#ffffff" },
			],
		},
		docs: {
			description: {
				story: `
**🌙 Dark Theme Compatibility**

**Click the button to test theme compatibility:**
- 🎨 **Theme adaptation** - Form looks great on dark backgrounds
- ✨ **UI contrast** - Text remains clearly readable
- 🌓 **Use background controls** to toggle between light/dark
- 📋 **All form elements** work beautifully in both themes

**Accessibility features:**
- Proper contrast ratios maintained
- Form elements remain clearly visible
- Interactive states work in both themes
				`,
			},
		},
	},
};
