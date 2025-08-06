import { Box, Button, Stack, Typography } from "@mui/material";
// biome-ignore lint/nursery/noUnresolvedImports: Storybook types are intentionally imported from @storybook/react-vite
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import ProjectModal from "./ProjectModal";

// Define the meta for the story
const meta: Meta<typeof ProjectModal> = {
	title: "Components/ProjectModal",
	component: ProjectModal,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ padding: "20px" }}>
				<Story />
			</div>
		),
	],
	argTypes: {
		open: {
			control: "boolean",
			description: "Whether the modal is open",
		},
		ariaText: {
			control: "text",
			description: "Aria text for accessibility",
		},
		zeroPadding: {
			control: "boolean",
			description: "Whether to remove padding from modal content",
		},
		onClose: {
			action: "onClose",
			description: "Callback function when modal is closed",
		},
		children: {
			control: false,
			description: "Content to be displayed inside the modal",
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A reusable modal component built on top of Material-UI Modal with fade transition and backdrop.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof ProjectModal>;

// Interactive wrapper component for stories
const InteractiveModal = ({ children, ...props }: any) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button variant="contained" onClick={() => setOpen(true)}>
				Open Modal
			</Button>
			<ProjectModal {...props} open={open} onClose={() => setOpen(false)}>
				{children}
			</ProjectModal>
		</>
	);
};

// Basic modal with simple content
export const Default: Story = {
	render: (args) => (
		<InteractiveModal {...args}>
			<Typography variant="h5" component="h2" gutterBottom>
				Default Modal
			</Typography>
			<Typography variant="body1">
				This is a basic modal with default padding and styling.
			</Typography>
		</InteractiveModal>
	),
	args: {
		ariaText: "default-modal",
	},
};

// Modal with rich content
export const WithRichContent: Story = {
	render: (args) => (
		<InteractiveModal {...args}>
			<Typography variant="h4" component="h2" gutterBottom>
				Project Details
			</Typography>
			<Typography variant="body1" paragraph>
				This modal demonstrates how to display rich content including text,
				images, and interactive elements.
			</Typography>
			<Box sx={{ mt: 2, mb: 2 }}>
				<Typography variant="h6" gutterBottom>
					Features:
				</Typography>
				<Typography variant="body2" component="ul">
					<li>Responsive design</li>
					<li>Fade transition</li>
					<li>Backdrop click to close</li>
					<li>Customizable padding</li>
				</Typography>
			</Box>
			<Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
				<Button variant="outlined">Cancel</Button>
				<Button variant="contained">Save</Button>
			</Box>
		</InteractiveModal>
	),
	args: {
		ariaText: "rich-content-modal",
	},
};

// Modal with zero padding
export const ZeroPadding: Story = {
	render: (args) => (
		<InteractiveModal {...args}>
			<Box
				sx={{
					bgcolor: "primary.main",
					color: "primary.contrastText",
					borderRadius: 1,
				}}
			>
				<Typography variant="h5" component="h2" gutterBottom>
					Zero Padding Modal
				</Typography>
				<Typography variant="body1">
					This modal has zero padding, allowing content to extend to the edges.
					Useful for images, cards, or custom layouts.
				</Typography>
			</Box>
		</InteractiveModal>
	),
	args: {
		ariaText: "zero-padding-modal",
		zeroPadding: true,
	},
};

