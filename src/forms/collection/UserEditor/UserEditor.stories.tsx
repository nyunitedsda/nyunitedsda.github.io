import type { Meta, StoryObj } from "@storybook/react";
import { SnackbarProvider } from "notistack";
import type { UserType } from "../../../api/request/types";
import UserEditor from "./UserEditor";

// Sample user data
const sampleAdminUser: UserType = {
	id: 1,
	email: "admin@nyunitedsda.org",
	firstName: "John",
	lastName: "Doe",
	role: "admin",
	emailVerified: true,
	createdAt: new Date("2025-01-01T00:00:00"),
	updatedAt: new Date("2025-01-15T00:00:00"),
};

const sampleModeratorUser: UserType = {
	id: 2,
	email: "moderator@nyunitedsda.org",
	firstName: "Jane",
	lastName: "Smith",
	role: "moderator",
	emailVerified: true,
	createdAt: new Date("2025-01-05T00:00:00"),
	updatedAt: new Date("2025-01-20T00:00:00"),
};

const sampleGuestUser: UserType = {
	id: 3,
	email: "guest@example.com",
	firstName: "Bob",
	lastName: "Johnson",
	role: "guest",
	emailVerified: false,
	createdAt: new Date("2025-01-10T00:00:00"),
	updatedAt: new Date("2025-01-25T00:00:00"),
};

const sampleMinimalUser: UserType = {
	id: 4,
	email: "minimal@example.com",
	role: "guest",
	emailVerified: false,
	createdAt: new Date("2025-01-15T00:00:00"),
	updatedAt: new Date("2025-01-25T00:00:00"),
};

// Define the meta for the story
const meta: Meta<typeof UserEditor> = {
	title: "Forms/UserEditor",
	component: UserEditor,
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
			description: "User entity to edit (undefined for create mode)",
		},
		onClose: {
			action: "onClose",
			description: "Callback when modal is closed",
		},
		onSuccess: {
			action: "onSuccess",
			description: "Callback when user is successfully saved",
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
		onSuccess: (data: Partial<UserType>) => console.log("User created:", data),
	},
};

// Edit mode - Admin User
export const EditModeAdminUser: Story = {
	args: {
		open: true,
		entity: sampleAdminUser,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<UserType>) =>
			console.log("Admin user updated:", data),
	},
};

// Edit mode - Moderator User
export const EditModeModeratorUser: Story = {
	args: {
		open: true,
		entity: sampleModeratorUser,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<UserType>) =>
			console.log("Moderator user updated:", data),
	},
};

// Edit mode - Guest User
export const EditModeGuestUser: Story = {
	args: {
		open: true,
		entity: sampleGuestUser,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<UserType>) =>
			console.log("Guest user updated:", data),
	},
};

// Edit mode - Minimal User
export const EditModeMinimalUser: Story = {
	args: {
		open: true,
		entity: sampleMinimalUser,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<UserType>) =>
			console.log("Minimal user updated:", data),
	},
};

// Closed modal story
export const ClosedModal: Story = {
	args: {
		open: false,
		entity: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<UserType>) => console.log("User saved:", data),
	},
};

// Create mode with pre-filled data
export const CreateModePreFilled: Story = {
	args: {
		open: true,
		entity: {
			id: 0,
			email: "newuser@nyunitedsda.org",
			firstName: "New",
			lastName: "User",
			role: "guest",
			emailVerified: false,
		} as UserType,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<UserType>) =>
			console.log("Pre-filled user created:", data),
	},
};

// Verified User Example
export const VerifiedUser: Story = {
	args: {
		open: true,
		entity: {
			id: 5,
			email: "verified@nyunitedsda.org",
			firstName: "Verified",
			lastName: "Member",
			role: "moderator",
			emailVerified: true,
		} as UserType,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<UserType>) =>
			console.log("Verified user updated:", data),
	},
};
