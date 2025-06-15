import Stack from "@mui/material/Stack";
import { type SxProps, type Theme, useTheme } from "@mui/material/styles";
import { type FC } from "react";
import { Outlet } from "react-router";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const containerSx: SxProps<Theme> = {
	pt: 8,
	pb: 4,
	flexGrow: 1,
	justifyContent: "flex-start",
	minHeight: "100%",
	height: "auto",
	ml: "auto",
	mr: "auto",
	maxWidth: "1200px",
	width: "100%",
};

const rootSx: SxProps<Theme> = {
	width: "100%",
	minHeight: "100%",
	backgroundColor: (theme) => theme.palette.background.paper,
	overflowY: "auto",
	height: "auto",
};

const PageWrapper: FC = () => {
	const theme = useTheme();

	return (
		<Stack sx={rootSx}>
			<Header />
			<Stack sx={containerSx}>
				<Outlet />
			</Stack>
			<ScrollToTop smooth top={30} color={theme.palette.primary.light} />
			<Footer />
		</Stack>
	);
};

export default PageWrapper;
