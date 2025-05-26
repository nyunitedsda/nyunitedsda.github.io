import { useColorScheme } from "@mui/material/styles";
import { render, screen } from "@testing-library/react";
import { fireEvent } from '@testing-library/user-event';
import { describe, expect, it, vi, } from "vitest";
import ThemeToggleButton from "./ThemeToggleButton";

// Mock useColorScheme
vi.mock("@mui/material/styles", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useColorScheme: vi.fn(),
  };
});

describe("ThemeToggleButton", () => {
  it("renders nothing if mode is undefined", () => {
    (useColorScheme as any).mockReturnValue({ mode: undefined, setMode: vi.fn() });
    const { container } = render(<ThemeToggleButton />);
    expect(container.firstChild).toBeNull();
  });

  it("shows dark mode icon and toggles to light", () => {
    const setMode = vi.fn();
    (useColorScheme as any).mockReturnValue({ mode: "dark", setMode });
    render(<ThemeToggleButton />);
    expect(screen.getByTitle(/switch to light/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(setMode).toHaveBeenCalledWith("light");
  });

  it("shows light mode icon and toggles to dark", () => {
    const setMode = vi.fn();
    (useColorScheme as any).mockReturnValue({ mode: "light", setMode });
    render(<ThemeToggleButton />);
    expect(screen.getByTitle(/switch to dark/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(setMode).toHaveBeenCalledWith("dark");
  });
});