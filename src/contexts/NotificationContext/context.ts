import type { NotificationContextProps } from "@/contexts";
import { createContext } from "react";

const context = createContext<NotificationContextProps>(null as never);

export default context;
export const Consumer = context.Consumer;
export const Provider = context.Provider;
