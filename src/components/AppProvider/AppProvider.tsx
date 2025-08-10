import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { type FC, type PropsWithChildren, StrictMode, useMemo } from "react";
import { AuthenticationProvider } from "../../contexts/AuthenticationContext";
import NotificationProvider from "../../contexts/NotificationContext/NotificationContext";
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
		<StrictMode>
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
					<AuthenticationProvider>
						<ThemeProvider theme={theme}>
							{/* Using enableColorScheme for better dark/light mode handling */}
							<CssBaseline enableColorScheme />
							<NotificationProvider>{children}</NotificationProvider>
						</ThemeProvider>
					</AuthenticationProvider>
					{/* </BrowserRouter> */}
				</SnackbarProvider>
			</QueryClientProvider>
		</StrictMode>
	);
};

export default AppProvider;
