"use client";

import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState, type FC } from "react";

const LiveBroadcast: FC = () => {
	const [isLive, setIsLive] = useState(false);
	const [nextServiceDate, setNextServiceDate] = useState(
		new Date("2023-05-21T09:00:00"),
	);

	useEffect(() => {
		// Check if we should be live (Sunday between 9 AM and 12 PM)
		const now = new Date();
		const day = now.getDay();
		const hour = now.getHours();

		if (day === 0 && hour >= 9 && hour < 12) {
			setIsLive(true);
		} else {
			// Set next service date to next Sunday at 9 AM
			const daysUntilSunday = day === 0 ? 7 : 7 - day;
			const nextSunday = new Date();
			nextSunday.setDate(now.getDate() + daysUntilSunday);
			nextSunday.setHours(9, 0, 0, 0);
			setNextServiceDate(nextSunday);
		}
	}, []);

	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			<Container maxWidth="lg" sx={{ mt: 8, mb: 8, flexGrow: 1 }}>
				<Typography
					variant="h3"
					component="h1"
					className="fade-in"
					sx={{
						mb: 4,
						fontWeight: "bold",
						color: "primary.main",
						textAlign: "center",
					}}
				>
					{isLive ? "Live Worship Service" : "Join Us for Our Next Service"}
				</Typography>

				{isLive ? (
					<Box className="fade-in" sx={{ mt: 4 }}>
						<Paper
							elevation={3}
							sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2 }}
						>
							<Box
								sx={{
									position: "relative",
									paddingTop: "56.25%",
									width: "100%",
								}}
							>
								<iframe
									style={{
										position: "absolute",
										top: 0,
										left: 0,
										width: "100%",
										height: "100%",
									}}
									src="https://www.youtube.com/embed/live_stream?channel=UC-example-church-channel"
									title="YouTube live stream"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
							</Box>
						</Paper>
						<Typography variant="body1" sx={{ mt: 3, textAlign: "center" }}>
							If you're having trouble with the stream, please refresh the page
							or visit our {/* TODO: Get church Youtube channel */}
							<a
								href="https://youtube.com/@example-church"
								target="_blank"
								rel="noopener noreferrer"
							>
								YouTube channel
							</a>{" "}
							directly.
						</Typography>
					</Box>
				) : (
					<Grid container spacing={4} justifyContent="center">
						<Grid size={{ xs: 12, md: 8 }} className="fade-in">
							<Paper
								elevation={3}
								sx={{
									p: 4,
									bgcolor: "background.paper",
									borderRadius: 2,
									textAlign: "center",
								}}
							>
								<Typography variant="h5" sx={{ mb: 3, color: "text.primary" }}>
									Next Live Service Countdown
								</Typography>
								<CountdownTimer targetDate={nextServiceDate} />
								<Typography variant="body1" sx={{ mt: 3 }}>
									Join us every Sunday at 9:00 AM for our live worship service.
								</Typography>
							</Paper>
						</Grid>
						<Grid size={{ xs: 12, md: 8 }} className="fade-in">
							<Paper
								elevation={3}
								sx={{
									p: 4,
									mt: 4,
									bgcolor: "background.paper",
									borderRadius: 2,
								}}
							>
								<Typography
									variant="h5"
									sx={{ mb: 3, color: "text.primary", textAlign: "center" }}
								>
									Previous Services
								</Typography>
								<Box
									sx={{
										position: "relative",
										paddingTop: "56.25%",
										width: "100%",
									}}
								>
									<iframe
										style={{
											position: "absolute",
											top: 0,
											left: 0,
											width: "100%",
											height: "100%",
										}}
										// Ensure this is working
										src="https://www.youtube.com/embed/videoseries?list=PL-example-church-playlist"
										title="YouTube video player"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
									></iframe>
								</Box>
							</Paper>
						</Grid>
					</Grid>
				)}
			</Container>
		</Box>
	);
};

export default LiveBroadcast;
