import { afterAll, beforeAll, describe, expect, it, vi } from "@test/index.ts";
import dayjs from "dayjs";
import {
	calculateRemainingTime,
	formatTimeUnits,
	INITIAL_TIMER_VALUES,
} from "./helpers";
import type { TimeLeft } from "./types";

describe("INITIAL_TIMER_VALUES", () => {
	it("should have all values set to 0", () => {
		expect(INITIAL_TIMER_VALUES).toEqual({
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
		});
	});
});

describe("calculateRemainingTime", () => {
	const base = dayjs("2024-01-01T00:00:00.000Z");

	beforeAll(() => {
		vi.useFakeTimers();
		vi.setSystemTime(base.toDate());
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it("returns correct time left for a future date", () => {
		const target = base
			.add(1, "day")
			.add(2, "hour")
			.add(3, "minute")
			.add(4, "second");
		expect(calculateRemainingTime(target)).toEqual({
			days: 1,
			hours: 2,
			minutes: 3,
			seconds: 4,
		});
	});

	it("returns all zeros for a past date", () => {
		const target = base.subtract(1, "day");
		expect(calculateRemainingTime(target)).toEqual(INITIAL_TIMER_VALUES);
	});

	it("returns all zeros for the current date", () => {
		expect(calculateRemainingTime(base)).toEqual(INITIAL_TIMER_VALUES);
	});
});

describe("formatTimeUnits", () => {
	it("formats time left into labeled units", () => {
		const time: TimeLeft = { days: 2, hours: 5, minutes: 10, seconds: 20 };
		expect(formatTimeUnits(time)).toEqual([
			{ label: "Days", value: 2 },
			{ label: "Hours", value: 5 },
			{ label: "Minutes", value: 10 },
			{ label: "Seconds", value: 20 },
		]);
	});

	it("formats zero values correctly", () => {
		expect(formatTimeUnits(INITIAL_TIMER_VALUES)).toEqual([
			{ label: "Days", value: 0 },
			{ label: "Hours", value: 0 },
			{ label: "Minutes", value: 0 },
			{ label: "Seconds", value: 0 },
		]);
	});
});
