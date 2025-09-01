import type { TimeLeft, TimeUnit } from "@components/CountdownTimer";
import dayjs, { type Dayjs } from "dayjs";

const INITIAL_TIMER_VALUES = {
	days: 0,
	hours: 0,
	minutes: 0,
	seconds: 0,
};

const calculateRemainingTime = (countdownTarget: Dayjs) => {
	const difference = dayjs(countdownTarget).diff(dayjs());

	if (difference > 0) {
		return {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / 1000 / 60) % 60),
			seconds: Math.floor((difference / 1000) % 60),
		};
	}
	return INITIAL_TIMER_VALUES;
};

const formatTimeUnits = (time: TimeLeft): TimeUnit[] => [
	{ label: "Days", value: time.days },
	{ label: "Hours", value: time.hours },
	{ label: "Minutes", value: time.minutes },
	{ label: "Seconds", value: time.seconds },
];

export { calculateRemainingTime, formatTimeUnits, INITIAL_TIMER_VALUES };