// Modal with form content
export const WithForm: Story = {
	render: (args) => (
		<InteractiveModal {...args}>
			<Typography variant="h5" component="h2" gutterBottom>
				Contact Form
			</Typography>
			<Box
				component="form"
				sx={{ display: "flex", flexDirection: "column", gap: 2 }}
			>
				<Stack sx={{ overflowY: "auto" }}>
					<Box sx={{ mb: 2 }}>
						<Typography variant="body2" gutterBottom>
							Name
						</Typography>
						<Box
							sx={{
								border: 1,
								borderColor: "divider",
								borderRadius: 1,
								p: 1,
								bgcolor: "background.default",
							}}
						>
							<Typography variant="body2" color="text.secondary">
								Input field placeholder
							</Typography>
						</Box>
					</Box>
					<Box sx={{ mb: 2 }}>
						<Typography variant="body2" gutterBottom>
							Email
						</Typography>
						<Box
							sx={{
								border: 1,
								borderColor: "divider",
								borderRadius: 1,
								p: 1,
								bgcolor: "background.default",
							}}
						>
							<Typography variant="body2" color="text.secondary">
								Input field placeholder
							</Typography>
						</Box>
					</Box>
					<Box sx={{ mb: 2 }}>
						<Typography variant="body2" gutterBottom>
							Message
						</Typography>
						<Box
							sx={{
								border: 1,
								borderColor: "divider",
								borderRadius: 1,
								p: 1,
								minHeight: 80,
								bgcolor: "background.default",
							}}
						>
							<Typography variant="body2" color="text.secondary">
								Textarea placeholder
							</Typography>
						</Box>
					</Box>
				</Stack>
				<Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
					<Button variant="outlined">Cancel</Button>
					<Button variant="contained">Submit</Button>
				</Box>
			</Box>
		</InteractiveModal>
	),
	args: {
		ariaText: "form-modal",
	},
};

// Modal with long content to test scrolling
export const WithScrollableContent: Story = {
	render: (args) => (
		<InteractiveModal {...args}>
			<Typography variant="h5" component="h2" gutterBottom>
				Long Content Modal
			</Typography>
			<Stack sx={{ overflowY: "auto" }}>
				{Array.from({ length: 20 }, (_, index) => (
					<Typography key={index} variant="body1" paragraph>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Paragraph {index + 1}.
					</Typography>
				))}
			</Stack>
			<Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 2 }}>
				<Button variant="outlined">Cancel</Button>
				<Button variant="contained">Save</Button>
			</Box>
		</InteractiveModal>
	),
	args: {
		ariaText: "scrollable-modal",
	},
};

// Static closed modal for testing controls
export const StaticClosed: Story = {
	args: {
		open: false,
		ariaText: "static-modal",
		onClose: () => {},
		children: (
			<>
				<Typography variant="h5" component="h2" gutterBottom>
					Static Closed Modal
				</Typography>
				<Typography variant="body1">
					This modal is closed by default. Use the 'open' control to test it.
				</Typography>
			</>
		),
	},
	parameters: {
		docs: {
			description: {
				story:
					"A static modal for testing the controls panel. Toggle the 'open' control to see the modal.",
			},
		},
	},
};

// Church event registration modal
export const EventRegistration: Story = {
	render: (args) => (
		<InteractiveModal {...args}>
			<Typography variant="h5" component="h2" gutterBottom>
				Register for Bible Study
			</Typography>
			<Typography variant="body1" paragraph>
				Join us for our weekly Bible study every Wednesday at 7:00 PM.
			</Typography>
			<Box
				component="form"
				sx={{ display: "flex", flexDirection: "column", gap: 2 }}
			>
				<Box>
					<Typography variant="body2" gutterBottom>
						Full Name *
					</Typography>
					<Box
						sx={{
							border: 1,
							borderColor: "divider",
							borderRadius: 1,
							p: 1,
							bgcolor: "background.default",
						}}
					>
						<Typography variant="body2" color="text.secondary">
							Enter your name
						</Typography>
					</Box>
				</Box>
				<Box>
					<Typography variant="body2" gutterBottom>
						Email Address *
					</Typography>
					<Box
						sx={{
							border: 1,
							borderColor: "divider",
							borderRadius: 1,
							p: 1,
							bgcolor: "background.default",
						}}
					>
						<Typography variant="body2" color="text.secondary">
							your.email@example.com
						</Typography>
					</Box>
				</Box>
				<Box>
					<Typography variant="body2" gutterBottom>
						Phone Number
					</Typography>
					<Box
						sx={{
							border: 1,
							borderColor: "divider",
							borderRadius: 1,
							p: 1,
							bgcolor: "background.default",
						}}
					>
						<Typography variant="body2" color="text.secondary">
							(555) 123-4567
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 2 }}
				>
					<Button variant="outlined">Cancel</Button>
					<Button variant="contained" color="primary">
						Register
					</Button>
				</Box>
			</Box>
		</InteractiveModal>
	),
	args: {
		ariaText: "event-registration-modal",
	},
};

