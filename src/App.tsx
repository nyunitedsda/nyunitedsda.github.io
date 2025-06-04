import { type FC } from "react";
import { useRoutes } from "react-router";
import useFormattedRoutes from "./hooks/routes/useFormattedRoutes";

// FEATURE: Consider creating a hook that tracks the changes of the pathname and update the site title with the menu name

const App: FC = () => {
	const { routes } = useFormattedRoutes();
	const element = useRoutes(routes);
	
	return <>{element}</>;
};

export default App;
