import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { type FC, StrictMode, useMemo } from "react";
import { MemoryRouter } from "react-router";
import queryClient from "../components/AppProvider/queryClient";
import theme from "../components/AppProvider/theme";
import AuthenticationProvider from "../contexts/AuthenticationContext/AuthenticationContext";
import NotificationProvider from "../contexts/NotificationContext/NotificationContext";
import type { DynamicProviderProps, ExcludedProvider } from "./types";

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

	if (shouldExclude("All")) {
		return <StrictMode>{wrappedChildren}</StrictMode>;
	}

	// Apply providers in reverse order (innermost to outermost)
	if (!shouldExclude("Notification")) {
		wrappedChildren = (
			<NotificationProvider>{wrappedChildren}</NotificationProvider>
		);
	}

	if (!shouldExclude("Theme")) {
		wrappedChildren = (
			<ThemeProvider theme={theme}>
				<CssBaseline enableColorScheme />
				{wrappedChildren}
			</ThemeProvider>
		);
	}

	if (!shouldExclude("Router")) {
		wrappedChildren = (
			<MemoryRouter {...routerProps}>{wrappedChildren}</MemoryRouter>
		);
	}

	if (!shouldExclude("Authentication")) {
		wrappedChildren = (
			<AuthenticationProvider>{wrappedChildren}</AuthenticationProvider>
		);
	}

	if (!shouldExclude("Snackbar")) {
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

	if (!shouldExclude("QueryClient") || !shouldExclude("Authentication")) {
		wrappedChildren = (
			<QueryClientProvider client={queryClient}>
				{wrappedChildren}
			</QueryClientProvider>
		);
	}

	return <>{wrappedChildren}</>;
};

export default DynamicProvider;
