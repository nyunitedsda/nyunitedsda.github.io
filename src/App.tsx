import { Grid, type SxProps, type Theme } from "@mui/material";
import { type FC } from "react";
import { useRoutes } from "react-router";
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

	return (
		<Grid container sx={rootSx}>
			{element}
		</Grid>
	);
};

export default App;
