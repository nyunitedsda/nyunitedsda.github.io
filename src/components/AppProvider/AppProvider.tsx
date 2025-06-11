import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type FC, type PropsWithChildren, StrictMode } from "react";
import { BrowserRouter } from "react-router";
import theme from "./theme";

const queryClient = new QueryClient();

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<StrictMode>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<CssBaseline enableColorScheme />
					<ThemeProvider theme={theme}>{children}</ThemeProvider>
				</QueryClientProvider>
			</BrowserRouter>
		</StrictMode>
	);
};

export default AppProvider;
