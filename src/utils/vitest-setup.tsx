import { vi } from "vitest";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { type RenderOptions, render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import type { ReactElement } from "react";
import { type FC, type PropsWithChildren, StrictMode, useMemo } from "react";
import { MemoryRouter } from "react-router";
import theme from "../components/AppProvider/theme";
import { AuthenticationProvider } from "../contexts/AuthenticationContext";
import NotificationProvider from "../contexts/NotificationContext/NotificationContext";

// Mock DOM methods and objects that cause issues in tests
Object.defineProperty(window, "scrollTo", {
	value: vi.fn(),
	writable: true,
});

Object.defineProperty(window, "getComputedStyle", {
	value: vi.fn(() => ({
		scrollTop: "0",
		scrollLeft: "0",
		getPropertyValue: vi.fn(),
	})),
	writable: true,
});

// Mock HTMLElement methods
Object.defineProperty(HTMLElement.prototype, "scrollTo", {
	value: vi.fn(),
	writable: true,
});

Object.defineProperty(HTMLElement.prototype, "scrollTop", {
	value: 0,
	writable: true,
});

Object.defineProperty(HTMLElement.prototype, "scrollLeft", {
	value: 0,
	writable: true,
});

// Mock problematic MUI components that cause scrollTop errors
vi.mock("@mui/material", async () => {
	const actual = await vi.importActual("@mui/material");
	return {
		...actual,
		Menu: ({ children, open, onClose, anchorEl, ...props }: any) =>
			open ? (
				<div data-testid="menu" id={props.id} {...props}>
					{children}
				</div>
			) : null,
		Grow: ({ children, in: inProp, ...props }: any) =>
			inProp ? <div {...props}>{children}</div> : null,
		MenuList: ({ children, ...props }: any) => (
			<div data-testid="menulist" {...props}>
				{children}
			</div>
		),
		MenuItem: ({ children, onClick, selected, ...props }: any) => (
			<div
				data-testid="menuitem"
				onClick={onClick}
				className={selected ? "Mui-selected" : ""}
				{...props}
			>
				{children}
			</div>
		),
		Alert: ({ children, severity, ...props }: any) => (
			<div data-testid="alert" data-severity={severity} {...props}>
				{children}
			</div>
		),
		AlertTitle: ({ children, ...props }: any) => (
			<div data-testid="alert-title" {...props}>
				{children}
			</div>
		),
		Snackbar: ({ children, open, onClose, ...props }: any) =>
			open ? (
				<div data-testid="snackbar" {...props}>
					{children}
				</div>
			) : null,
	};
});

// Mock transitions and utils that cause issues
vi.mock("@mui/material/transitions", () => ({
	Grow: ({ children, in: inProp, ...props }: any) =>
		inProp ? <div {...props}>{children}</div> : null,
	Fade: ({ children, in: inProp, ...props }: any) =>
		inProp ? <div {...props}>{children}</div> : null,
	Slide: ({ children, in: inProp, ...props }: any) =>
		inProp ? <div {...props}>{children}</div> : null,
}));

// Mock the specific Grow component that's causing issues
vi.mock("@mui/material/Grow", () => ({
	default: ({ children, in: inProp, ...props }: any) =>
		inProp ? <div {...props}>{children}</div> : null,
}));

// Mock the transitions utils that cause scrollTop issues
vi.mock("@mui/material/transitions/utils", () => ({
	reflow: vi.fn(),
	getTransitionProps: vi.fn(() => ({})),
}));

// Mock react-router hooks globally to prevent context errors
vi.mock("react-router", async () => {
	const actual = await vi.importActual("react-router");
	return {
		...actual,
		useNavigate: () => vi.fn(),
		useLocation: () => ({
			pathname: "/test",
			search: "",
			hash: "",
			state: null,
			key: "default",
		}),
		useParams: () => ({}),
		useSearchParams: () => [new URLSearchParams(), vi.fn()],
	};
});

vi.mock("react-transition-group", () => ({
	Transition: ({ children, in: inProp, ...props }: any) =>
		inProp ? <div {...props}>{children}</div> : null,
	TransitionGroup: ({ children, ...props }: any) => (
		<div {...props}>{children}</div>
	),
}));

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

interface TestAppProviderProps extends PropsWithChildren {
	routerOptions?: {
		initialEntries?: string[];
		initialIndex?: number;
	};
}

const TestAppProvider: FC<TestAppProviderProps> = ({
	children,
	routerOptions,
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

	return (
		<StrictMode>
			<AuthenticationProvider>
				<MemoryRouter {...routerProps}>
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
				</MemoryRouter>
			</AuthenticationProvider>
		</StrictMode>
	);
};

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
	routerOptions?: TestAppProviderProps["routerOptions"];
}

/**
 * Custom render function for testing React components.
 * This function wraps the provided React element in the TestAppProvider context,
 * allowing for consistent context and state management during tests.
 * @param ui The React element to render
 * @param options Additional options for rendering including router configuration
 * @returns The rendered component wrapped in the TestAppProvider
 */
const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
	const { routerOptions, ...renderOptions } = options || {};

	const Wrapper: FC<PropsWithChildren> = ({ children }) => (
		<TestAppProvider routerOptions={routerOptions}>{children}</TestAppProvider>
	);

	return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export { customRender as render };
