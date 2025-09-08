import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/base.css";

if (typeof window !== "undefined") {
	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
