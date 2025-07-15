import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import type { FC, PropsWithChildren, ReactElement } from "react";

import "./__mock__";
import DynamicProvider from "./ProviderWrapper";
import type { CustomRenderOptions } from "./types";

/**
 * Custom render function for testing React components.
 * This function wraps the provided React element in the DynamicProvider context,
 * allowing for consistent context and state management during tests.
 * @param ui The React element to render
 * @param options Additional options for rendering including router configuration and excluded providers
 * @returns The rendered component wrapped in the DynamicProvider
 */
const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
	const { routerOptions, excludeProviders, ...renderOptions } = options || {};

	const Wrapper: FC<PropsWithChildren> = ({ children }) => (
		<DynamicProvider
			routerOptions={routerOptions}
			excludeProviders={excludeProviders}
		>
			{children}
		</DynamicProvider>
	);

	return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export { customRender as render };