// Prayer request modal
export const PrayerRequest: Story = {
	render: (args) => (
		<InteractiveModal {...args}>
			<Typography variant="h5" component="h2" gutterBottom color="primary">
				🙏 Submit Prayer Request
			</Typography>
			<Typography variant="body2" color="text.secondary" paragraph>
				Share your prayer request with our church community. All requests are
				kept confidential.
			</Typography>
			<Box
				component="form"
				sx={{ display: "flex", flexDirection: "column", gap: 2 }}
			>
				<Box>
					<Typography variant="body2" gutterBottom>
						Your Name (Optional)
					</Typography>
					<Box
						sx={{
							border: 1,
							borderColor: "divider",
							borderRadius: 1,
							p: 1,
							bgcolor: "background.default",
						}}
					>
						<Typography variant="body2" color="text.secondary">
							Anonymous is okay
						</Typography>
					</Box>
				</Box>
				<Box>
					<Typography variant="body2" gutterBottom>
						Prayer Request *
					</Typography>
					<Box
						sx={{
							border: 1,
							borderColor: "divider",
							borderRadius: 1,
							p: 1,
							minHeight: 100,
							bgcolor: "background.default",
						}}
					>
						<Typography variant="body2" color="text.secondary">
							Please share what you'd like us to pray for...
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						p: 2,
						bgcolor: "info.light",
						borderRadius: 1,
						border: 1,
						borderColor: "info.main",
					}}
				>
					<Typography variant="caption" color="info.contrastText">
						💝 Your privacy is important to us. Prayer requests are only shared
						with our prayer team.
					</Typography>
				</Box>
				<Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
					<Button variant="outlined">Cancel</Button>
					<Button variant="contained" color="primary">
						Submit Request
					</Button>
				</Box>
			</Box>
		</InteractiveModal>
	),
	args: {
		ariaText: "prayer-request-modal",
	},
};

// Donation modal
export const DonationModal: Story = {
	render: (args) => (
		<InteractiveModal {...args}>
			<Typography variant="h5" component="h2" gutterBottom color="success.main">
				💝 Make a Donation
			</Typography>
			<Typography variant="body1" paragraph>
				Support our church ministries and community outreach programs.
			</Typography>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<Box>
					<Typography variant="body2" gutterBottom>
						Donation Amount
					</Typography>
					<Box sx={{ display: "flex", gap: 1, mb: 2 }}>
						{["$25", "$50", "$100", "$250"].map((amount) => (
							<Button key={amount} variant="outlined" size="small">
								{amount}
							</Button>
						))}
					</Box>
					<Box
						sx={{
							border: 1,
							borderColor: "divider",
							borderRadius: 1,
							p: 1,
							bgcolor: "background.default",
						}}
					>
						<Typography variant="body2" color="text.secondary">
							Custom amount: $___
						</Typography>
					</Box>
				</Box>
				<Box>
					<Typography variant="body2" gutterBottom>
						Designation (Optional)
					</Typography>
					<Box
						sx={{
							border: 1,
							borderColor: "divider",
							borderRadius: 1,
							p: 1,
							bgcolor: "background.default",
						}}
					>
						<Typography variant="body2" color="text.secondary">
							General Fund, Missions, Youth Ministry, etc.
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						p: 2,
						bgcolor: "success.light",
						borderRadius: 1,
						border: 1,
						borderColor: "success.main",
					}}
				>
					<Typography variant="caption" color="success.contrastText">
						🔒 Secure donation processing • Tax-deductible receipts provided
					</Typography>
				</Box>
				<Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
					<Button variant="outlined">Cancel</Button>
					<Button variant="contained" color="success">
						Continue to Payment
					</Button>
				</Box>
			</Box>
		</InteractiveModal>
	),
	args: {
		ariaText: "donation-modal",
	},
};
