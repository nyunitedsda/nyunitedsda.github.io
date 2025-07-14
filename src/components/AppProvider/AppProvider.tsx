import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { type FC, type PropsWithChildren, StrictMode, useMemo } from "react";
import { BrowserRouter } from "react-router";
import { AuthenticationProvider } from "../../contexts/AuthenticationContext";
import NotificationProvider from "../../contexts/NotificationContext/NotificationContext";
import theme from "./theme";
import queryClient from "./queryClient";



const AppProvider: FC<PropsWithChildren> = ({ children }) => {
	// Memoize snackbar options to prevent unnecessary re-renders
	const snackbarAnchor = useMemo(
		() => ({
			vertical: "bottom" as const,
			horizontal: "right" as const,
		}),
		[],
	);

	return (
		<StrictMode>
			<AuthenticationProvider>
				<BrowserRouter>
					<QueryClientProvider client={queryClient}>
						<ThemeProvider theme={theme}>
							{/* Using enableColorScheme for better dark/light mode handling */}
							<CssBaseline enableColorScheme />
							<SnackbarProvider
								maxSnack={3}
								anchorOrigin={snackbarAnchor}
								// Prevent excessive DOM nodes with autoHideDuration
								autoHideDuration={5000}
								// Prevent layout shifts
								preventDuplicate
								dense
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
