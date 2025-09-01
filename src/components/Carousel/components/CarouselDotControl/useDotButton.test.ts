import { useDotButton } from "@components/Carousel";
import { act, renderHook } from "@testing-library/react";
import type { EmblaCarouselType } from "embla-carousel";
import { beforeEach, describe, expect, it, vi } from "vitest";

const createMockApi = (): Partial<EmblaCarouselType> => ({
	scrollTo: vi.fn(),
	selectedScrollSnap: vi.fn(() => 0),
	scrollSnapList: vi.fn(() => [0, 1, 2]),
	on: vi.fn().mockReturnThis(),
});

describe("useDotButton", () => {
	let mockApi: Partial<EmblaCarouselType>;
	let mockOnButtonClick: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		mockApi = createMockApi();
		mockOnButtonClick = vi.fn();
		vi.clearAllMocks();
	});

	it("initializes with correct default values", () => {
		const { result } = renderHook(() =>
			useDotButton({
				api: mockApi as EmblaCarouselType,
				onButtonClick: mockOnButtonClick,
			}),
		);

		expect(result.current.selectedIndex).toBe(0);
		expect(result.current.scrollSnaps).toEqual([0, 1, 2]);
		expect(typeof result.current.onDotButtonClick).toBe("function");
	});

	it("handles undefined api gracefully", () => {
		const { result } = renderHook(() =>
			useDotButton({
				api: undefined,
				onButtonClick: mockOnButtonClick,
			}),
		);

		expect(result.current.selectedIndex).toBe(0);
		expect(result.current.scrollSnaps).toEqual([]);
		expect(typeof result.current.onDotButtonClick).toBe("function");
	});

	it("calls api.scrollTo and onButtonClick when onDotButtonClick is called", () => {
		const { result } = renderHook(() =>
			useDotButton({
				api: mockApi as EmblaCarouselType,
				onButtonClick: mockOnButtonClick,
			}),
		);

		act(() => {
			result.current.onDotButtonClick(1);
		});

		expect(mockApi.scrollTo).toHaveBeenCalledWith(1);
		expect(mockOnButtonClick).toHaveBeenCalledWith(mockApi);
	});

	it("does not call scrollTo when api is undefined", () => {
		const { result } = renderHook(() =>
			useDotButton({
				api: undefined,
				onButtonClick: mockOnButtonClick,
			}),
		);

		act(() => {
			result.current.onDotButtonClick(1);
		});

		// Should not throw and should not call any methods
		expect(mockOnButtonClick).not.toHaveBeenCalled();
	});

	it("works without onButtonClick callback", () => {
		const { result } = renderHook(() =>
			useDotButton({
				api: mockApi as EmblaCarouselType,
			}),
		);

		act(() => {
			result.current.onDotButtonClick(2);
		});

		expect(mockApi.scrollTo).toHaveBeenCalledWith(2);
		// Should not throw when onButtonClick is undefined
	});

	it("sets up event listeners when api is provided", () => {
		renderHook(() =>
			useDotButton({
				api: mockApi as EmblaCarouselType,
				onButtonClick: mockOnButtonClick,
			}),
		);

		// Verify that event listeners were set up
		expect(mockApi.on).toHaveBeenCalledWith("reInit", expect.any(Function));
		expect(mockApi.on).toHaveBeenCalledWith("select", expect.any(Function));
	});

	it("calls scrollSnapList and selectedScrollSnap on initialization", () => {
		renderHook(() =>
			useDotButton({
				api: mockApi as EmblaCarouselType,
				onButtonClick: mockOnButtonClick,
			}),
		);

		expect(mockApi.scrollSnapList).toHaveBeenCalled();
		expect(mockApi.selectedScrollSnap).toHaveBeenCalled();
	});

	it("updates selectedIndex when api changes", () => {
		const newMockApi = createMockApi();
		newMockApi.selectedScrollSnap = vi.fn(() => 2);
		newMockApi.scrollSnapList = vi.fn(() => [0, 1, 2, 3]);

		const { result, rerender } = renderHook(
			({ api }: { api: EmblaCarouselType | undefined }) =>
				useDotButton({
					api,
					onButtonClick: mockOnButtonClick,
				}),
			{
				initialProps: { api: mockApi as EmblaCarouselType },
			},
		);

		// Initial state
		expect(result.current.selectedIndex).toBe(0);
		expect(result.current.scrollSnaps).toEqual([0, 1, 2]);

		// Change api
		rerender({ api: newMockApi as EmblaCarouselType });

		expect(result.current.selectedIndex).toBe(2);
		expect(result.current.scrollSnaps).toEqual([0, 1, 2, 3]);
	});

	it("handles api changing from defined to undefined", () => {
		const { result, rerender } = renderHook(
			({ api }: { api: EmblaCarouselType | undefined }) =>
				useDotButton({
					api,
					onButtonClick: mockOnButtonClick,
				}),
			{
				initialProps: { api: mockApi as EmblaCarouselType },
			},
		);

		// Initial state
		expect(result.current.selectedIndex).toBe(0);
		expect(result.current.scrollSnaps).toEqual([0, 1, 2]);

		// Change api to undefined
		rerender({ api: undefined as unknown as EmblaCarouselType });

		// State should remain the same when api becomes undefined
		expect(result.current.selectedIndex).toBe(0);
		expect(result.current.scrollSnaps).toEqual([0, 1, 2]);
	});
});
