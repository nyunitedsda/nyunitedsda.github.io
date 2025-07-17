import type { Meta, StoryObj } from "@storybook/react";
import type { UserType } from "../../../api/request/types";
import UserEditor from "./UserEditor";

import InteractiveStory from "../../../components/InteractiveStory/InteractiveStory";
import userData, { initialValues } from "../../../test/mock_data/users";
import type { UserEditorProps } from "./types";

// Define the meta for the story
const meta: Meta<typeof UserEditor> = {
	title: "Forms/UserEditor",
	component: UserEditor,
	tags: ["autodocs"],
	argTypes: {
		open: {
			control: "boolean",
			description: "Whether the modal is open",
			defaultValue: false,
		},
		data: {
			control: "object",
			description: "Initial values for the form fields",
			defaultValue: initialValues,
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"UserEditor component for creating or editing user profiles.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create mode story
export const CreateMode: Story = {
	render: (args) => (
		<InteractiveStory {...args} buttonText="🆕 Create New User">
			<UserEditor {...(args as UserEditorProps)} />
		</InteractiveStory>
	),
	args: {
		data: initialValues,
		buttonText: "🆕 Create New User",
		extraProps: {
			onClose: () => console.log("Modal closed"),
			onSuccess: (data: Partial<UserType>) =>
				console.log("User created:", data),
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					"**🆕 Create a new user** - Click the button to open the user form and start from scratch.",
			},
			source: {
				code: `
const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>
  Create New User
</button>

<UserEditor
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

// Edit mode - Admin User
export const EditModeAdminUser: Story = {
	render: (args) => (
		<InteractiveStory {...args}>
			<UserEditor {...(args as UserEditorProps)} />
		</InteractiveStory>
	),
	args: {
		data: userData[0],
		buttonText: "👑 Edit Admin User",
		extraProps: {
			onClose: () => console.log("Modal closed"),
			onSuccess: (data: Partial<UserType>) =>
				console.log("User updated:", data),
		},
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
		<InteractiveStory {...args}>
			<UserEditor {...(args as UserEditorProps)} />
		</InteractiveStory>
	),
	args: {
		data: userData.find((user) => user.role === "moderator") || initialValues,
		buttonText: "🛡️ Edit Moderator User",
		extraProps: {
			onClose: () => console.log("Modal closed"),
			onSuccess: (data: Partial<UserType>) =>
				console.log("User created:", data),
		},
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
		<InteractiveStory {...args}>
			<UserEditor {...(args as UserEditorProps)} />
		</InteractiveStory>
	),
	args: {
		buttonText: "👤 Edit Guest User",
		data: userData.find((user) => user.role === "guest") || initialValues,
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
		<InteractiveStory {...args}>
			<UserEditor {...(args as UserEditorProps)} />
		</InteractiveStory>
	),
	args: {
		buttonText: "📝 Edit Minimal User",
		data:
			userData.find((user) => user.username === "minimaluser") || initialValues,
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
