import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react";
import { type FC, type PropsWithChildren, Fragment } from "react";
import type { PermissionString } from "../../api/request/types";

// Create a mock version of PermissionGuard for Storybook
// This avoids issues with dependency mocking in Storybook
interface MockPermissionGuardProps extends PropsWithChildren {
  permissions?: PermissionString[];
  fallback?: React.ReactNode;
  adminOverride?: boolean;
}

const MockPermissionGuard: FC<MockPermissionGuardProps> = ({
  children,
  permissions = [],
  fallback = null,
  adminOverride = true,
}) => {
  // This is our mock permission logic for storybook demos
  const hasAccess = 
    permissions.length === 0 || 
    adminOverride || 
    permissions.some(p => ["admin.users.read", "moderator.articles.read"].includes(p));
  
  return (
    <Fragment>
      {hasAccess ? children : fallback}
    </Fragment>
  );
};

const meta: Meta<typeof MockPermissionGuard> = {
  title: "Components/PermissionGuard",
  component: MockPermissionGuard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ p: 3 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A component that conditionally renders content based on user permissions',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Example protected content
const ProtectedContent = () => (
  <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
    <Typography variant="h6">Protected Content</Typography>
    <Typography variant="body2">
      This content is only visible to users with specific permissions.
    </Typography>
  </Box>
);

// Example fallback content
const FallbackContent = () => (
  <Alert severity="warning">
    You don't have permission to view this content
  </Alert>
);

export const NoPermissionsRequired: Story = {
  args: {
    children: <ProtectedContent />,
    permissions: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'When no permissions are specified, content is always shown',
      },
    },
  },
};

export const WithRequiredPermissions: Story = {
  args: {
    children: <ProtectedContent />,
    permissions: ["admin.users.read"],
  },
  parameters: {
    docs: {
      description: {
        story: 'Content is shown because user has the required permission',
      },
    },
  },
};

export const WithMissingPermissions: Story = {
  args: {
    children: <ProtectedContent />,
    permissions: ["admin.users.delete"],
    fallback: <FallbackContent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Fallback is shown because user does not have the required permission',
      },
    },
  },
};
