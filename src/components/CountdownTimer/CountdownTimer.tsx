"use client";

import { Box, Grid, type SxProps, type Theme, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

interface CountdownTimerProps {
	targetDate: Date;
}

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

const clockSx: SxProps<Theme> = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	bgcolor: "primary.main",
	color: "white",
	borderRadius: 2,
	p: 2,
	minWidth: "80px",
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		const calculateTimeLeft = () => {
			const difference = targetDate.getTime() - new Date().getTime();

			if (difference > 0) {
				return {
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((difference / 1000 / 60) % 60),
					seconds: Math.floor((difference / 1000) % 60),
				};
			} else {
				return {
					days: 0,
					hours: 0,
					minutes: 0,
					seconds: 0,
				};
			}
		};

		// Initial calculation
		setTimeLeft(calculateTimeLeft());

		// Update every second
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		// Cleanup
		return () => clearInterval(timer);
	}, [targetDate]);

	const timeUnits = useMemo(() => [
		{ label: "Days", value: timeLeft.days },
		{ label: "Hours", value: timeLeft.hours },
		{ label: "Minutes", value: timeLeft.minutes },
		{ label: "Seconds", value: timeLeft.seconds },
	], [timeLeft]);

	return (
		<Grid container spacing={2} justifyContent="center">
			{timeUnits.map((unit) => (
				<Grid key={unit.label}>
					<Box
						sx={clockSx}
					>
						<Typography
							variant="h4"
							component="div"
							sx={{ fontWeight: "bold" }}
						>
							{unit.value.toString().padStart(2, "0")}
						</Typography>
						<Typography variant="body2">{unit.label}</Typography>
					</Box>
				</Grid>
			))}
		</Grid>
	);
}
