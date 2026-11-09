import { queryClient } from "@components/AppProvider";
import { AuthProvider } from "@contexts/AuthenticationContext";
import { NotificationProvider } from "@contexts/NotificationContext";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider as Provider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import React, { type FC, type PropsWithChildren, useMemo } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";

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
		<React.StrictMode>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<QueryClientProvider client={queryClient}>
					<SnackbarProvider
						maxSnack={3}
						anchorOrigin={snackbarAnchor}
						// Prevent excessive DOM nodes with autoHideDuration
						autoHideDuration={5000}
						// Prevent layout shifts
						preventDuplicate
						dense
					>
						<AuthProvider>
							<ThemeProvider>
								<Provider theme={createTheme({ palette: { mode: "dark" } })}>
									<CssBaseline enableColorScheme />
									<NotificationProvider>{children}</NotificationProvider>
								</Provider>
							</ThemeProvider>
						</AuthProvider>
					</SnackbarProvider>
				</QueryClientProvider>
			</LocalizationProvider>
		</React.StrictMode>
	);
};

export default AppProvider;
