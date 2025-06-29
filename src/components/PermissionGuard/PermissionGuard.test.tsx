import { describe, expect, it, screen, vi } from "../../utils/index.ts";
import { render } from "../../utils/vitest-setup.tsx";
import PermissionGuard from "./PermissionGuard";

// Mock the usePermissions hook
vi.mock("../../hooks/usePermissions", () => ({
  default: vi.fn(() => ({
    checkAnyPermission: vi.fn((permissions) => 
      permissions.includes("admin.users.read")),
    isAdmin: false
  }))
}));

describe("PermissionGuard", () => {
  it("renders children when no permissions are required", () => {
    render(
      <PermissionGuard>
        <div data-testid="protected-content">Protected Content</div>
      </PermissionGuard>
    );
    
    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });
  
  it("renders children when user has required permissions", () => {
    render(
      <PermissionGuard permissions={["admin.users.read"]}>
        <div data-testid="protected-content">Protected Content</div>
      </PermissionGuard>
    );
    
    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });
  
  it("renders fallback when user doesn't have required permissions", () => {
    render(
      <PermissionGuard 
        permissions={["admin.users.write"]} 
        fallback={<div data-testid="fallback">Access Denied</div>}
      >
        <div data-testid="protected-content">Protected Content</div>
      </PermissionGuard>
    );
    
    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
    expect(screen.getByTestId("fallback")).toBeInTheDocument();
  });
  
  it("renders nothing when user doesn't have required permissions and no fallback", () => {
    render(
      <PermissionGuard permissions={["admin.users.write"]}>
        <div data-testid="protected-content">Protected Content</div>
      </PermissionGuard>
    );
    
    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
  });
});
