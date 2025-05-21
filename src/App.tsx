import { Grid, type SxProps, type Theme } from "@mui/material";
import { type FC, useEffect } from "react";
import { useRoutes } from "react-router";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import routes from "./constants/routes";

const rootSx: SxProps<Theme> = {
	width: "100%",
	height: "100%",
	overflowX: "hidden",
	overflowY: "auto",
};

const App: FC = () => {
	const element = useRoutes(routes);

	useEffect(() => {}, []);
	return (
		<Grid container sx={rootSx}>
			{element}
		</Grid>
	);
};

export default App;
