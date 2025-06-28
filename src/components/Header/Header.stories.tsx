import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

// Decorator to provide necessary context and layout
const HeaderDecorator = (Story: any) => {
	return (
		<Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
			<Story />
			<Box sx={{ p: 3, mt: 2 }}>
				<Box
					sx={{
						p: 2,
						bgcolor: "grey.100",
						borderRadius: 1,
						textAlign: "center",
						color: "text.secondary",
					}}
				>
					Content area below header - The header is sticky and will remain at
					the top when scrolling.
				</Box>
			</Box>
		</Box>
	);
};

const meta: Meta<typeof Header> = {
	title: "Components/Header",
	component: Header,
	decorators: [HeaderDecorator],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"The Header component provides navigation for the church website. It features responsive design with a hamburger menu on mobile, desktop navigation menu, and organization branding. The header is sticky and includes theme toggle functionality.",
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
	name: "Default Header",
	parameters: {
		docs: {
			description: {
				story:
					"The default header showing the church logo, navigation menu, and theme toggle button. On desktop, it displays the full navigation menu. On mobile, it shows a hamburger menu.",
			},
		},
	},
};

export const HomePage: Story = {
	name: "Home Page",
	parameters: {
		docs: {
			description: {
				story:
					"Header on the home page. Navigation state depends on the current route in the app.",
			},
		},
	},
};

export const AboutPage: Story = {
	name: "About Page",
	parameters: {
		docs: {
			description: {
				story:
					"Header showing navigation. Active state will reflect the current application route.",
			},
		},
	},
};

export const DonationsPage: Story = {
	name: "Donations Page",
	parameters: {
		docs: {
			description: {
				story: "Header for the donations section of the website.",
			},
		},
	},
};

export const ContactPage: Story = {
	name: "Contact Page",
	parameters: {
		docs: {
			description: {
				story: "Header for the contact page with full navigation access.",
			},
		},
	},
};

export const BlogPage: Story = {
	name: "Blog Page",
	parameters: {
		docs: {
			description: {
				story:
					"Header for the blog section with navigation to all church pages.",
			},
		},
	},
};

export const MobileView: Story = {
	name: "Mobile Layout",
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
		docs: {
			description: {
				story:
					"Header optimized for mobile devices showing the hamburger menu button, compact logo, and theme toggle. Click the hamburger menu to see the mobile navigation drawer.",
			},
		},
	},
};

export const TabletView: Story = {
	name: "Tablet Layout",
	parameters: {
		viewport: {
			defaultViewport: "tablet",
		},
		docs: {
			description: {
				story:
					"Header layout on tablet devices. Shows the transition between mobile and desktop layouts with responsive menu behavior.",
			},
		},
	},
};

export const DesktopView: Story = {
	name: "Desktop Layout",
	parameters: {
		viewport: {
			defaultViewport: "desktop",
		},
		docs: {
			description: {
				story:
					"Full desktop header layout with complete navigation menu, church logo, and theme toggle. All navigation items are visible in the main menu bar.",
			},
		},
	},
};

export const ResponsiveDemo: Story = {
	name: "Responsive Behavior",
	parameters: {
		docs: {
			description: {
				story:
					"Demonstrates the responsive behavior of the header. Resize the viewport to see how the header adapts between mobile (hamburger menu) and desktop (full menu) layouts.",
			},
		},
	},
	decorators: [
		(Story) => (
			<Box>
				<Box
					sx={{
						p: 2,
						mb: 2,
						bgcolor: "info.light",
						color: "info.contrastText",
						borderRadius: 1,
						textAlign: "center",
						fontSize: "0.875rem",
					}}
				>
					<strong>Responsive Header Demo</strong>
					<br />
					Resize the viewport to see the header adapt between mobile and desktop
					layouts
				</Box>
				<Story />
			</Box>
		),
	],
};

export const ActiveNavigation: Story = {
	name: "Active Navigation States",
	parameters: {
		docs: {
			description: {
				story:
					"Shows how navigation items appear when active. The current page's navigation item is highlighted based on the application's current route.",
			},
		},
	},
	decorators: [
		(Story) => (
			<Box>
				<Box
					sx={{
						p: 2,
						mb: 2,
						bgcolor: "primary.light",
						color: "primary.contrastText",
						borderRadius: 1,
						textAlign: "center",
					}}
				>
					<strong>Active Navigation Example</strong>
					<br />
					Navigation state reflects the current application route
				</Box>
				<Story />
			</Box>
		),
	],
};

export const BrandingFocus: Story = {
	name: "Church Branding",
	parameters: {
		docs: {
			description: {
				story:
					"Highlights the church branding elements in the header including the New York United SDA Church logo and name. Clicking the logo navigates to the home page.",
			},
		},
	},
	decorators: [
		(Story) => (
			<Box>
				<Box
					sx={{
						p: 2,
						mb: 2,
						bgcolor: "secondary.light",
						color: "secondary.contrastText",
						borderRadius: 1,
						textAlign: "center",
					}}
				>
					<strong>Church Branding</strong>
					<br />
					New York United Sabbath Day Adventist Church
				</Box>
				<Story />
			</Box>
		),
	],
};

export const InteractiveDemo: Story = {
	name: "Interactive Demo",
	parameters: {
		docs: {
			description: {
				story:
					"Fully interactive header where you can click navigation items, toggle the theme, and interact with the mobile menu. All navigation and interactive elements are functional.",
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
						bgcolor: "success.light",
						color: "success.contrastText",
						borderRadius: 1,
						textAlign: "center",
					}}
				>
					<strong>Interactive Header Demo</strong>
					<br />
					Try clicking navigation items, the theme toggle button, and the
					hamburger menu (on mobile)!
				</Box>
				<Story />
				<Box sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
					<em>Scroll down to see the sticky header behavior</em>
				</Box>
				{/* Add some content to demonstrate sticky behavior */}
				{Array.from({ length: 20 }, (_, i) => (
					<Box
						key={i}
						sx={{ p: 2, mb: 1, bgcolor: "grey.50", borderRadius: 1 }}
					>
						Content section {i + 1} - The header remains sticky at the top while
						scrolling
					</Box>
				))}
			</Box>
		),
	],
};
