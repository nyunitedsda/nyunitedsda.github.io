import { createRoot } from "react-dom/client";
import App from "./App";
import AppProvider from "./components/AppProvider/AppProvider";
import DonationAdmin from "./pages/Admin/DonationAdmin";

createRoot(document.getElementById("root")!).render(
	<AppProvider>
		<App />
		{/* <DonationAdmin /> */}
	</AppProvider>,
);
