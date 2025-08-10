import type { QueryObserverResult } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import type { LoginCredentials, LoginResponse, UserDT } from "../../api/request";

export type RegisterData = Omit<UserDT, "id" | "is_system" | "last_login">;

export type AuthenticationContextProps = PropsWithChildren<{
	user: UserDT | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (credentials: LoginCredentials) => Promise<LoginResponse>;
	logout: () => Promise<{
    message: string;
}>;
	refreshAuthStatus: () => Promise<QueryObserverResult<{
    message: string;
}, Error>>;
	refreshUser: () => Promise<QueryObserverResult<UserDT, Error>>;
}>;
