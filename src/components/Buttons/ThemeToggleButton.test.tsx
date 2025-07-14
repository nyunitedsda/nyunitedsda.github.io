import { useColorScheme } from "@mui/material/styles";
import { vi } from "vitest";
import {
	type Mock,
	describe,
	expect,
	fireEvent,
	it,
	screen,
} from "../../utils/index.ts";
import { render } from "../../utils/vitest-setup.tsx";
import ThemeToggleButton from "./ThemeToggleButton";

// Mock BEFORE importing the hook/component
vi.mock("@mui/material/styles", async () => {
	// Import the actual module to preserve other exports
	const actual = await vi.importActual<typeof import("@mui/material/styles")>(
		"@mui/material/styles",
	);
	return {
		...actual,
		useColorScheme: vi.fn(),
	};
});

describe("ThemeToggleButton", () => {
	it("renders nothing if mode is undefined", () => {
		(useColorScheme as Mock).mockReturnValue({
			mode: undefined,
			setMode: vi.fn(),
		});

		const { container } = render(<ThemeToggleButton />);
		expect(container.firstChild).toBeNull();
	});

	it("shows dark mode icon and toggles to light", () => {
		const setMode = vi.fn();
		(useColorScheme as Mock).mockReturnValue({
			mode: "dark",
			setMode,
		});

		render(<ThemeToggleButton />);

		expect(screen.getByTitle(/switch to light/i)).toBeInTheDocument();
		expect(screen.getByTestId("LightModeRoundedIcon")).toBeVisible();

		fireEvent.click(screen.getByRole("button"));

		expect(setMode).toHaveBeenCalledWith("light");
	});

	it("shows light mode icon and toggles to dark", () => {
		const setMode = vi.fn();
		(useColorScheme as Mock).mockReturnValue({
			mode: "light",
			setMode,
		});

		render(<ThemeToggleButton />);

		expect(screen.getByTitle(/switch to dark/i)).toBeInTheDocument();
		expect(screen.getByTestId("DarkModeTwoToneIcon")).toBeVisible();

		fireEvent.click(screen.getByRole("button"));

		expect(setMode).toHaveBeenCalledWith("dark");
	});
});
