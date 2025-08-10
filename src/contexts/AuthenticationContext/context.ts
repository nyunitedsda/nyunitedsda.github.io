import type { QueryObserverResult } from "@tanstack/react-query";
import { createContext } from "react";
import type { LoginCredentials, LoginResponse, UserDT } from "@/api";

interface AuthContextProps {
	user?: UserDT;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (credentials: LoginCredentials) => Promise<LoginResponse>;
	logout: () => Promise<{
		message: string;
	}>;
	refreshAuthStatus: () => Promise<
		QueryObserverResult<
			{
				message: string;
			},
			Error
		>
	>;
	refreshUser: () => Promise<QueryObserverResult<UserDT, Error>>;
}

const context = createContext<AuthContextProps>(null as never);

export default context;
export const Consumer = context.Consumer;
export const Provider = context.Provider;

// i This import resolves to src\contexts\AuthenticationContext\context.ts
//       ... which imports src\contexts\AuthenticationContext\index.ts
//       ... which imports src\contexts\AuthenticationContext\AuthenticationContext.tsx
//       ... which imports src\hooks\auth\index.ts
//       ... which imports src\hooks\auth\useAuthentication.ts
//       ... which is the file we're importing from.
