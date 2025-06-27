import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { type FC, type PropsWithChildren, StrictMode } from "react";
import { BrowserRouter } from "react-router";
import { AuthenticationProvider } from "../../contexts/AuthenticationContext";
import NotificationProvider from "../../contexts/NotificationContext/NotificationContext";
import theme from "./theme";

const queryClient = new QueryClient();

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<StrictMode>
			<AuthenticationProvider>
				<BrowserRouter>
					<QueryClientProvider client={queryClient}>
						<ThemeProvider theme={theme}>
							<CssBaseline enableColorScheme />
							<SnackbarProvider
								maxSnack={3}
								anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
							>
								<NotificationProvider>{children}</NotificationProvider>
							</SnackbarProvider>
						</ThemeProvider>
					</QueryClientProvider>
				</BrowserRouter>
			</AuthenticationProvider>
		</StrictMode>
	);
};

export default AppProvider;
