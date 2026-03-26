import routes from "@/hooks/routes";
import type { FC } from "react";
import { RouterProvider } from "react-router-dom";

const App: FC = () => {
	return <RouterProvider router={routes} />;
};

export default App;
