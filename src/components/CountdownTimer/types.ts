import type { Dayjs } from "dayjs";

interface CountdownTimerProps {
	targetDate: Dayjs;
}

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

interface TimeUnit {
	label: "Days" | "Hours" | "Minutes" | "Seconds";
	value: number;
}

export type { CountdownTimerProps, TimeLeft, TimeUnit };
