import { vi } from "vitest";
import useColorTheme from "../../../../hooks/theme/useColorTheme";
import {
    beforeEach,
    describe,
    expect,
    type Mock,
    screen,
    test,
} from "../../../../test/index.ts";
import { render } from "../../../../test/vitest-setup.tsx";
import LiveStream from "./LiveStream";
import StreamDisplay from "./StreamDisplay";

// Mock the dependencies
vi.mock("../../../../hooks/theme/useColorTheme");

vi.mock("./StreamDisplay", () => ({
	default: vi.fn(() => <div data-testid="stream-display" />),
}));

describe.skip("LiveStream Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders with light theme URL when theme mode is light", () => {
		// Mock the hook to return light mode
		(useColorTheme as Mock).mockReturnValue({ mode: "light" });

		render(<LiveStream />);

		console.log("test: ", vi.mocked(StreamDisplay).mock.calls);

		// Verify StreamDisplay was called with correct props
		// expect(StreamDisplay).toHaveBeenCalledTimes(3);
		expect(StreamDisplay as Mock).toBeCalledWith([
			{
				id: "sermon-cloud-embed",
				src: "https://embeds.sermoncloud.com/new-york-united/live?theme=light",
				title: "Live Broadcast Stream",
			},
			{},
			undefined,
		]);
		expect((StreamDisplay as Mock).mock.calls[1]).toEqual([
			{
				id: "sermon-cloud-embed",
				src: "https://embeds.sermoncloud.com/new-york-united/live?theme=light",
				title: "Live Broadcast Stream",
			},
			{},
		]);

		const display = screen.getByTestId("stream-display");
		expect(display).toHaveAttribute(
			"data-src",
			"https://embeds.sermoncloud.com/new-york-united/live?theme=light",
		);
	});

	test("renders with dark theme URL when theme mode is dark", () => {
		// Mock the hook to return dark mode
		(useColorTheme as Mock).mockReturnValue({ mode: "dark" });

		render(<LiveStream />);

		// Verify StreamDisplay was called with correct props
		expect(StreamDisplay).toHaveBeenCalledWith(
			{
				id: "sermon-cloud-embed",
				src: "https://embeds.sermoncloud.com/new-york-united/live?theme=dark",
				title: "Live Broadcast Stream",
			},
			{},
		);

		const display = screen.getByTestId("stream-display");
		expect(display).toHaveAttribute(
			"data-src",
			"https://embeds.sermoncloud.com/new-york-united/live?theme=dark",
		);
	});
});
