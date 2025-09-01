import { theme } from "@components/AppProvider";
import { AuthProvider } from "@contexts/AuthenticationContext";
import { NotificationProvider } from "@contexts/NotificationContext";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type FC, type PropsWithChildren, useMemo } from "react";

//Testing query client to avoid state pollution
const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 0, // No caching in tests for predictable behavior
				gcTime: 0, // Immediate garbage collection in tests
				retry: false, // Don't retry in tests
				refetchOnWindowFocus: false,
			},
			mutations: {
				retry: false,
			},
		},
	});

interface AppProviderTestProps extends PropsWithChildren {
	/** Initial route for MemoryRouter - useful for testing specific routes */
	initialEntries?: string[];
	/** Initial index for MemoryRouter */
	initialIndex?: number;
	/** Custom query client - useful for test-specific configurations */
	queryClient?: QueryClient;
}

const AppProviderTest: FC<AppProviderTestProps> = ({
	children,
	queryClient: customQueryClient,
}) => {
	// Use custom query client or create a new test client
	const queryClient = useMemo(
		() => customQueryClient || createTestQueryClient(),
		[customQueryClient],
	);

	return (
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<ThemeProvider theme={theme}>
						<CssBaseline enableColorScheme />
						<NotificationProvider>{children}</NotificationProvider>
					</ThemeProvider>
				</AuthProvider>
			</QueryClientProvider>
		</React.StrictMode>
	);
};

export default AppProviderTest;
