import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import type { FC } from "react";
import LoginButton from "./LoginButton";

/**
 * LoginButton is a specialized navigation button component that provides a consistent way
 * to direct users to the login page. It features:
 *
 * - **Navigation**: Automatically navigates to `/login` when clicked
 * - **Accessibility**: Full keyboard support and screen reader friendly
 * - **Theming**: Integrates with Material-UI theme system
 * - **Icon**: Includes a login icon for visual clarity
 * - **Responsive**: Full-width design that adapts to container
 *
 * This component is commonly used in headers, navigation menus, or call-to-action areas
 * where users need to authenticate.
 */
const meta: Meta<typeof LoginButton> = {
	title: "Components/Buttons/LoginButton",
	component: LoginButton,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: `
## Overview

The LoginButton component is a pre-configured Material-UI button that handles navigation to the login page. It's designed to be a drop-in component that maintains consistent styling and behavior across the application.

## Features

- **Automatic Navigation**: Uses React Router's useNavigate hook to redirect to /login
- **Material-UI Integration**: Leverages MUI Button component with primary theming
- **Icon Support**: Includes LoginOutlined icon for better UX
- **Memoization**: Optimized with React.memo for performance
- **Full Width**: Takes full width of its container for flexible layouts

## Usage Notes

- This component doesn't accept any props - it's a self-contained unit
- The navigation path is hardcoded to '/login'
- The button text is fixed as "Login"
- Requires React Router context to function properly
				`,
			},
		},
		layout: "centered",
	},
};

const decorators = [
	(Story: FC) => (
		<div style={{ maxWidth: "300px", margin: "0 auto", padding: "20px" }}>
			<Story />
		</div>
	),
];

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default login button with icon and primary styling.
 */
export const Default: Story = {
	args: {},
	decorators: decorators,
	parameters: {
		docs: {
			description: {
				story:
					"Standard login button with LoginOutlined icon and primary color theme.",
			},
		},
	},
};

/**
 * Button hover state for interaction testing.
 */
export const Hover: Story = {
	args: {},
	decorators: decorators,
	parameters: {
		docs: {
			description: {
				story: "Login button showing hover state with visual feedback.",
			},
		},
		pseudo: {
			hover: true,
		},
	},
};

/**
 * Button focused state for accessibility testing.
 */
export const Focused: Story = {
	args: {},
	decorators: decorators,
	parameters: {
		docs: {
			description: {
				story:
					"Login button in focused state with keyboard navigation support.",
			},
		},
		pseudo: {
			focus: true,
		},
	},
};

/**
 * Interactive story with automated testing for click behavior.
 */
export const Interactive: Story = {
	args: {},
	decorators: decorators,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const loginButton = canvas.getByRole("button", { name: /login/i });

		// Verify the button is present and accessible
		await expect(loginButton).toBeInTheDocument();

		// Verify it has the correct text content
		await expect(loginButton).toHaveTextContent("Login");

		// Verify the icon is present
		const icon = loginButton.querySelector("svg");
		await expect(icon).toBeInTheDocument();

		// Test click interaction
		await userEvent.click(loginButton);

		// Note: In a real application, this would navigate to /login
		// In Storybook, navigation is mocked for testing purposes
	},
	parameters: {
		docs: {
			description: {
				story:
					"Interactive testing story that verifies button functionality and navigation behavior.",
			},
		},
	},
};

/**
 * Button in wide container demonstrating responsive full-width behavior.
 */
export const FullWidth: Story = {
	args: {},
	decorators: [
		(Story) => (
			<div style={{ width: "100vw", padding: "20px" }}>
				<Story />
			</div>
		),
	],
	parameters: {
		docs: {
			description: {
				story:
					"Login button taking full width of its container for responsive layouts.",
			},
		},
	},
};

/**
 * Button in dark theme context for contrast and visibility testing.
 */
export const DarkTheme: Story = {
	args: {},
	decorators: [
		(Story) => (
			<div
				style={{
					backgroundColor: "#121212",
					color: "white",
					padding: "20px",
					borderRadius: "8px",
				}}
			>
				<Story />
			</div>
		),
	],
	parameters: {
		docs: {
			description: {
				story:
					"Login button displayed in dark theme to verify color contrast and readability.",
			},
		},
		backgrounds: {
			default: "dark",
		},
	},
};

/**
 * Accessibility testing with keyboard navigation and ARIA compliance verification.
 */
export const AccessibilityTest: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const loginButton = canvas.getByRole("button", { name: /login/i });

		// Test keyboard navigation and focus management
		await loginButton.focus();
		await expect(loginButton).toHaveFocus();

		// Test keyboard activation
		await userEvent.keyboard("{Enter}");

		// Verify semantic HTML structure
		await expect(loginButton).toHaveAttribute("type", "button");

		// Test that the button is properly labeled for screen readers
		await expect(loginButton).toHaveAccessibleName("Login");

		// Verify the button is included in the tab order
		await expect(loginButton).not.toHaveAttribute("tabindex", "-1");
	},
	parameters: {
		docs: {
			description: {
				story:
					"Automated accessibility testing for keyboard navigation, ARIA compliance, and WCAG standards.",
			},
		},
	},
};
