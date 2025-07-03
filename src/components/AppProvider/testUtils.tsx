import { QueryClient } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import { type ReactElement, type ReactNode } from "react";
import AppProviderTest from "./AppProviderTest";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
	/** Initial route for MemoryRouter */
	initialEntries?: string[];
	/** Initial index for MemoryRouter */
	initialIndex?: number;
	/** Custom query client for testing */
	queryClient?: QueryClient;
}

/**
 * Custom render function that wraps components with AppProviderTest
 * This is useful for testing components that depend on the app's context providers
 */
export const renderWithProviders = (
	ui: ReactElement,
	{
		initialEntries = ["/"],
		initialIndex = 0,
		queryClient,
		...renderOptions
	}: CustomRenderOptions = {},
) => {
	const Wrapper = ({ children }: { children: ReactNode }) => (
		<AppProviderTest
			initialEntries={initialEntries}
			initialIndex={initialIndex}
			queryClient={queryClient}
		>
			{children}
		</AppProviderTest>
	);

	return render(ui, { wrapper: Wrapper, ...renderOptions });
};

/**
 * Creates a test query client with sensible defaults for testing
 */
export const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 0,
				gcTime: 0,
				retry: false,
				refetchOnWindowFocus: false,
			},
			mutations: {
				retry: false,
			},
		},
	});

export default renderWithProviders;
