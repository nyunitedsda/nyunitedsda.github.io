import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement } from "react";
import AppProvider from "../components/AppProvider/AppProvider";

/**
 * Custom render function for testing React components.
 * This function wraps the provided React element in the AppProvider context,
 * allowing for consistent context and state management during tests.
 * @param ui The React element to render
 * @param options Additional options for rendering
 * @returns The rendered component wrapped in the AppProvider
 */
const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AppProvider, ...options });

export { customRender as render };
