import type { FC } from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./hooks/routes/routes.ts";

const App: FC = () => {
	return <RouterProvider router={routes} />;
};

export default App;
