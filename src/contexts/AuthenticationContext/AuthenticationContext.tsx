import { useSnackbar } from "notistack";
import {
	type FC,
	type PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useAuthStatus, useCurrentUser, useLogin, useRefreshToken, useRegister } from "../../hooks/auth";
import useToken from "../../hooks/auth/useToken";
import useLocalStorage from "../../hooks/storage/useLocalStorage";
import { AUTH_CONSTANTS } from "./constant";
import { Provider } from "./context";
import type {
	AuthenticationContextProps,
	LoginCredentials,
	RegisterData,
} from "./types";
import type { UserType } from "../../api/request/types";

const { USER_KEY } = AUTH_CONSTANTS;

const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
	const [] = useLocalStorage(USER_KEY);
	const { accessToken, refreshToken, clearTokens } = useToken();
	const { data: currentUser, refetch: refetchCurrentUser } = useCurrentUser();
	const { enqueueSnackbar } = useSnackbar();
	const { isAuthenticated, refreshAuthStatus } = useAuthStatus();
	const loginUser = useLogin();
	const refreshAuthToken = useRefreshToken();
	const registerUser = useRegister();

	const [user, setUser] = useState<UserType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// Check authentication status every 5 minutes if accessToken is available
	useEffect(() => {
		if (!accessToken) return;
		const interval = setInterval(
			() => {
				if (accessToken) {
					refreshAuthStatus && refreshAuthStatus();
				}
			},
			5 * 60 * 1000,
		);
		return () => clearInterval(interval);
	}, [accessToken, refreshAuthStatus]);

	// Keep user state in sync with currentUser and userKey
	useEffect(() => {
		if (accessToken) {
			if (!user && currentUser) {
				setUser(currentUser);
			} else if (!user && refetchCurrentUser) {
				setIsLoading(true);
				refetchCurrentUser().then((result: any) => {
					setUser(result?.data || null);
					setIsLoading(false);
				});
			}
		} else {
			setUser(null);
			clearTokens();
		}
	}, [ accessToken, currentUser, refetchCurrentUser]);

	const login = useCallback(
		async (credentials: LoginCredentials) => {
			setIsLoading(true);

			// Call the actual login API using useLogin mutation
			const response = await loginUser.mutateAsync(credentials);
			const { user } = response;

			setUser(user);
			setIsLoading(false);
		},
		[loginUser, enqueueSnackbar],
	);

	const register = useCallback(async (data: RegisterData) => {
		try {
			setIsLoading(true);

			// Call the actual register API
			const response = await registerUser.mutateAsync(data);
			const { user } = response;
			setUser(user);
		} catch (error) {
			throw error;
		} finally {
			setIsLoading(false);
		}
	}, []);

	const logout = useCallback(() => {
		try {
			setUser(null);
		} catch (error) {
			console.log("Logout failed", error);
		}
	}, []);

	const refreshAuth = useCallback(async () => {
		try {
			if (!refreshToken) {
				throw new Error("No refresh token available");
			}

			await refreshAuthToken?.mutateAsync();
		} catch (error) {
			logout();
			throw error;
		}
	}, [logout]);

	const value: AuthenticationContextProps = useMemo(
		() => ({
			user,
			isLoading,
			isAuthenticated,
			login,
			register,
			logout,
			refreshAuth,
		}),
		[user, isLoading, isAuthenticated, login, register, logout, refreshAuth],
	);

	return <Provider value={value}>{children}</Provider>;
};

export default AuthenticationProvider;
