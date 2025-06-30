import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { type FC, type PropsWithChildren, StrictMode, useMemo } from "react";
import { BrowserRouter } from "react-router";
import { AuthenticationProvider } from "../../contexts/AuthenticationContext";
import NotificationProvider from "../../contexts/NotificationContext/NotificationContext";
import theme from "./theme";

// Configure the query client with performance optimizations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false, // Don't refetch when window regains focus (better UX)
    },
    mutations: {
      retry: 1,
    },
  },
});

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
	// Memoize snackbar options to prevent unnecessary re-renders
	const snackbarAnchor = useMemo(() => ({ 
		vertical: "bottom" as const, 
		horizontal: "right" as const 
	}), []);

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
