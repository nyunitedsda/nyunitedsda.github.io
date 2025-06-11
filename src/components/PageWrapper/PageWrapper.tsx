import Stack from "@mui/material/Stack";
import { type SxProps, type Theme, useTheme } from "@mui/material/styles";
import type { FC } from "react";
import { Outlet } from "react-router";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ProjectSuspense from "../ProjectSuspense/ProjectSuspense";
import PageContentContainer from "./PageContentContainer";

const containerSx: SxProps<Theme> = {
	display: "flex",
	flexDirection: "column",
	flexGrow: 1,
	height: "auto",
	justifyContent: "flex-start",
	maxWidth: "1200px",
	ml: "auto",
	mr: "auto",
	p: 2,
	width: "100%",
};

const rootSx: SxProps<Theme> = {
	backgroundColor: (theme) => theme.palette.background.paper,
	height: "auto",
	minHeight: "100%",
	overflowY: "auto",
	width: "100%",
};

const PageWrapper: FC = () => {
	const theme = useTheme();
	return (
		<Stack sx={rootSx}>
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
