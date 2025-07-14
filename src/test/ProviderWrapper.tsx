import { StrictMode, useMemo, type FC } from "react";
import type { DynamicProviderProps, ExcludedProvider } from "./types";
import { QueryClientProvider } from "@tanstack/react-query";
import NotificationProvider from "../contexts/NotificationContext/NotificationContext";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../components/AppProvider/theme";
import { MemoryRouter } from "react-router";
import AuthenticationProvider from "../contexts/AuthenticationContext/AuthenticationContext";
import queryClient from "../components/AppProvider/queryClient";





const DynamicProvider: FC<DynamicProviderProps> = ({
	children,
	routerOptions,
	excludeProviders = [],
}) => {
	// Memoize snackbar options to prevent unnecessary re-renders
	const snackbarAnchor = useMemo(
		() => ({
			vertical: "bottom" as const,
			horizontal: "right" as const,
		}),
		[],
	);

	const routerProps = useMemo(
		() => ({
			initialEntries: routerOptions?.initialEntries || ["/test"],
			initialIndex: routerOptions?.initialIndex || 0,
		}),
		[routerOptions],
	);

	// Helper function to check if a provider should be excluded
	const shouldExclude = (provider: ExcludedProvider) =>
		excludeProviders.includes(provider);

	// Build the provider tree dynamically
	let wrappedChildren = children;

	if (shouldExclude('All')) {
		return <StrictMode>{wrappedChildren}</StrictMode>;
	}

	// Apply providers in reverse order (innermost to outermost)
	if (!shouldExclude('Notification')) {
		wrappedChildren = (
			<NotificationProvider>{wrappedChildren}</NotificationProvider>
		);
	}

	if (!shouldExclude('Snackbar')) {
		wrappedChildren = (
			<SnackbarProvider
				maxSnack={3}
				anchorOrigin={snackbarAnchor}
				// Prevent excessive DOM nodes with autoHideDuration
				autoHideDuration={5000}
				// Prevent layout shifts
				preventDuplicate
				dense
			>
				{wrappedChildren}
			</SnackbarProvider>
		);
	}

	if (!shouldExclude('Theme')) {
		wrappedChildren = (
			<ThemeProvider theme={theme}>
				<CssBaseline enableColorScheme />
				{wrappedChildren}</ThemeProvider>
		);
	}

	if (!shouldExclude('QueryClient')) {
		wrappedChildren = (
			<QueryClientProvider client={queryClient}>
				{wrappedChildren}
			</QueryClientProvider>
		);
	}

	if (!shouldExclude('Router')) {
		wrappedChildren = (
			<MemoryRouter {...routerProps}>{wrappedChildren}</MemoryRouter>
		);
	}

	if (!shouldExclude('Authentication')) {
		wrappedChildren = (
			<AuthenticationProvider>{wrappedChildren}</AuthenticationProvider>
		);
	}

	return <>{wrappedChildren}</>;
};

export default DynamicProvider;