import { createContext } from "react";
import type { MessageContextProps } from "./types";

const context = createContext<MessageContextProps>(null as never);

export default context;
export const Consumer = context.Consumer;
