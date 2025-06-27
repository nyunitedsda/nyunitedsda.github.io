import { createContext } from "react";
import type { AuthenticationContextProps } from "./types";

const context = createContext<AuthenticationContextProps>(null as never);

export default context;
export const Consumer = context.Consumer;
export const Provider = context.Provider;
