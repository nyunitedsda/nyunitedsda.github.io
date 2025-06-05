import { type FC } from "react";
import { useRoutes } from "react-router";
import siteRoutes from "./hooks/routes/reviewedRoutes";

// FEATURE: Consider creating a hook that tracks the changes of the pathname and update the site title with the menu name

const App: FC = () => {
	const element = useRoutes(siteRoutes);

	return <>{element}</>;
};

export default App;
