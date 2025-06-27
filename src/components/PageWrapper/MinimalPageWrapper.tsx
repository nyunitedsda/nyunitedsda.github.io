import Stack from "@mui/material/Stack";
import type { FC } from "react";
import { Outlet } from "react-router";

const MinimalPageWrapper: FC = () => (
	<Stack
		sx={{
			width: "100%",
			height: "100%",
			color: "text.primary",
		}}
	>
		<Outlet />
	</Stack>
);

export default MinimalPageWrapper;
