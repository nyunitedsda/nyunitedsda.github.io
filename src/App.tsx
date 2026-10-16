import type { FC } from "react";
import { RouterProvider } from "react-router-dom";
import routes from "@/hooks/routes";

const App: FC = () => {
	return <RouterProvider router={routes} />;
};

export default App;
