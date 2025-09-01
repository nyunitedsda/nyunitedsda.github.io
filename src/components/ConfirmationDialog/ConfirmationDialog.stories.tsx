import ConfirmationDialog from "@components/ConfirmationDialog";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { action } from "storybook/actions";

const meta: Meta<typeof ConfirmationDialog> = {
	title: "Components/ConfirmationDialog",
	component: ConfirmationDialog,
	tags: ["autodocs"],
	argTypes: {
		title: {
			control: "text",
			description: "The dialog title",
		},
		content: {
			control: "text",
			description: "The dialog content (can be ReactNode)",
		},
		open: {
			control: "boolean",
			description: "Whether the dialog is open",
		},
		cancelLabel: {
			control: "text",
			description: "Label for the cancel button",
		},
		confirmLabel: {
			control: "text",
			description: "Label for the confirm button",
		},
		onConfirm: {
			action: "confirmed",
			description: "Callback when confirm button is clicked",
		},
		onClose: {
			action: "closed",
			description: "Callback when dialog is closed",
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A reusable confirmation dialog component for user actions. Supports custom titles, content, and button labels.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component for stories
const InteractiveWrapper = ({
	children,
	buttonText = "Open Dialog",
}: {
	children: (props: { open: boolean; onClose: () => void }) => React.ReactNode;
	buttonText?: string;
}) => {
	const [open, setOpen] = useState(false);

	return (
		<Box>
			<Button variant="contained" onClick={() => setOpen(true)}>
				{buttonText}
			</Button>
			{children({ open, onClose: () => setOpen(false) })}
		</Box>
	);
};

export const Default: Story = {
	render: (args) => (
		<InteractiveWrapper buttonText="Open Dialog">
			{({ open, onClose }) => (
				<ConfirmationDialog
					{...args}
					title={args.title}
					content={args.content}
					open={open}
					onClose={onClose}
					onConfirm={() => {
						action("confirmed")();
						onClose();
					}}
				/>
			)}
		</InteractiveWrapper>
	),
	args: {
		title: "Confirm Action",
		content: "Are you sure you want to proceed with this action?",
	},
	parameters: {
		docs: {
			description: {
				story:
					"The default confirmation dialog with standard title and content. Uses default button labels 'Cancel' and 'Confirm'.",
			},
		},
	},
};

export const DeleteConfirmation: Story = {
	render: (args) => (
		<InteractiveWrapper buttonText="Delete Item">
			{({ open, onClose }) => (
				<ConfirmationDialog
					{...args}
					title={args.title}
					content={args.content}
					open={open}
					onClose={onClose}
					onConfirm={() => {
						action("delete confirmed")();
						onClose();
					}}
				/>
			)}
		</InteractiveWrapper>
	),
	args: {
		title: "Delete Item",
		content:
			"This action cannot be undone. Are you sure you want to delete this item?",
		cancelLabel: "Cancel",
		confirmLabel: "Delete",
	},
	parameters: {
		docs: {
			description: {
				story:
					"A destructive action confirmation dialog for delete operations. Features warning text and custom button labels to clearly indicate the permanent nature of the action.",
			},
		},
	},
};

export const CustomLabels: Story = {
	render: (args) => (
		<InteractiveWrapper buttonText="Check Unsaved Changes">
			{({ open, onClose }) => (
				<ConfirmationDialog
					{...args}
					title={args.title}
					content={args.content}
					open={open}
					onClose={onClose}
					onConfirm={() => {
						action("save confirmed")();
						onClose();
					}}
				/>
			)}
		</InteractiveWrapper>
	),
	args: {
		title: "Save Changes",
		content: "You have unsaved changes. Would you like to save before leaving?",
		cancelLabel: "Don't Save",
		confirmLabel: "Save Changes",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Demonstrates custom button labels for context-specific actions. Shows how to use meaningful labels like 'Don't Save' and 'Save Changes' instead of generic 'Cancel' and 'Confirm'.",
			},
		},
	},
};

export const LongContent: Story = {
	render: (args) => (
		<InteractiveWrapper buttonText="View Terms & Conditions">
			{({ open, onClose }) => (
				<ConfirmationDialog
					{...args}
					title={args.title}
					content={args.content}
					open={open}
					onClose={onClose}
					onConfirm={() => {
						action("terms accepted")();
						onClose();
					}}
				/>
			)}
		</InteractiveWrapper>
	),
	args: {
		title: "Terms and Conditions",
		content: (
			<Typography variant="body2">
				By proceeding, you agree to our terms and conditions. This includes but
				is not limited to:
				<br />
				<br />• Data processing and storage policies
				<br />• User behavior guidelines
				<br />• Privacy protection measures
				<br />• Service availability terms
				<br />
				<br />
				Please read our full terms of service for complete details. Do you
				accept these terms?
			</Typography>
		),
		cancelLabel: "Decline",
		confirmLabel: "Accept",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Example with longer content text that demonstrates how the dialog handles extensive information. Shows how the dialog layout adapts to accommodate more detailed content.",
			},
		},
	},
};

