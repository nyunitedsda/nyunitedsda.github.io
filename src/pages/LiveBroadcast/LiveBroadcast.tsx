"use client";

import { Box, Grid, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isToday from "dayjs/plugin/isToday";
import { type FC, useEffect, useState } from "react";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import StreamPlayer from "./components/streamPlayers/LiveStream";

dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(advancedFormat);


const LIVE_SERVICE = "Live Worship Service";
const NEXT_SERVICE = "Join Us for Our Next Service";

const LiveBroadcast: FC = () => {
	const [isLive, setIsLive] = useState(true);
	const [nextServiceDate, _setNextServiceDate] = useState(() =>
		dayjs().day(6).hour(10).minute(30),
	);

	const [refreshToken, setRefreshToken] = useState<boolean>(false);

	useEffect(() => {
		// Check if we should be live
		if (
			refreshToken ||
			(nextServiceDate.isToday() &&
				dayjs().isSameOrAfter(nextServiceDate, "minutes"))
		) {
			setIsLive(true);
			setRefreshToken(false);
		} else if (isLive) {
			setIsLive(false);
		}

		return () => {
			setIsLive(false);
		};
	}, [refreshToken, nextServiceDate]);

	return (
		<PageWrapper header={isLive ? LIVE_SERVICE : NEXT_SERVICE}>
			<StreamPlayer />
		
		</PageWrapper>
	);
};

export default LiveBroadcast;
