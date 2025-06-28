import type { Meta, StoryObj } from "@storybook/react";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
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
	render: (args) => (
		<InteractiveWrapper
			entity={args.entity}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="🆕 Create New User"
		/>
	),
	args: {
		entity: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<UserType>) => console.log("User created:", data),
	},
	parameters: {
		docs: {
			description: {
				story: "**🆕 Create a new user** - Click the button to open the user form and start from scratch.",
			},
			source: {
				code: `
const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>
  Create New User
</button>

<UserEditor
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

// Edit mode - Admin User
export const EditModeAdminUser: Story = {
	render: (args) => (
		<InteractiveWrapper
			entity={args.entity}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="👑 Edit Admin User"
		/>
	),
	args: {
		entity: sampleAdminUser as Partial<UserType>,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<UserType>) =>
			console.log("Admin user updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**👑 Admin User Editor**

**Click to see:**
- 🔑 Admin role management
- ✅ Email verification status
- 👤 Complete user profile
- 🛡️ Administrator privileges
				`,
			},
		},
	},
};

// Edit mode - Moderator User
export const EditModeModeratorUser: Story = {
	render: (args) => (
		<InteractiveWrapper
			entity={args.entity}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="🛡️ Edit Moderator User"
		/>
	),
	args: {
		entity: sampleModeratorUser as Partial<UserType>,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<UserType>) =>
			console.log("Moderator user updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**🛡️ Moderator User Editor**

**Click to explore:**
- 🔧 Moderator role configuration
- ✅ Verified email status
- 👥 User management capabilities
- 📊 Moderation privileges
				`,
			},
		},
	},
};

// Edit mode - Guest User
export const EditModeGuestUser: Story = {
	render: (args) => (
		<InteractiveWrapper
			entity={args.entity}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="👤 Edit Guest User"
		/>
	),
	args: {
		entity: sampleGuestUser as Partial<UserType>,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<UserType>) =>
			console.log("Guest user updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**👤 Guest User Editor**

**Click to see:**
- 👋 Guest role limitations
- ❌ Unverified email status
- 📝 Basic user information
- 🔓 Limited access privileges
				`,
			},
		},
	},
};

// Edit mode - Minimal User
export const EditModeMinimalUser: Story = {
	render: (args) => (
		<InteractiveWrapper
			entity={args.entity}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="📝 Edit Minimal User"
		/>
	),
	args: {
		entity: sampleMinimalUser as Partial<UserType>,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<UserType>) =>
			console.log("Minimal user updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**📝 Minimal User Editor**

**Click to see:**
- 📧 Email-only user profile
- 👋 Guest role assignment
- ❌ No name information
- 🔓 Basic access level
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
			const [selectedEntity, setSelectedEntity] = useState<Partial<UserType> | undefined>(undefined);

			const entityOptions = [
				{ label: "None (Create Mode)", value: undefined },
				{ label: "Admin User", value: sampleAdminUser as Partial<UserType> },
				{ label: "Moderator User", value: sampleModeratorUser as Partial<UserType> },
				{ label: "Guest User", value: sampleGuestUser as Partial<UserType> },
				{ label: "Minimal User", value: sampleMinimalUser as Partial<UserType> },
			];

			return (
				<div style={{ padding: "20px" }}>
					<div style={{ marginBottom: "20px", padding: "16px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
						<h4 style={{ margin: "0 0 12px 0", color: "#333" }}>👻 Component State Demo</h4>
						<p style={{ margin: "0 0 16px 0", color: "#666" }}>
							This demonstrates the component's default closed state. Select a user type and click the button to see it open.
						</p>
						<div style={{ marginBottom: "12px" }}>
							<label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
								Pre-select user for modal:
							</label>
							<select
								title="Select user type for modal"
								value={entityOptions.findIndex(opt => opt.value === selectedEntity)}
								onChange={(e) => setSelectedEntity(entityOptions[Number(e.target.value)].value)}
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
						{open ? "✅ Modal is Open" : "👆 Click to Open User Editor"}
					</button>
					<UserEditor
						open={open}
						entity={selectedEntity}
						onClose={() => setOpen(false)}
						onSuccess={(data) => {
							console.log("User saved:", data);
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
		onSuccess: (data: Partial<UserType>) => console.log("User saved:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**👻 Closed Modal State**

**Interactive demo of component lifecycle:**
- 🎯 **Default state** - Component starts closed (normal behavior)
- 📝 **Pre-configure data** - Select user type before opening
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
			buttonText="📝 Create Pre-filled User"
		/>
	),
	args: {
		entity: {
			id: 0,
			email: "newuser@nyunitedsda.org",
			firstName: "New",
			lastName: "User",
			role: "guest",
			emailVerified: false,
		} as Partial<UserType>,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<UserType>) =>
			console.log("Pre-filled user created:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**📝 Pre-filled User Creation**

**Click to see:**
- 🎯 Form pre-populated with sample data
- 📧 Default email format
- 👤 Standard name fields
- ✏️ Editable template for quick creation
				`,
			},
		},
	},
};

// Verified User Example
export const VerifiedUser: Story = {
	render: (args) => (
		<InteractiveWrapper
			entity={args.entity}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="✅ Edit Verified User"
		/>
	),
	args: {
		entity: {
			id: 5,
			email: "verified@nyunitedsda.org",
			firstName: "Verified",
			lastName: "Member",
			role: "moderator",
			emailVerified: true,
		} as Partial<UserType>,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: Partial<UserType>) =>
			console.log("Verified user updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**✅ Verified User Editor**

**Click to explore:**
- ✅ Email verification status
- 🛡️ Moderator role assignment
- 👤 Complete user profile
- 🔐 Verified account privileges
				`,
			},
		},
	},
};

// Interactive wrapper component with open button
const InteractiveWrapper = ({
	entity,
	onClose,
	onSuccess,
	buttonText = "Open Editor",
}: {
	entity?: Partial<UserType>;
	onClose?: () => void;
	onSuccess?: (data: Partial<UserType>) => void;
	buttonText?: string;
}) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		onClose?.();
	};

	const handleSuccess = (data: Partial<UserType>) => {
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
			<UserEditor
				open={open}
				entity={entity}
				onClose={handleClose}
				onSuccess={handleSuccess}
			/>
		</div>
	);
};
