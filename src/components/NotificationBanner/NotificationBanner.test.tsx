import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Provider as NotificationProvider } from "../../contexts/NotificationContext/context";
import { render } from "../../utils/vitest-setup.tsx";
import NotificationBanner from "./NotificationBanner";

// Mock the context
const mockDismissNotification = vi.fn();
const mockContextValue = {
  notifications: [],
  registerNotification: vi.fn(),
  dismissNotification: mockDismissNotification,
  clearNotification: vi.fn(),
};

const renderWithContext = (ui: React.ReactElement) => {
  return render(
    <NotificationProvider value={mockContextValue}>
      {ui}
    </NotificationProvider>
  );
};

describe("NotificationBanner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders notification with message", () => {
    renderWithContext(
      <NotificationBanner 
        id={1} 
        message="Test notification message" 
        open={true} 
        severity="information" 
      />
    );

    expect(screen.getByText("Test notification message")).toBeInTheDocument();
  });

  it("renders notification with title and message", () => {
    renderWithContext(
      <NotificationBanner 
        id={1} 
        title="Test Title"
        message="Test notification message" 
        open={true} 
        severity="information" 
      />
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test notification message")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    renderWithContext(
      <NotificationBanner 
        id={1} 
        message="Test notification message" 
        open={false} 
        severity="information" 
      />
    );

    expect(screen.queryByText("Test notification message")).not.toBeInTheDocument();
  });

  it("renders close button", () => {
    renderWithContext(
      <NotificationBanner 
        id={1} 
        message="Test notification message" 
        open={true} 
        severity="information" 
      />
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  it("calls dismissNotification when close button is clicked", () => {
    renderWithContext(
      <NotificationBanner 
        id={1} 
        message="Test notification message" 
        open={true} 
        severity="information" 
      />
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockDismissNotification).toHaveBeenCalledWith(1);
  });

  it("renders with success severity", () => {
    renderWithContext(
      <NotificationBanner 
        id={1} 
        message="Success message" 
        open={true} 
        severity="success" 
      />
    );

    expect(screen.getByText("Success message")).toBeInTheDocument();
  });

  it("renders with error severity", () => {
    renderWithContext(
      <NotificationBanner 
        id={1} 
        message="Error message" 
        open={true} 
        severity="error" 
      />
    );

    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("renders with caution severity", () => {
    renderWithContext(
      <NotificationBanner 
        id={1} 
        message="Warning message" 
        open={true} 
        severity="caution" 
      />
    );

    expect(screen.getByText("Warning message")).toBeInTheDocument();
  });

  it("uses default open state when open prop is undefined", () => {
    renderWithContext(
      <NotificationBanner 
        id={1} 
        message="Test notification message" 
        severity="information" 
      />
    );

    // When open is undefined, it defaults to false, so message should not be visible
    expect(screen.queryByText("Test notification message")).not.toBeInTheDocument();
  });
});
