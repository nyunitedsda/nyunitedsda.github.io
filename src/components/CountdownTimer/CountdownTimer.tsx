import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { type FC, useEffect, useMemo, useState } from "react";
import {
	calculateRemainingTime,
	formatTimeUnits,
	INITIAL_TIMER_VALUES,
} from "./helpers";
import type { CountdownTimerProps, TimeLeft } from "./types";

const clockSx: SxProps<Theme> = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	bgcolor: "primary.main",
	color: "primary.contrastText",
	borderRadius: 2,
	p: 2,
	minWidth: "80px",
};

const CountdownTimer: FC<CountdownTimerProps> = ({ targetDate }) => {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>(INITIAL_TIMER_VALUES);

	useEffect(() => {
		// Initial calculation
		setTimeLeft(calculateRemainingTime(targetDate));

		// Update every second
		const timer = setInterval(() => {
			setTimeLeft(calculateRemainingTime(targetDate));
		}, 1000);

		// Cleanup
		return () => clearInterval(timer);
	}, [targetDate]);

	const timeUnits = useMemo(() => formatTimeUnits(timeLeft), [timeLeft]);

	return (
		<Grid container spacing={2} justifyContent="center">
			{timeUnits.map((unit) => (
				<Grid key={unit.label}>
					<Box sx={clockSx}>
						<Typography variant="h4" component="div" fontWeight="bold">
							{unit.value.toString().padStart(2, "0")}
						</Typography>
						<Typography variant="body2">{unit.label}</Typography>
					</Box>
				</Grid>
			))}
		</Grid>
	);
};

export default CountdownTimer;
