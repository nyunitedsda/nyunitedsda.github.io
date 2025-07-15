import { useColorScheme } from "@mui/material/styles";
import { render } from "@testing-library/react";
import { vi } from "vitest";
import {
	describe,
	expect,
	fireEvent,
	it,
	type Mock,
	screen,
} from "../../test/index.ts";
import ThemeToggleButton from "./ThemeToggleButton";

vi.mock("@mui/material/styles", async () => {
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
