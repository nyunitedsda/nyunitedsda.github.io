import { createContext } from "react";
import type { NotificationContextProps } from "./types";

const context = createContext<NotificationContextProps>(null as never);

export default context;
export const Consumer = context.Consumer;
export const Provider = context.Provider;
