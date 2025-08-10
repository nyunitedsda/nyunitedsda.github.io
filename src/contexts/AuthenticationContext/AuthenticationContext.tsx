import {
	useAuthStatus,
	useCurrentUser,
	useLogin,
	useLogout,
} from "@hooks/auth";
import { type FC, type PropsWithChildren, useCallback, useEffect } from "react";
import type { LoginCredentials } from "@/api";
import { Provider } from "./context";

const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
	const { hasAuthStatus, refreshAuthStatus } = useAuthStatus();
	const {
		data: currentUser,
		isLoading: userLoading,
		refetch: refreshUser,
	} = useCurrentUser();
	const loginUser = useLogin();
	const logoutUser = useLogout();

	const isAuthenticated = !!currentUser || !!hasAuthStatus;

	// Check authentication status every 5 minutes if user authenticated
	useEffect(() => {
		if (isAuthenticated) {
			const interval = setInterval(
				() => {
					refreshAuthStatus();
				},
				5 * 60 * 1000,
			);
			return () => clearInterval(interval);
		}
	}, [isAuthenticated, refreshAuthStatus]);

	const login = useCallback(
		async (credentials: LoginCredentials) => {
			try {
				const response = await loginUser.mutateAsync(credentials);
				await refreshUser();
				return response;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		[loginUser, refreshUser],
	);

	const logout = useCallback(async () => {
		try {
			await logoutUser.mutateAsync();
			await refreshUser();
			return { message: "Logged out Successfully" };
		} catch (error) {
			return Promise.reject(error);
		}
	}, [logoutUser, refreshUser]);

	return (
		<Provider
			value={{
				user: currentUser,
				isLoading: userLoading,
				isAuthenticated,
				login,
				logout,
				refreshAuthStatus,
				refreshUser: () => refreshUser(),
			}}
		>
			{children}
		</Provider>
	);
};

export default AuthenticationProvider;
