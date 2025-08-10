import { beforeEach, describe, expect, it, render, vi } from "@test/index";
import ArchiveStream from "./ArchiveStream";
import StreamDisplay from "./StreamDisplay";

// Mock the StreamDisplay component
vi.mock("./StreamDisplay", () => ({
	default: vi.fn(() => <div data-testid="mock-stream-display" />),
}));

describe("ArchiveStream", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders StreamDisplay with correct props", () => {
		render(<ArchiveStream />);

		expect(StreamDisplay).toHaveBeenCalledWith(
			{
				id: "sermon-cloud-embed",
				title: "Sermons Grid",
				src: "https://embeds.sermoncloud.com/new-york-united/sermons?view=grid",
			},
			undefined,
		);
	});

	it("uses 'grid' as the default view in the stream URL", () => {
		render(<ArchiveStream />);

		const mockCalls = vi.mocked(StreamDisplay).mock.calls;
		expect(mockCalls[0][0].src).toContain("view=grid");
	});
});
