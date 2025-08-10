import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { linkTo } from "@storybook/addon-links";

import type { Meta, StoryObj } from "@storybook/react-vite";
import type { FC, PropsWithChildren } from "react";
import Header from "./Header";

const storyLinks = "http://localhost:6006/?path=/story/components-header--";

const DEFAULT_ROUTE_MAP = {
	[`${storyLinks}default`]: "Default",
	[`${storyLinks}home-page`]: "HomePage",
	[`${storyLinks}about-page`]: "AboutPage",
	[`${storyLinks}donations-page`]: "DonationsPage",
	[`${storyLinks}contact-page`]: "ContactPage",
	[`${storyLinks}blog-page`]: "BlogPage",
	[`${storyLinks}mobile-view&globals=viewport:mobile1`]: "MobileView",
	[`${storyLinks}tablet-view&globals=viewport:tablet`]: "TabletView",
	[`${storyLinks}desktop-view&globals=viewport:desktop`]: "DesktopView",
	[`${storyLinks}responsive-demo`]: "ResponsiveDemo",
	[`${storyLinks}active-navigation`]: "ActiveNavigation",
	[`${storyLinks}branding-focus`]: "BrandingFocus",
	[`${storyLinks}interactive-demo`]: "InteractiveDemo",
};

const globalNavigation = {
	debug: true,
	routeMap: {
		...DEFAULT_ROUTE_MAP,
		"/special": "GlobalNavigationCustomRoutes",
		"/custom": "GlobalNavigationDemo",
	},
};

const meta: Meta<typeof Header> = {
	title: "Components/Header",
	component: Header,
	decorators: [
		(Story) => (
			<Stack
				justifyContent="flex-end"
				alignItems="center"
				sx={{ width: "100%", height: "100%", minHeight: "500px" }}
			>
				<Story />
			</Stack>
		),
	],
	parameters: {
		layout: "fullscreen",
		globalNavigation, // Use global navigation configuration
		docs: {
			description: {
				component:
					"The Header component provides navigation for the church website. It features responsive design with a hamburger menu on mobile, desktop navigation menu, and organization branding. The header is sticky and includes theme toggle functionality. \n\n**Navigation Options:**\n- **Global Navigation** (Recommended): Automatic navigation via the global Storybook provider - no wrapper needed\n\nSee `.storybook/GlobalNavigation.README.md` for global navigation documentation.",
			},
		},
		backgrounds: {
			disable: true, // We handle background in decorator
		},
		// Add stable story configuration to prevent HMR issues
		storySort: {
			order: ["Components", ["Header"]],
		},
		// Configure addon-links for menu navigation
		links: {
			create: linkTo,
		},
	},
	tags: ["autodocs"],
	// Add explicit story ID to prevent HMR mismatches
	id: "components-header",
};

const ContentWrapper: FC<PropsWithChildren> = ({ children }) => (
	<Stack
		justifyContent="center"
		alignItems="center"
		flexGrow={1}
		sx={{ width: "100%", height: "100%", p: 2 }}
	>
		{children}
	</Stack>
);

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: "Default Header",
	render: () => (
		<>
			<Header />
			<ContentWrapper>
				<p>This is the default page</p>
			</ContentWrapper>
		</>
	),
	parameters: {
		globalNavigation,
		docs: {
			description: {
				story:
					"The default header showing the church logo, navigation menu, and theme toggle button. Navigation works automatically via the global Storybook provider - no wrapper component needed! Click on navigation items to see addon-links in action.",
			},
		},
	},
};

export const HomePage: Story = {
	name: "Home Page",
	render: () => (
		<>
			<Header />
			<ContentWrapper>
				<p>Welcome to the home page!</p>
			</ContentWrapper>
		</>
	),
	parameters: {
		globalNavigation,
		docs: {
			description: {
				story:
					"Click on navigation items to see how they link to other header states using addon-links.",
			},
		},
	},
};

export const AboutPage: Story = {
	name: "About Page",
	render: () => (
		<>
			<Header />
			<ContentWrapper>
				<p>About Us page content goes here.</p>
			</ContentWrapper>
		</>
	),
	parameters: {
		globalNavigation,
		docs: {
			description: {
				story:
					"Header showing navigation with About Us page active. Notice how the About Us navigation item is highlighted to show the current page. Navigation links will take you to other story pages using addon-links.",
			},
		},
	},
};

export const DonationsPage: Story = {
	name: "Donations Page",
	render: () => (
		<>
			<Header />
			<ContentWrapper>
				<p>This is the Donation page</p>
			</ContentWrapper>
		</>
	),
	parameters: {
		globalNavigation,
		docs: {
			description: {
				story:
					"Header for the donations section showing active donations navigation state. Click on other navigation items to navigate to their respective stories using addon-links.",
			},
		},
	},
};

export const ContactPage: Story = {
	name: "Contact Page",
	render: () => (
		<>
			<Header />
			<ContentWrapper>
				<p>Contact us page content goes here.</p>
			</ContentWrapper>
		</>
	),
	parameters: {
		globalNavigation,
		docs: {
			description: {
				story:
					"Header for the contact page with contact navigation highlighted. Navigation is fully functional using Storybook addon-links.",
			},
		},
	},
};

