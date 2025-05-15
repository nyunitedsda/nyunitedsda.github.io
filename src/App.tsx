import { Grid, Stack } from "@mui/material";
import { type FC } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useRoutes } from "react-router";
import routes from "./constants/routes";

const HEADER_SIZE = 68.5;
const FOOTER_SIZE = 250;
const App: FC = () => {
	const element = useRoutes(routes);

	return (
		<Grid
			container
			sx={{
				width: "100%",
				height: "100%",
				overflowX: "hidden",
				overflowY: "auto",
			}}
		>
			<Header />
			<Stack
      direction={'column'}
				sx={{
					flexGrow: 1,
					minHeight: `calc(100vh - ${HEADER_SIZE + FOOTER_SIZE}px)`,
					width: "100%",
				}}
			>
				{element}
			</Stack>

			<Footer />
		</Grid>
	);
};

export default App;
