import {
	InteractiveStoryWrapper as InteractiveStory,
	type InteractiveStoryProps,
} from "@components/InteractiveStory";
import { UserEditor, type UserEditorProps } from "@forms/collection";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { initialUser, users as userData } from "@test/mock_data";
import type { UserDT } from "@/api";

// Define the meta for the story
const meta: Meta<UserEditorProps> = {
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
			defaultValue: initialUser,
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
type Story = StoryObj<InteractiveStoryProps<UserEditorProps>>;

// Create mode story
export const CreateMode: Story = {
	render: (args) => (
		<InteractiveStory {...(args as StoryObj)} buttonText="🆕 Create New User">
			<UserEditor {...(args.extraProps as UserEditorProps)} />
		</InteractiveStory>
	),
	args: {
		buttonText: "🆕 Create New User",
		extraProps: {
			open: false,
			data: initialUser as UserDT,
			onClose: () => console.log("Modal closed"),
			onSuccess: (data?: UserDT) => console.log("User created:", data),
		} as UserEditorProps,
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

export const EditModeAdminUser: Story = {
	render: (args) => (
		<InteractiveStory {...(args as StoryObj)}>
			<UserEditor {...(args.extraProps as UserEditorProps)} />
		</InteractiveStory>
	),
	args: {
		buttonText: "👑 Edit Admin User",
		extraProps: {
			data: userData[0] as UserDT,
			open: false,
			onClose: () => console.log("Modal closed"),
			onSuccess: (data?: Partial<UserDT>) => console.log("User updated:", data),
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

export const EditModeModeratorUser: Story = {
	render: (args) => (
		<InteractiveStory {...(args as StoryObj)}>
			<UserEditor {...(args.extraProps as UserEditorProps)} />
		</InteractiveStory>
	),
	args: {
		buttonText: "🛡️ Edit Moderator User",

		extraProps: {
			data: userData.find((user) => user.role_id === 2) || initialUser,
			onClose: () => console.log("Modal closed"),
			onSuccess: (data?: Partial<UserDT>) => console.log("User created:", data),
		} as UserEditorProps,

		open: true,
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
- 📊 Moderation privileges`,
			},
		},
	},
};

export const EditModeGuestUser: Story = {
	render: (args) => (
		<InteractiveStory {...(args as StoryObj)}>
			<UserEditor {...(args.extraProps as UserEditorProps)} />
		</InteractiveStory>
	),
	args: {
		buttonText: "👤 Edit Guest User",

		extraProps: {
			// open: false,
			data: userData.find((user) => user.role_id === 1) || initialUser,
			onClose: () => console.log("Modal closed"),
			onSuccess: (data: Partial<UserDT>) =>
				console.log("Guest user updated:", data),
		} as UserEditorProps,
	},
	parameters: {
		docs: {
			description: {
				story: `
						**👤 Guest User Editor**

** Click to see:**
					- 👋 Guest role limitations
- ❌ Unverified email status`,
			},
		},
	},
};

export const EditModeMinimalUser: Story = {
	render: (args) => (
		<InteractiveStory {...(args as StoryObj)}>
			<UserEditor {...(args.extraProps as UserEditorProps)} />
		</InteractiveStory>
	),
	args: {
		buttonText: "📝 Edit Minimal User",

		extraProps: {
			// open: false,
			onClose: () => console.log("Modal closed"),
			onSuccess: (data: Partial<UserDT>) =>
				console.log("Minimal user updated:", data),
			data:
				userData.find((user) => user.username === "minimaluser") || initialUser,
		} as UserEditorProps,
	},
	parameters: {
		docs: {
			description: {
				story: `
	**📝 Minimal User Editor**

** Click to see:**
	- 📧 Email - only user profile
		- 👋 Guest role assignment
			- ❌ No name information
				- 🔓 Basic access level
					`,
			},
		},
	},
};
