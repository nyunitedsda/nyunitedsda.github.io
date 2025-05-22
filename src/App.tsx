import { Grid, type SxProps, type Theme } from "@mui/material";
import { type FC, useEffect } from "react";
import { useRoutes } from "react-router";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useFormattedRoutes from "./hooks/routes/useFormattedRoutes";

const rootSx: SxProps<Theme> = {
	width: "100%",
	height: "100%",
	overflowX: "hidden",
	overflowY: "auto",
};

const App: FC = () => {
	const { routes } = useFormattedRoutes();
	const element = useRoutes(routes);

	console.table(routes);

	useEffect(() => {}, []);
	return (
		<Grid container sx={rootSx}>
			{element}
		</Grid>
	);
};

export default App;
