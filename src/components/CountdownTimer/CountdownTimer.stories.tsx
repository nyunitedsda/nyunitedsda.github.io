import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react-vite";
import dayjs from "dayjs";
import CountdownTimer from "./CountdownTimer";

const meta: Meta<typeof CountdownTimer> = {
	title: "Components/CountdownTimer",
	component: CountdownTimer,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<Box sx={{ padding: 3, maxWidth: "600px", margin: "0 auto" }}>
				<Story />
			</Box>
		),
	],
	argTypes: {
		targetDate: {
			control: false,
			description: "Dayjs object representing the target countdown date",
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"CountdownTimer component that displays the time remaining until a specified target date. It updates every second and handles various time formats.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create future dates
const createFutureDate = (
	amount: number,
	unit: "minutes" | "hours" | "days" | "weeks" | "months",
) => {
	return dayjs().add(amount, unit);
};

export const Default: Story = {
	args: {
		targetDate: createFutureDate(7, "days"),
	},
	parameters: {
		docs: {
			description: {
				story:
					"A countdown timer showing time remaining until a target date (7 days from now).",
			},
		},
	},
};

export const ShortCountdown: Story = {
	args: {
		targetDate: createFutureDate(30, "minutes"),
	},
	parameters: {
		docs: {
			description: {
				story: "Countdown with less than an hour remaining (30 minutes).",
			},
		},
	},
};

export const MediumCountdown: Story = {
	args: {
		targetDate: createFutureDate(25, "hours"),
	},
	parameters: {
		docs: {
			description: {
				story: "Countdown with more than a day remaining (25 hours).",
			},
		},
	},
};

export const LongCountdown: Story = {
	args: {
		targetDate: createFutureDate(45, "days"),
	},
	parameters: {
		docs: {
			description: {
				story: "Long countdown showing many days remaining (45 days).",
			},
		},
	},
};

export const VeryLongCountdown: Story = {
	args: {
		targetDate: createFutureDate(6, "months"),
	},
	parameters: {
		docs: {
			description: {
				story: "Very long countdown for events far in the future (6 months).",
			},
		},
	},
};

export const AlmostExpired: Story = {
	args: {
		targetDate: createFutureDate(2, "minutes"),
	},
	parameters: {
		docs: {
			description: {
				story:
					"Countdown that's almost expired (2 minutes remaining). Watch it tick down!",
			},
		},
	},
};

export const Expired: Story = {
	args: {
		targetDate: dayjs().subtract(1, "hour"),
	},
	parameters: {
		docs: {
			description: {
				story:
					"Countdown for a date that has already passed. Should show all zeros.",
			},
		},
	},
};

// Church Events Examples
export const ChurchServiceCountdown: Story = {
	render: () => {
		const nextSunday = dayjs().day(7).hour(10).minute(0).second(0);
		const targetDate = nextSunday.isAfter(dayjs())
			? nextSunday
			: nextSunday.add(1, "week");

		return (
			<Paper sx={{ p: 3, textAlign: "center" }}>
				<Typography variant="h4" gutterBottom color="primary">
					Next Sunday Service
				</Typography>
				<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
					Join us for worship this Sunday at 10:00 AM
				</Typography>
				<CountdownTimer targetDate={targetDate} />
			</Paper>
		);
	},
	parameters: {
		docs: {
			description: {
				story: "Countdown to the next Sunday church service at 10:00 AM.",
			},
		},
	},
};

export const ChristmasCountdown: Story = {
	render: () => {
		const currentYear = dayjs().year();
		const christmas = dayjs(`${currentYear}-12-25`);
		const targetDate = christmas.isAfter(dayjs())
			? christmas
			: christmas.add(1, "year");

		return (
			<Paper
				sx={{
					p: 3,
					textAlign: "center",
					bgcolor: "error.light",
					color: "error.contrastText",
				}}
			>
				<Typography variant="h4" gutterBottom>
					🎄 Christmas Celebration
				</Typography>
				<Typography variant="body1" sx={{ mb: 3 }}>
					Time until our Christmas service
				</Typography>
				<CountdownTimer targetDate={targetDate} />
			</Paper>
		);
	},
	parameters: {
		docs: {
			description: {
				story: "Countdown to Christmas Day celebration.",
			},
		},
	},
};

export const EasterCountdown: Story = {
	render: () => {
		// Simplified Easter calculation (first Sunday after March 21st + some days)
		// This is a simplified version - real Easter calculation is more complex
		const currentYear = dayjs().year();
		const easter = dayjs(`${currentYear}-04-01`).day(7); // Approximate Easter
		const targetDate = easter.isAfter(dayjs()) ? easter : easter.add(1, "year");

		return (
			<Paper
				sx={{
					p: 3,
					textAlign: "center",
					bgcolor: "success.light",
					color: "success.contrastText",
				}}
			>
				<Typography variant="h4" gutterBottom>
					🐣 Easter Celebration
				</Typography>
				<Typography variant="body1" sx={{ mb: 3 }}>
					Time until our Easter service
				</Typography>
				<CountdownTimer targetDate={targetDate} />
			</Paper>
		);
	},
	parameters: {
		docs: {
			description: {
				story: "Countdown to Easter Sunday celebration.",
			},
		},
	},
};

export const ConferenceCountdown: Story = {
	render: () => {
		const conference = createFutureDate(2, "months");

		return (
			<Paper
				sx={{
					p: 3,
					textAlign: "center",
					bgcolor: "secondary.light",
					color: "secondary.contrastText",
				}}
			>
				<Typography variant="h4" gutterBottom>
					📖 Annual Conference
				</Typography>
				<Typography variant="body1" sx={{ mb: 1 }}>
					Join us for our annual church conference
				</Typography>
				<Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
					Three days of worship, fellowship, and learning
				</Typography>
				<CountdownTimer targetDate={conference} />
			</Paper>
		);
	},
	parameters: {
		docs: {
			description: {
				story: "Countdown to an annual church conference event.",
			},
		},
	},
};

export const MultipleEvents: Story = {
	render: () => (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
			<Paper sx={{ p: 2, textAlign: "center" }}>
				<Typography variant="h6" gutterBottom color="primary">
					Bible Study Tonight
				</Typography>
				<CountdownTimer targetDate={createFutureDate(6, "hours")} />
			</Paper>

			<Paper sx={{ p: 2, textAlign: "center" }}>
				<Typography variant="h6" gutterBottom color="secondary">
					Youth Meeting
				</Typography>
				<CountdownTimer targetDate={createFutureDate(3, "days")} />
			</Paper>

			<Paper sx={{ p: 2, textAlign: "center" }}>
				<Typography variant="h6" gutterBottom color="success.main">
					Community Outreach
				</Typography>
				<CountdownTimer targetDate={createFutureDate(1, "weeks")} />
			</Paper>
		</Box>
	),
	parameters: {
		docs: {
			description: {
				story: "Multiple countdown timers for different church events.",
			},
		},
	},
};

export const ResponsiveLayout: Story = {
	args: {
		targetDate: createFutureDate(10, "days"),
	},
	decorators: [
		(Story) => (
			<Box
				sx={{
					padding: 2,
					resize: "horizontal",
					overflow: "auto",
					border: "1px dashed #ccc",
					minWidth: "300px",
					maxWidth: "100%",
				}}
			>
				<Typography
					variant="caption"
					display="block"
					sx={{ mb: 2, color: "text.secondary" }}
				>
					Resize this container to test responsiveness
				</Typography>
				<Story />
			</Box>
		),
	],
	parameters: {
		docs: {
			description: {
				story:
					"Test the countdown timer's responsive behavior by resizing the container.",
			},
		},
	},
};
