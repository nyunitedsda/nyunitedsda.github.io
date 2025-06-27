import type { Meta, StoryObj } from "@storybook/react";
import { SnackbarProvider } from "notistack";
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

// Define the meta for the story
const meta: Meta<typeof AnnouncementEditor> = {
	title: "Forms/AnnouncementEditor",
	component: AnnouncementEditor,
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
			description: "Announcement entity to edit (undefined for create mode)",
		},
		onClose: {
			action: "onClose",
			description: "Callback when modal is closed",
		},
		onSuccess: {
			action: "onSuccess",
			description: "Callback when announcement is successfully saved",
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
		onSuccess: (data: AnnouncementType) =>
			console.log("Announcement created:", data),
	},
};

// Edit mode - Event
export const EditModeEvent: Story = {
	args: {
		open: true,
		entity: sampleEventAnnouncement,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Event announcement updated:", data),
	},
};

// Edit mode - Service
export const EditModeService: Story = {
	args: {
		open: true,
		entity: sampleServiceAnnouncement,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Service announcement updated:", data),
	},
};

// Edit mode - Conference
export const EditModeConference: Story = {
	args: {
		open: true,
		entity: sampleConferenceAnnouncement,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Conference announcement updated:", data),
	},
};

// Edit mode - Zoom
export const EditModeZoom: Story = {
	args: {
		open: true,
		entity: sampleZoomAnnouncement,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Zoom announcement updated:", data),
	},
};

// Recurring event
export const RecurringEvent: Story = {
	args: {
		open: true,
		entity: {
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
};

// Closed modal story
export const ClosedModal: Story = {
	args: {
		open: false,
		entity: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: AnnouncementType) =>
			console.log("Announcement saved:", data),
	},
};

// Create mode with specific event type pre-filled
export const CreateModeService: Story = {
	args: {
		open: true,
		entity: {
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
};

export const CreateModeZoom: Story = {
	args: {
		open: true,
		entity: {
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
};
