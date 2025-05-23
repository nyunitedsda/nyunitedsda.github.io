"use client";

import { Box, Grid, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isToday from 'dayjs/plugin/isToday';
import { type FC, useEffect, useState } from "react";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

dayjs.extend(isToday)
dayjs.extend(isSameOrAfter);

const LIVE_SERVICE = "Live Worship Service";
const NEXT_SERVICE = "Join Us for Our Next Service";

const LiveBroadcast: FC = () => {
	const [isLive, setIsLive] = useState(false);
	const [nextServiceDate, _setNextServiceDate] = useState(
		() => dayjs().day(5).hour(10).minute(30),
	);

	const [refreshToken, setRefreshToken] = useState<boolean>(false);

	useEffect(() => {
		// Check if we should be live (Sunday between 9 AM and 12 PM)
		if (
			refreshToken ||
			(nextServiceDate.isToday() &&
				dayjs().isSameOrAfter(nextServiceDate, 'minutes'))
		) {
			setIsLive(true);
			setRefreshToken(false);
		}

	}, [refreshToken, nextServiceDate]);

	return (
		<PageWrapper header={isLive ? LIVE_SERVICE : NEXT_SERVICE}>
			{/* <Container maxWidth="lg" sx={{ mt: 8, mb: 8, flexGrow: 1 }}> */}
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
								elevation={0}
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
									{`Join us on ${nextServiceDate.format('dddd DDD, h:mm a')} for our live worship service.`}
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
			{/* </Container> */}
		</PageWrapper>
	);
};

export default LiveBroadcast;
