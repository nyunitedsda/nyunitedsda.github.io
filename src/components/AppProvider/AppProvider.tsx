import { CssBaseline, ThemeProvider } from "@mui/material";
import { type FC, type PropsWithChildren, StrictMode } from "react";
import { BrowserRouter } from "react-router";
import theme from "./theme";

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<StrictMode>
			<BrowserRouter>
				<CssBaseline enableColorScheme />
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</BrowserRouter>
		</StrictMode>
	);
};

export default AppProvider;
