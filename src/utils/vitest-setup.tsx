import "@testing-library/jest-dom";
import { type RenderOptions, render } from "@testing-library/react";
import type { FC, PropsWithChildren, ReactElement } from "react";
import AppProvider from "../components/AppProvider/AppProvider";
// import 'vitest'

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return <AppProvider>{children}</AppProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: Wrapper, ...options });


// export * from "@testing-library/jest-dom";
export * from "@testing-library/react";
export * from "vitest";
export * from "@testing-library/user-event";


export { customRender as render };
