import Footer from "@components/Footer";
import Header from "@components/Header";
import NotificationBanner from "@components/NotificationBanner";
import { PageContentContainer } from "@components/PageWrapper";
import ProjectSuspense from "@components/ProjectSuspense";
import { NotificationContext } from "@contexts/NotificationContext";
import Stack from "@mui/material/Stack";
import { type SxProps, type Theme, useTheme } from "@mui/material/styles";
import { type FC, useContext } from "react";
import { Outlet } from "react-router";
import ScrollToTop from "react-scroll-to-top";

const containerSx: SxProps<Theme> = {
	display: "flex",
	flexDirection: "column",
	flexGrow: 1,
	height: "100%",
	justifyContent: "flex-start",
	maxWidth: "1200px",
	ml: "auto",
	mr: "auto",
	p: { xs: 1, md: 2 },
	width: "100%",
};

const rootSx: SxProps<Theme> = {
	backgroundColor: (theme) => theme.palette.background.paper,
	height: "100%",
	minHeight: "100dvh",
	overflowY: "auto",
	width: "100%",
};

const PageWrapper: FC = () => {
	const theme = useTheme();
	const { notifications } = useContext(NotificationContext);
	return (
		<Stack sx={rootSx}>
			{notifications.map((i) => (
				<NotificationBanner key={i.id} {...i} open />
			))}
			<Header />
			<PageContentContainer sx={containerSx}>
				<ProjectSuspense>
					<Outlet />
				</ProjectSuspense>
			</PageContentContainer>

			<ScrollToTop smooth top={30} color={theme.palette.primary.light} />
			<Footer />
		</Stack>
	);
};

export default PageWrapper;
