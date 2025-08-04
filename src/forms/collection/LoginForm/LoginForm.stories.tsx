// biome-ignore lint/nursery/noUnresolvedImports: Storybook types are intentionally imported from @storybook/react-vite
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SnackbarProvider } from "notistack";
import LoginForm from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
	title: "Forms/LoginForm",
	component: LoginForm,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<SnackbarProvider maxSnack={3}>
				<div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
					<Story />
				</div>
			</SnackbarProvider>
		),
	],
	parameters: {
		docs: {
			description: {
				component:
					'A form component used for user authentication. It includes username and password fields with validation and a "remember me" option.',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story showing the login form
export const Default: Story = {
	args: {},
};

// Story showing form with filled data
export const FilledForm: Story = {
	render: () => {
		// In a real storybook implementation, you might have a controlled component here
		// that pre-fills the form with values. Since LoginForm doesn't accept props for
		// initial values directly (they're hardcoded), this is just for demonstration.
		return <LoginForm />;
	},
	parameters: {
		docs: {
			description: {
				story:
					"Example of a login form that would have pre-filled values. Note: The current implementation does not support directly setting values via props.",
			},
		},
	},
};

// Mobile view
export const MobileView: Story = {
	args: {},
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
		docs: {
			description: {
				story: "The login form as it appears on mobile devices.",
			},
		},
	},
};

// Dark theme
export const DarkTheme: Story = {
	args: {},
	parameters: {
		backgrounds: {
			default: "dark",
		},
		docs: {
			description: {
				story: "The login form as it appears in dark mode.",
			},
		},
	},
};
