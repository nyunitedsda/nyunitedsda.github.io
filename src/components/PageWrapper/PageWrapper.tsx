import Stack from "@mui/material/Stack";
import { type SxProps, type Theme } from "@mui/material/styles";
import { type FC } from "react";
import SiteLayout from "./SiteLayout";

const rootSx: SxProps<Theme> = {
	backgroundColor: (theme) => theme.palette.background.paper,
	height: "100%",
	minHeight: "100dvh",
	overflowY: "auto",
	width: "100%",
};

const PageWrapper: FC = () => {
	return (
		<Stack sx={rootSx}>
			<SiteLayout />
		</Stack>
	);
};

export default PageWrapper;
