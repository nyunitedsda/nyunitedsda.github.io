import Stack from "@mui/material/Stack";
import { type SxProps, type Theme, useTheme } from "@mui/material/styles";
import { type FC } from "react";
import { Outlet } from "react-router";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ProjectSuspense from "../ProjectSuspense/ProjectSuspense";

const containerSx: SxProps<Theme> = {
	flexGrow: 1,
	height: "auto",
	justifyContent: "flex-start",
	maxWidth: "1200px",
	ml: "auto",
	mr: "auto",
	pb: 4,
	pt: { xs: 4, md: 8 },
	px: 2,
	width: "100%",
};

const rootSx: SxProps<Theme> = {
	backgroundColor: (theme) => theme.palette.background.paper,
	height: "auto",
	minHeight: "100%",
	overflowY: "auto",
	width: "100%",
};

// TODO: Reduce the containerSx pt for mobile
// FEATURE: Enhance scroll to top button style

const PageWrapper: FC = () => {
	const theme = useTheme();
	return (
		<Stack sx={rootSx}>
			<Header />
			<Stack sx={containerSx}>
				<ProjectSuspense>
					<Outlet />
				</ProjectSuspense>
			</Stack>

			<ScrollToTop smooth top={30} color={theme.palette.primary.light} />
			<Footer />
		</Stack>
	);
};

export default PageWrapper;
