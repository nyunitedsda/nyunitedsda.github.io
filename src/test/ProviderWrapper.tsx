import { queryClient, theme } from "@components/AppProvider";
import { AuthProvider } from "@contexts/AuthenticationContext";
import { NotificationProvider } from "@contexts/NotificationContext";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import React, { type FC, useMemo } from "react";
import { MemoryRouter } from "react-router-dom";
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
		return <React.StrictMode>{wrappedChildren}</React.StrictMode>;
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
		wrappedChildren = <AuthProvider>{wrappedChildren}</AuthProvider>;
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
