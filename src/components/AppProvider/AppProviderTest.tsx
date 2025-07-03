import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type FC, type PropsWithChildren, StrictMode, useMemo } from "react";
import { MemoryRouter } from "react-router";
import NotificationProvider from "../../contexts/NotificationContext/NotificationContext";
import theme from "./theme";

// Create a separate query client for testing to avoid state pollution
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
	initialEntries = ["/"],
	initialIndex = 0,
	queryClient: customQueryClient,
}) => {
	// Use custom query client or create a new test client
	const queryClient = useMemo(
		() => customQueryClient || createTestQueryClient(),
		[customQueryClient],
	);

	return (
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<MemoryRouter
					initialEntries={initialEntries}
					initialIndex={initialIndex}
				>
					<ThemeProvider theme={theme}>
						<CssBaseline enableColorScheme />
						<NotificationProvider>{children}</NotificationProvider>
					</ThemeProvider>
				</MemoryRouter>
			</QueryClientProvider>
		</StrictMode>
	);
};

export default AppProviderTest;
