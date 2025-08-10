import {
	type FC,
	type PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useNavigate } from "react-router";
import type { LoginCredentials } from "../../api/request";
import { useLogin, useLogout } from "../../hooks/auth";
import { useAuthStatus, useCurrentUser } from "../../hooks/auth/useAuthAPI";
import routePaths from "../../hooks/routes/routePaths";
import { Provider } from "./context";
import type { AuthenticationContextProps } from "./types";

const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
	const { hasAuthStatus, refreshAuthStatus } = useAuthStatus();
	const {
		data: currentUser,
		isLoading: userLoading,
		refetch: refreshUser,
	} = useCurrentUser();
	const loginUser = useLogin();
	const logoutUser = useLogout();
	const navigate = useNavigate();

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		!!hasAuthStatus,
	);

	// useEffect(() => {
	// 	setIsAuthenticated(!!hasAuthStatus);
	// 	if (!hasAuthStatus) {
	// 		// Optionally redirect to login if session expired
	// 		if (
	// 			typeof window !== "undefined" &&
	// 			window.location.pathname !== "/login"
	// 		) {
	// 			window.location.href = "/login";
	// 		}
	// 	}
	// }, [hasAuthStatus]);

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
				await loginUser.mutateAsync(credentials);
				await refreshUser();
				setIsAuthenticated(true);
			} catch (error) {
				setIsAuthenticated(false);
			}
		},
		[loginUser, refreshUser],
	);

	const logout = useCallback(async () => {
		try {
			await logoutUser.mutateAsync();
			setIsAuthenticated(false);
			await refreshUser(); // Clear user state after logout
			navigate(routePaths.HOME);
		} catch (error) {
			console.log("Logout failed", error);
		}
	}, [logoutUser, refreshUser, navigate]);

	const value: AuthenticationContextProps = useMemo(
		() => ({
			user: currentUser ?? null,
			isLoading: userLoading,
			isAuthenticated,
			login,
			logout,
			refreshAuthStatus, // Expose refreshAuthStatus for manual session checks
			refreshUser, // Expose user refresh for manual sync
		}),
		[
			currentUser,
			userLoading,
			isAuthenticated,
			login,
			logout,
			refreshAuthStatus,
			refreshUser,
		],
	);

	return <Provider value={value}>{children}</Provider>;
};

export default AuthenticationProvider;
