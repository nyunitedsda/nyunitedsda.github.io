import { queryClient, theme } from "@components/AppProvider";
import { AuthProvider } from "@contexts/AuthenticationContext";
import { NotificationProvider } from "@contexts/NotificationContext";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { SnackbarProvider } from "notistack";
import React, { type FC, type PropsWithChildren, useMemo } from "react";
import antDTheme from "./antDTheme";

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
							<ConfigProvider theme={antDTheme}>
								<ThemeProvider theme={theme}>
									{/* Using enableColorScheme for better dark/light mode handling */}
									<CssBaseline enableColorScheme />
									<NotificationProvider>{children}</NotificationProvider>
								</ThemeProvider>
							</ConfigProvider>
						</AuthProvider>
					</SnackbarProvider>
				</QueryClientProvider>
			</LocalizationProvider>
		</React.StrictMode>
	);
};

export default AppProvider;