export const BlogPage: Story = {
	name: "Blog Page",
	render: () => (
		<>
			<Header />
			<ContentWrapper>
				<p>Blog section content goes here.</p>
			</ContentWrapper>
		</>
	),
	parameters: {
		globalNavigation,
		docs: {
			description: {
				story:
					"Header for the blog section with blog navigation highlighted to show active state. Try clicking on other menu items to see navigation in action with addon-links.",
			},
		},
	},
};

export const MobileView: Story = {
	name: "Mobile Layout",
	render: () => (
		<>
			<Header />
			<ContentWrapper>
				<p>This is the mobile view of the header</p>
			</ContentWrapper>
		</>
	),
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
		docs: {
			globalNavigation,
			description: {
				story:
					"Header optimized for mobile devices showing the hamburger menu button, compact logo, and theme toggle. Click the hamburger menu to see the mobile navigation drawer. Navigation links are functional and use addon-links.",
			},
		},
	},
};

export const TabletView: Story = {
	name: "Tablet Layout",
	render: () => (
		<>
			<Header />
			<ContentWrapper>
				<p>This is the tablet view of the header</p>
			</ContentWrapper>
		</>
	),
	parameters: {
		viewport: {
			defaultViewport: "tablet",
		},
		docs: {
			globalNavigation,
			description: {
				story:
					"Header layout on tablet devices. Shows the transition between mobile and desktop layouts with responsive menu behavior. Navigation links work seamlessly with addon-links.",
			},
		},
	},
};

export const DesktopView: Story = {
	name: "Desktop Layout",
	render: () => (
		<>
			<Header />
			<ContentWrapper>
				<p>This is the desktop view of the header</p>
			</ContentWrapper>
		</>
	),
	parameters: {
		globalNavigation,
		viewport: {
			defaultViewport: "desktop",
		},
		docs: {
			description: {
				story:
					"Full desktop header layout with complete navigation menu, church logo, and theme toggle. All navigation items are visible in the main menu bar and are linked to their respective stories using addon-links.",
			},
		},
	},
};

export const ResponsiveDemo: Story = {
	name: "Responsive Behavior",
	render: () => (
		<>
			<Header />
			<ContentWrapper>
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
					layouts. Navigation links are functional!
				</Box>
			</ContentWrapper>
		</>
	),
	parameters: {
		globalNavigation,
		docs: {
			description: {
				story:
					"Demonstrates the responsive behavior of the header with functional navigation links. Resize the viewport to see how the header adapts between mobile (hamburger menu) and desktop (full menu) layouts. All navigation items are connected via addon-links.",
			},
		},
	},
};

export const ActiveNavigation: Story = {
	name: "Active Navigation States",
	render: () => (
		<>
			<Header />
			<ContentWrapper>
				<Box
					sx={{
						p: 2,
						mb: 2,
						bgcolor: "info.light",
						color: "info.contrastText",
						borderRadius: 1,
						textAlign: "center",
					}}
				>
					<strong>Active Navigation States Demo</strong>
					<br />
					This example shows how navigation items appear when active with
					functional navigation links. Click on the About Us link to see the
					active state.
				</Box>
			</ContentWrapper>
		</>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Shows how navigation items appear when active with functional navigation links. This example demonstrates the About Us page active state.",
			},
		},
	},
};

export const BrandingFocus: Story = {
	name: "Church Branding",
	render: () => (
		<>
			<Header />
			<ContentWrapper>
				<Box
					sx={{
						p: 2,
						mb: 2,
						bgcolor: "info.light",
						color: "info.contrastText",
						borderRadius: 1,
						textAlign: "center",
					}}
				>
					<strong>Church Branding Focus</strong>
					<br />
					This example highlights the church branding elements with custom route
					mapping.
				</Box>
			</ContentWrapper>
		</>
	),
	parameters: {
		globalNavigation,
		docs: {
			description: {
				story:
					"Highlights the church branding elements with custom route mapping. The component supports extensible route-to-story mapping for different use cases.",
			},
		},
	},
};

export const InteractiveDemo: Story = {
	name: "Interactive Demo",
	render: () => (
		<>
			<Header />
			<ContentWrapper>
				<div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
					<h3>Interactive Header Demo</h3>
					<p>Click navigation items to see addon-links in action!</p>
					<p>Check the browser console for navigation events.</p>
					<div
						style={{
							marginTop: "20px",
							padding: "10px",
							backgroundColor: "#f5f5f5",
							borderRadius: "5px",
						}}
					>
						<strong>Features demonstrated:</strong>
						<ul
							style={{
								textAlign: "left",
								maxWidth: "400px",
								margin: "10px auto",
							}}
						>
							<li>✅ Automatic navigation interception</li>
							<li>✅ Custom navigation callbacks</li>
							<li>✅ Router context provision</li>
							<li>✅ Story navigation via addon-links</li>
						</ul>
					</div>
				</div>
			</ContentWrapper>
		</>
	),
	parameters: {
		globalNavigation,
		docs: {
			description: {
				story:
					"Fully interactive header where you can click navigation items to navigate between stories, toggle the theme, and interact with the mobile menu. All navigation and interactive elements are functional using Storybook addon-links.",
			},
		},
	},
};
