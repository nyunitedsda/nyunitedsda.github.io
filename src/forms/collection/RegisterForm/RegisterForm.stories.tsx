import type { Meta, StoryObj } from "@storybook/react";
import { SnackbarProvider } from "notistack";
import RegisterForm from "./RegisterForm";

const meta: Meta<typeof RegisterForm> = {
  title: "Forms/RegisterForm",
  component: RegisterForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <SnackbarProvider maxSnack={3}>
        <div style={{ maxWidth: "450px", margin: "0 auto", padding: "20px" }}>
          <Story />
        </div>
      </SnackbarProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A registration form component used for user sign-up. It includes username, password, confirm password fields with validation, and terms acceptance checkbox.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story showing the registration form
export const Default: Story = {
  args: {},
};

// Mobile view
export const MobileView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'The registration form as it appears on mobile devices.',
      },
    },
  },
};

// Dark theme
export const DarkTheme: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'The registration form as it appears in dark mode.',
      },
    },
  },
};

// Form with validation errors
export const WithValidationErrors: Story = {
  render: () => {
    // The form displays validation errors when attempting to submit with empty fields
    // This is just a placeholder since we can't easily trigger validation in Storybook
    return <RegisterForm />;
  },
  parameters: {
    docs: {
      description: {
        story: 'The registration form showing validation errors. Note: In this static story, errors are not visible by default as they would require form interaction.',
      },
    },
  },
};

// Form with focus on password requirements
export const PasswordRequirements: Story = {
  render: () => {
    return <RegisterForm />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Highlights the password field requirements. The validation enforces password strength based on configured rules in the schema.',
      },
    },
  },
};
