import { type FC } from "react";
import { useRoutes } from "react-router";
import useFormattedRoutes from "./hooks/routes/useFormattedRoutes";

const App: FC = () => {
	const { routes } = useFormattedRoutes();
	const element = useRoutes(routes);

	return (<>{element}</>);
};

export default App;
