import type { PropsWithChildren } from "react";
import type { UserDT } from "../../api/request/databaseTypes";
import type { LoginCredentials } from "../../api/request/types";

export type RegisterData = Omit<UserDT, "id" | "is_system" | "last_login">;

export type AuthenticationContextProps = PropsWithChildren<{
	user: UserDT | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (credentials: LoginCredentials) => Promise<void>;
	logout: () => void;
}>;
