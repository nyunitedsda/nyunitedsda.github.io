import { createContext } from "react";
import type { ThemeContextState } from "./types";

const context = createContext<ThemeContextState>(null as never);

export default context;
export const ThemeConsumer = context.Consumer;