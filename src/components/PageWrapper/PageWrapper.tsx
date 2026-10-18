import Footer from "@components/Footer";
import Header from "@components/Header";
import NotificationBanner from "@components/NotificationBanner";
import { PageContentContainer } from "@components/PageWrapper";
import ProjectSuspense from "@components/ProjectSuspense";
import { NotificationContext } from "@contexts/NotificationContext";
import { type SxProps, type Theme, useTheme } from "@mui/material/styles";
import { Flex } from "antd";
import { type CSSProperties, type FC, useContext } from "react";
import { Outlet } from "react-router";
import ScrollToTop from "react-scroll-to-top";
import SiteLayout from "./SiteLayout";

const containerSx: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	flexGrow: 1,
	height: "100%",
	justifyContent: "flex-start",
	maxWidth: "1200px",
	alignItems: "center",
	// ml: "auto",
	// mr: "auto",
	p: '0px',
	width: "100%",
};

const rootSx: CSSProperties = {
	// height: "100%",
	// minHeight: "100dvh",
	// overflowY: "auto",
	width: "100%",
	flexGrow: 1,
	alignItems: "center",
};

const PageWrapper: FC = () => {
	const theme = useTheme();
	const { notifications } = useContext(NotificationContext);
	return (
		<>
			{notifications.map((i) => (
				<NotificationBanner key={i.id} {...i} open />
			))}

			<SiteLayout />

			{/* 			
		<Flex
			vertical
			style={{
				...rootSx,
				backgroundColor: theme.palette.background.paper
			}}
		>
			{/* {notifications.map((i) => (
				<NotificationBanner key={i.id} {...i} open />
			))} *}
			<Header />
			<Flex vertical style={containerSx}>
				<ProjectSuspense>
					<Outlet />
				</ProjectSuspense>
				<ScrollToTop smooth top={30} color={theme.palette.primary.light} />
			<Footer />
			</Flex>			
		</Flex> */}


		</>
	);
};

export default PageWrapper;
