import {
	act,
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	render,
	screen,
	vi,
} from "@test/index.ts";
import "@testing-library/jest-dom";
import dayjs from "dayjs";
import CountdownTimer from "./CountdownTimer";

describe("CountdownTimer", () => {
	const now = dayjs("2024-01-01T12:00:00.000Z");

	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(now.toDate());
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders correct initial values for a future target date", () => {
		const targetDate = now
			.add(1, "day")
			.add(2, "hours")
			.add(3, "minutes")
			.add(4, "seconds");

		render(<CountdownTimer targetDate={targetDate} />);

		expect(screen.getByText("01").nextSibling).toBe(screen.getByText("Days"));
		expect(screen.getByText("02").nextSibling).toBe(screen.getByText("Hours"));
		expect(screen.getByText("03").nextSibling).toBe(
			screen.getByText("Minutes"),
		);
		expect(screen.getByText("04").nextSibling).toBe(
			screen.getByText("Seconds"),
		);
	});

	it("updates the timer after 1 second", async () => {
		const targetDate = now
			.add(0, "day")
			.add(0, "hour")
			.add(0, "minute")
			.add(10, "seconds");

		render(<CountdownTimer targetDate={targetDate} />);

		expect(screen.getAllByText("00")).toHaveLength(3);
		expect(screen.getByText("10").nextSibling).toBe(
			screen.getByText("Seconds"),
		);

		act(() => vi.advanceTimersByTime(1000));

		expect(screen.getAllByText("00")).toHaveLength(3);
		expect(screen.getByText("09")).toBeInTheDocument();

		act(() => vi.advanceTimersByTime(9000));
		expect(screen.getAllByText("00")).toHaveLength(4);
	});

	it("shows all zeros if the target date is in the past", () => {
		const targetDate = now.subtract(1, "day");

		render(<CountdownTimer targetDate={targetDate} />);
		expect(screen.getAllByText("00")).toHaveLength(4);
	});

	it("displays correct labels", () => {
		const targetDate = now.add(1, "day");

		render(<CountdownTimer targetDate={targetDate} />);

		expect(screen.getByText("Days")).toBeInTheDocument();
		expect(screen.getByText("Hours")).toBeInTheDocument();
		expect(screen.getByText("Minutes")).toBeInTheDocument();
		expect(screen.getByText("Seconds")).toBeInTheDocument();
	});
});
