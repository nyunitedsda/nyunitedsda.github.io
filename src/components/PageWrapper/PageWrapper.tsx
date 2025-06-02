import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type SxProps, type Theme, useTheme } from "@mui/material/styles";
import type { FC, PropsWithChildren } from "react";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
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
	minHeight: "100%",
	backgroundColor: (theme) => theme.palette.background.paper,
};

// TODO: Reduce the containerSx pt for mobile

const PageWrapper: FC<PropsWithChildren<PageWrapperProps>> = (props) => {
	const { header, subHeader, children } = props;
	const theme = useTheme();
	return (
		<Stack sx={rootSx}>
			<Header />
			<Container maxWidth="lg" sx={containerSx}>
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
			</Container>

			<ScrollToTop smooth top={30} color={theme.palette.primary.light} />
			<Footer />
		</Stack>
	);
};

export default PageWrapper;
