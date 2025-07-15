import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { AuthenticationProvider } from "../../contexts/AuthenticationContext";
import Footer from "./Footer";

// Simple decorator to provide layout context
const FooterDecorator = (Story: any) => {
	return (
		<AuthenticationProvider>
			<Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
				<Box sx={{ pt: 4 }}>
					<Story />
				</Box>
			</Box>
		</AuthenticationProvider>
	);
};

const meta: Meta<typeof Footer> = {
	title: "Components/Footer",
	component: Footer,
	decorators: [FooterDecorator],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"The Footer component displays church information, contact details, service times, navigation links, and social media. It's responsive and adapts to different screen sizes. Uses the app's theme system and routing context provided by AppProvider.",
			},
		},
		backgrounds: {
			disable: true, // We handle background in decorator
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: "Default Footer",
	parameters: {
		docs: {
			description: {
				story:
					"The default footer showing all sections: church information with social media, service times, quick navigation links, and contact information with interactive links.",
			},
		},
	},
};

export const LightTheme: Story = {
	name: "Light Theme",
	parameters: {
		docs: {
			description: {
				story:
					"Footer displayed with light theme styling from the app's theme system.",
			},
		},
	},
};

export const DarkTheme: Story = {
	name: "Dark Theme",
	parameters: {
		docs: {
			description: {
				story:
					"Footer displayed with dark theme styling from the app's theme system. Use the theme toggle in Storybook to see this variant.",
			},
		},
	},
};

export const ResponsiveView: Story = {
	name: "Responsive Layout",
	parameters: {
		docs: {
			description: {
				story:
					"Footer adapts to different screen sizes. The layout changes from multiple columns on desktop to stacked sections on mobile.",
			},
		},
		viewport: {
			viewports: {
				mobile: {
					name: "Mobile",
					styles: {
						width: "375px",
						height: "667px",
					},
				},
				tablet: {
					name: "Tablet",
					styles: {
						width: "768px",
						height: "1024px",
					},
				},
				desktop: {
					name: "Desktop",
					styles: {
						width: "1200px",
						height: "800px",
					},
				},
			},
			defaultViewport: "mobile",
		},
	},
};

export const InteractiveDemo: Story = {
	name: "Interactive Demo",
	parameters: {
		docs: {
			description: {
				story:
					"Fully interactive footer where you can click on phone numbers, email links, and social media icons. All links are functional and connect to real church contact information. Uses the app's actual theme colors.",
			},
		},
	},
	decorators: [
		(Story) => (
			<Box>
				<Box
					sx={{
						p: 3,
						mb: 2,
						bgcolor: "primary.main",
						color: "primary.contrastText",
						borderRadius: 1,
						textAlign: "center",
					}}
				>
					<strong>Interactive Footer Demo</strong>
					<br />
					Try clicking on phone numbers, email addresses, and social media icons
					below!
				</Box>
				<Story />
			</Box>
		),
	],
};
