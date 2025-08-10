import { AuthProvider } from "@contexts/AuthenticationContext";
import { NotificationProvider } from "@contexts/NotificationContext";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import React, { type FC, type PropsWithChildren, useMemo } from "react";
import queryClient from "./queryClient";
import theme from "./theme";

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
					{/* <BrowserRouter> */}
					<AuthProvider>
						<ThemeProvider theme={theme}>
							{/* Using enableColorScheme for better dark/light mode handling */}
							<CssBaseline enableColorScheme />
							<NotificationProvider>{children}</NotificationProvider>
						</ThemeProvider>
					</AuthProvider>
					{/* </BrowserRouter> */}
				</SnackbarProvider>
			</QueryClientProvider>
		</React.StrictMode>
	);
};

export default AppProvider;
