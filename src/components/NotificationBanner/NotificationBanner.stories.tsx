import { NotificationProvider } from "@contexts/NotificationContext";
import { Box, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import NotificationBanner from "./NotificationBanner";

// Mock NotificationContext for Storybook
const MockNotificationContext = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	// const mockContextValue = {
	// 	notifications: [],
	// 	registerNotification: () => { },
	// 	dismissNotification: (id: number) =>
	// 		console.log("Notification dismissed:", id),
	// 	clearNotification: () => { },
	// };

	return React.createElement(
		NotificationProvider,
		React.createElement(
			"div",
			{
				style: {
					padding: "16px",
					minHeight: "200px",
					backgroundColor: "#f5f5f5",
					borderRadius: "8px",
				} as React.CSSProperties,
			},
			children,
		),
	);
};

// Decorator to provide notification context and visual layout
const NotificationDecorator = (Story: any, context: any) => {
	const { parameters } = context;
	const showContainer = parameters?.showContainer ?? true;

	return React.createElement(
		MockNotificationContext,
		null,
		showContainer
			? React.createElement(
					Box,
					{
						sx: {
							width: "100%",
							maxWidth: 800,
							mx: "auto",
							p: 2,
							bgcolor: "background.default",
							borderRadius: 2,
							border: "1px solid",
							borderColor: "divider",
						},
					},
					React.createElement(
						Typography,
						{ variant: "h6", sx: { mb: 2, color: "text.secondary" } },
						"Notification Banner Demo",
					),
					React.createElement(Story),
				)
			: React.createElement(Story),
	);
};

const meta: Meta<typeof NotificationBanner> = {
	title: "Components/NotificationBanner",
	component: NotificationBanner,
	decorators: [NotificationDecorator],
	parameters: {
		docs: {
			description: {
				component:
					"A notification banner component that displays alerts, warnings, errors, and success messages. Features collapsible animation, severity-based theming, and dismissible functionality. Integrates with the church website's notification system to inform users about important updates, announcements, and system status.",
			},
		},
	},
	argTypes: {
		id: {
			control: "number",
			description: "Unique identifier for the notification",
		},
		message: {
			control: "text",
			description: "The main message to display",
		},
		title: {
			control: "text",
			description: "Optional title for the notification",
		},
		severity_id: {
			control: { type: "select" },
			options: [1, 2, 3, 4],
			description: "The severity level of the notification",
		},
		open: {
			control: "boolean",
			description: "Whether the notification should be shown",
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: "Information Banner",
	args: {
		id: 1,
		message:
			"Welcome to New York United SDA Church! Join us for worship this Saturday at 11:00 AM.",
		open: true,
		severity_id: 1,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Default information notification banner with a welcoming message. Uses blue theming to indicate informational content.",
			},
		},
	},
};

export const WithTitle: Story = {
	name: "With Title",
	args: {
		id: 2,
		title: "Church Announcement",
		message:
			"Special prayer meeting scheduled for this Wednesday at 7:00 PM in the main sanctuary.",
		open: true,
		severity_id: 1,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Notification banner with both title and message. The title appears in bold above the main message.",
			},
		},
	},
};

export const Success: Story = {
	name: "Success Message",
	args: {
		id: 3,
		title: "Donation Successful",
		message:
			"Thank you for your generous donation of $100. Your contribution helps support our ministry.",
		open: true,
		severity_id: 4,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Success notification with green theming and check circle icon. Perfect for confirming completed actions.",
			},
		},
	},
};

export const Warning: Story = {
	name: "Warning Alert",
	args: {
		id: 4,
		title: "Service Schedule Change",
		message:
			"Please note that next Saturday's service will start 30 minutes later due to a special program.",
		open: true,
		severity_id: 2,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Warning notification with orange/yellow theming and warning icon. Used for important notices that require attention.",
			},
		},
	},
};

export const ErrorAlert: Story = {
	name: "Error Alert",
	args: {
		id: 5,
		title: "Connection Error",
		message:
			"Unable to connect to the server. Please check your internet connection and try again.",
		open: true,
		severity_id: 3,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Error notification with red theming and error icon. Used for system errors and critical issues.",
			},
		},
	},
};

export const LongMessage: Story = {
	name: "Long Message",
	args: {
		id: 6,
		title: "Important Church Update",
		message:
			"We are excited to announce the launch of our new online giving platform, which will make it easier for members to support our various ministries and programs. The platform includes features for one-time donations, recurring giving, and the ability to designate funds for specific projects such as youth programs, community outreach, building maintenance, and missionary support. Please visit our website or speak with a church elder for more information on how to get started.",
		open: true,
		severity_id: 1,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Notification with a longer message to demonstrate text wrapping and layout behavior.",
			},
		},
	},
};

