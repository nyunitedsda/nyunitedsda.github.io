import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type SxProps, type Theme, useTheme } from "@mui/material/styles";
import type { FC, PropsWithChildren } from "react";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import PageContentContainer from "./PageContentContainer";
import type { PageWrapperProps } from "./types";

const headerSx: SxProps<Theme> = {
	fontWeight: "bold",
	color: "primary.light",
	fontFamily: "inter",
};
const containerSx: SxProps<Theme> = {
	pt: 8,
	pb: 4,
	flexGrow: 1,
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-start",
};
const subHeaderSx: SxProps<Theme> = {
	fontWeight: "bold",
	color: "text.primary",
};

const rootSx: SxProps<Theme> = {
	width: "100%",
	minHeight: { xs: '100%', sm: "100vh" },
	backgroundColor: (theme) => theme.palette.background.paper,
	overflowY: 'auto',
	height: '100%',
	position: 'absolute',
	top: 0,
	left: 0,
};

// TODO: Reduce the containerSx pt for mobile
// FEATURE: Enhance scroll to top button style 

const PageWrapper: FC<PropsWithChildren<PageWrapperProps>> = (props) => {
	const { header, subHeader, children } = props;
	const theme = useTheme();
	return (
		<Stack sx={rootSx}>
			<Header />
			<PageContentContainer sx={containerSx}>
				{(header || subHeader) && (
					<Stack spacing={2} sx={{ pb: 2 }} className="fade-in">
						{header && (
							<Typography variant="h3" component="h1" sx={headerSx}>
								{header}
							</Typography>
						)}
						{subHeader && (
							<Typography variant="h6" sx={subHeaderSx}>
								{subHeader}
							</Typography>
						)}
					</Stack>
				)}
				<Stack sx={{ flexGrow: 1, gap: 2, color: "text.primary" }}>
					{children}
				</Stack>
			</PageContentContainer>

			<ScrollToTop smooth top={30} color={theme.palette.primary.light} />
			<Footer />
		</Stack>
	);
};

export default PageWrapper;
