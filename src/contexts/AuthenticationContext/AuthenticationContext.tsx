import {
	type FC,
	type PropsWithChildren,
	useCallback,
	useEffect,
	useState,
} from "react";
import type { LoginCredentials } from "../../api/request";
import { useLogin, useLogout } from "../../hooks/auth";
import { useAuthStatus, useCurrentUser } from "../../hooks/auth/useAuthAPI";
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

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
		// Prefer currentUser, then hasAuthStatus, fallback to false
		return !!currentUser || !!hasAuthStatus;
	});

	// Keep isAuthenticated in sync with currentUser and hasAuthStatus
	useEffect(() => {
		if (currentUser) {
			setIsAuthenticated(true);
		} else if (hasAuthStatus) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, [currentUser, hasAuthStatus]);

	useEffect(() => {
		if (!isAuthenticated) {
			refreshAuthStatus();
		}
	}, [isAuthenticated, refreshAuthStatus]);

	useEffect(() => {
		if (currentUser) {
			setIsAuthenticated(true);
		}
	}, [currentUser]);

	// Check authentication status every 5 minutes if user authenticated
	useEffect(() => {
		const interval = setInterval(
			() => {
				if (isAuthenticated) {
					refreshAuthStatus();
					refreshUser();
				}
			},
			5 * 60 * 1000,
		);
		return () => clearInterval(interval);
	}, [isAuthenticated, refreshAuthStatus, refreshUser]);

	const login = useCallback(
		async (credentials: LoginCredentials) => {
			try {
				const response = await loginUser.mutateAsync(credentials);
				await refreshUser();
				setIsAuthenticated(true);
				return response;
			} catch (error) {
				setIsAuthenticated(false);
				return Promise.reject(error);
			}
		},
		[loginUser, refreshUser],
	);

	const logout = useCallback(async (): Promise<{ message: string }> => {
		try {
			const response = await logoutUser.mutateAsync();
			setIsAuthenticated(false);
			await refreshUser();
			return response; // response is of type { message: string }
		} catch (error) {
			setIsAuthenticated(false);
			await refreshUser();
			throw error;
		}
	}, [logoutUser, refreshUser]);

	return (
		<Provider
			value={{
				user: currentUser ?? null,
				isLoading: userLoading,
				isAuthenticated,
				login,
				logout,
				refreshAuthStatus, // Expose refreshAuthStatus for manual session checks
				refreshUser, // Expose user refresh for manual sync
			}}
		>
			{children}
		</Provider>
	);
};

export default AuthenticationProvider;