export const MessageOnly: Story = {
	name: "Message Only",
	args: {
		id: 7,
		message: "Bible study resumes next Tuesday at 7:00 PM.",
		open: true,
		severity_id: 1,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Simple notification with just a message, no title. Shows the minimal configuration.",
			},
		},
	},
};

export const Hidden: Story = {
	name: "Hidden State",
	args: {
		id: 8,
		title: "Hidden Notification",
		message: "This notification is not visible because open is set to false.",
		open: false,
		severity_id: 1,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Notification in hidden state (open=false). Nothing is rendered when the notification is closed.",
			},
		},
	},
};

export const AllSeverities: Story = {
	name: "All Severity Types",
	args: {
		id: 9,
		message: "This story shows all severity types",
		open: true,
		severity_id: 1,
	},
	parameters: {
		showContainer: false,
		docs: {
			description: {
				story:
					"Demonstrates all four severity types side by side to compare theming and icons.",
			},
		},
	},
	decorators: [
		() =>
			React.createElement(
				MockNotificationContext,
				null,
				React.createElement(
					Stack,
					{ spacing: 2, sx: { p: 2 } },
					React.createElement(
						Typography,
						{ variant: "h6", sx: { mb: 2 } },
						"All Notification Severities",
					),
					React.createElement(NotificationBanner, {
						id: 101,
						title: "Information",
						message: "This is an informational message about church services.",
						open: true,
						severity_id: 1,
					}),
					React.createElement(NotificationBanner, {
						id: 102,
						title: "Success",
						message: "Your prayer request has been submitted successfully.",
						open: true,
						severity_id: 4,
					}),
					React.createElement(NotificationBanner, {
						id: 103,
						title: "Warning",
						message: "Please arrive early as parking will be limited.",
						open: true,
						severity_id: 2,
					}),
					React.createElement(NotificationBanner, {
						id: 104,
						title: "Error",
						message: "Unable to process your request. Please try again.",
						open: true,
						severity_id: 3,
					}),
				),
			),
	],
};

export const Interactive: Story = {
	name: "Interactive Demo",
	args: {
		id: 10,
		title: "Interactive Notification",
		message:
			"Click the close button to dismiss this notification. Use the controls below to customize it.",
		open: true,
		severity_id: 1,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Interactive notification where you can test the dismiss functionality and customize properties using the controls.",
			},
		},
	},
};

export const ChurchAnnouncements: Story = {
	name: "Church Announcements",
	parameters: {
		showContainer: false,
		docs: {
			description: {
				story:
					"Real-world examples of notifications as they would appear on the church website.",
			},
		},
	},
	decorators: [
		() =>
			React.createElement(
				MockNotificationContext,
				null,
				React.createElement(
					Box,
					{ sx: { p: 3, maxWidth: 900, mx: "auto" } },
					React.createElement(
						Typography,
						{ variant: "h5", sx: { mb: 3, textAlign: "center" } },
						"NY United SDA Church Notifications",
					),
					React.createElement(
						Stack,
						{ spacing: 2 },
						React.createElement(NotificationBanner, {
							id: 201,
							title: "Sabbath Service Update",
							message:
								"Join us this Saturday for a special communion service starting at 11:00 AM. Elder Johnson will be delivering the sermon.",
							open: true,
							severity_id: 1,
						}),
						React.createElement(NotificationBanner, {
							id: 202,
							title: "Youth Program Registration",
							message:
								"Registration is now open for our summer youth camp. Early bird pricing available until March 15th.",
							open: true,
							severity_id: 4,
						}),
						React.createElement(NotificationBanner, {
							id: 203,
							message:
								"Prayer meeting moved to Fellowship Hall due to sanctuary maintenance.",
							open: true,
							severity_id: 2,
						}),
						React.createElement(NotificationBanner, {
							id: 204,
							title: "Community Outreach",
							message:
								"Join us next Sunday for our monthly food distribution program. Volunteers needed from 9:00 AM to 12:00 PM.",
							open: true,
							severity_id: 1,
						}),
					),
				),
			),
	],
};

export const ResponsiveDemo: Story = {
	name: "Responsive Layout",
	args: {
		id: 11,
		title: "Mobile-Friendly Notification",
		message:
			"This notification adapts to different screen sizes and maintains readability on all devices.",
		open: true,
		severity_id: 1,
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
		docs: {
			description: {
				story:
					"Demonstrates how the notification banner adapts to mobile and tablet screen sizes.",
			},
		},
	},
};