export const WithReactContent: Story = {
	render: (args) => (
		<InteractiveWrapper buttonText="⚠️ Delete Account">
			{({ open, onClose }) => (
				<ConfirmationDialog
					{...args}
					title={args.title}
					content={args.content}
					open={open}
					onClose={onClose}
					onConfirm={() => {
						action("account deleted")();
						onClose();
					}}
				/>
			)}
		</InteractiveWrapper>
	),
	args: {
		title: "Account Deletion Warning",
		content: (
			<Box>
				<Typography variant="body1" color="error" gutterBottom>
					⚠️ This is a permanent action!
				</Typography>
				<Typography variant="body2" gutterBottom>
					Deleting your account will:
				</Typography>
				<Box component="ul" sx={{ margin: 0, paddingLeft: 2 }}>
					<li>Remove all your personal data</li>
					<li>Cancel any active subscriptions</li>
					<li>Delete all your content and files</li>
					<li>Revoke access to all services</li>
				</Box>
				<Typography variant="body2" sx={{ mt: 2, fontWeight: "bold" }}>
					Type "DELETE" to confirm this action.
				</Typography>
			</Box>
		),
		cancelLabel: "Keep Account",
		confirmLabel: "Delete Forever",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Demonstrates using React components as content instead of plain text. Shows how to create rich, formatted content with typography, lists, colors, and complex layouts within the dialog.",
			},
		},
	},
};

export const Interactive: Story = {
	render: (args) => (
		<InteractiveWrapper>
			{({ open, onClose }) => (
				<ConfirmationDialog
					{...args}
					title={args.title}
					content={args.content}
					open={open}
					onClose={onClose}
					onConfirm={() => {
						action("confirmed")();
						onClose();
					}}
				/>
			)}
		</InteractiveWrapper>
	),
	args: {
		title: "Interactive Dialog",
		content:
			"Click the button to open this dialog. Try the confirm and cancel actions!",
		cancelLabel: "Cancel",
		confirmLabel: "Confirm",
	},
	parameters: {
		docs: {
			description: {
				story:
					"A playground story for interactive testing. Use this to experiment with the dialog component and test different interactions in a controlled environment.",
			},
		},
	},
};

export const MultipleActions: Story = {
	render: () => (
		<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
			<InteractiveWrapper buttonText="Delete Item">
				{({ open, onClose }) => (
					<ConfirmationDialog
						title="Delete Item"
						content="Are you sure you want to delete this item?"
						open={open}
						onClose={onClose}
						onConfirm={() => {
							action("item deleted")();
							onClose();
						}}
						cancelLabel="Cancel"
						confirmLabel="Delete"
					/>
				)}
			</InteractiveWrapper>

			<InteractiveWrapper buttonText="Save Changes">
				{({ open, onClose }) => (
					<ConfirmationDialog
						title="Save Changes"
						content="Do you want to save your changes before leaving?"
						open={open}
						onClose={onClose}
						onConfirm={() => {
							action("changes saved")();
							onClose();
						}}
						cancelLabel="Don't Save"
						confirmLabel="Save"
					/>
				)}
			</InteractiveWrapper>

			<InteractiveWrapper buttonText="Sign Out">
				{({ open, onClose }) => (
					<ConfirmationDialog
						title="Sign Out"
						content="Are you sure you want to sign out of your account?"
						open={open}
						onClose={onClose}
						onConfirm={() => {
							action("signed out")();
							onClose();
						}}
						cancelLabel="Stay Signed In"
						confirmLabel="Sign Out"
					/>
				)}
			</InteractiveWrapper>
		</Box>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Multiple confirmation dialogs showcasing different use cases side by side. Demonstrates various scenarios like deletion, saving changes, and signing out with appropriate messaging and button labels.",
			},
		},
	},
};

export const StaticClosed: Story = {
	args: {
		title: "Hidden Dialog",
		content:
			"This dialog is closed by default. Toggle the 'open' control to see it.",
		open: false,
		onConfirm: action("confirmed"),
		onClose: action("closed"),
	},
	parameters: {
		docs: {
			description: {
				story:
					"Example of the dialog in its closed state. Use the controls to open it and test the interaction.",
			},
		},
	},
};
