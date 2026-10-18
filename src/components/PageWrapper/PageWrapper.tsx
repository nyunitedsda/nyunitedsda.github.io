import NotificationBanner from "@components/NotificationBanner";
import { NotificationContext } from "@contexts/NotificationContext";
import Stack from "@mui/material/Stack";
import { type SxProps, type Theme } from "@mui/material/styles";
import { type FC, useContext } from "react";
import SiteLayout from "./SiteLayout";

const rootSx: SxProps<Theme> = {
	backgroundColor: (theme) => theme.palette.background.paper,
	height: "100%",
	minHeight: "100dvh",
	overflowY: "auto",
	width: "100%",
};

const PageWrapper: FC = () => {
	const { notifications } = useContext(NotificationContext);
	return (
		<Stack sx={rootSx}>
			{notifications.map((i) => (
				<NotificationBanner key={i.id} {...i} open />
			))}
			<SiteLayout/>
		</Stack>
	);
};

export default PageWrapper;
