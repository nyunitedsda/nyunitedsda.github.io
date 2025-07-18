import { useSnackbar } from "notistack";
import {
	type FC,
	type PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useNavigate } from "react-router";
import type { UserType } from "../../api/request/types";
import {
	useAuthStatus,
	useCurrentUser,
	useLogin,
	useLogout,
	useRefreshToken,
	useRegister,
} from "../../hooks/auth";
import useToken from "../../hooks/auth/useToken";
import { ROUTE_PATHS } from "../../hooks/routes/reviewedRoutes";
import useLocalStorage from "../../hooks/storage/useLocalStorage";
import { AUTH_CONSTANTS } from "./constant";
import { Provider } from "./context";
import type {
	AuthenticationContextProps,
	LoginCredentials,
	RegisterData,
} from "./types";

const { USER_KEY } = AUTH_CONSTANTS;

const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
	// Only use the getter for userKey, as setter is not needed here
	const [userKey] = useLocalStorage(USER_KEY, null);
	const { accessToken, refreshToken, clearTokens } = useToken();
	const { data: currentUser, refetch: refetchCurrentUser } = useCurrentUser();
	const { enqueueSnackbar } = useSnackbar();
	const { hasAuthStatus, refreshAuthStatus } = useAuthStatus();
	const loginUser = useLogin();
	const logoutUser = useLogout();
	const refreshAuthToken = useRefreshToken();
	const registerUser = useRegister();
	const navigate = useNavigate();

	const [user, setUser] = useState<UserType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		!!hasAuthStatus,
	);

	// Check authentication status every 5 minutes if accessToken is available
	useEffect(() => {
		if (!accessToken) return;
		const interval = setInterval(
			() => {
				if (accessToken) {
					console.log("refresh value : ", refreshAuthStatus?.());
					// setIsAuthenticated(false);
					// setUser(null);
					// clearTokens();
					// navigate(ROUTE_PATHS.LOGIN);
				}
			},
			5 * 60 * 1000,
		);
		return () => clearInterval(interval);
	}, [accessToken, refreshAuthStatus, clearTokens, navigate]);

	// Keep user state in sync with currentUser and userKey
	useEffect(() => {
		if (accessToken) {
			console.log("current user: ", currentUser);
			if (!user && currentUser) {
				setUser(currentUser);
			} else if (!user && refetchCurrentUser) {
				setIsLoading(true);
				refetchCurrentUser().then((result: any) => {
					setUser(result?.data || null);
					setIsLoading(false);
				});
			}
			setIsAuthenticated(true);
		} else {
			setUser(null);
		}
	}, [accessToken, currentUser, refetchCurrentUser, clearTokens]);

	const login = useCallback(
		async (credentials: LoginCredentials) => {
			setIsLoading(true);

			// Call the actual login API using useLogin mutation
			const response = await loginUser.mutateAsync(credentials);
			const { user } = response;

			setUser(user);
			setIsAuthenticated(true);
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

	const logout = useCallback(async () => {
		try {
			logoutUser.mutateAsync().then(() => {
				setUser(null);

				navigate(ROUTE_PATHS.HOME);
			});
		} catch (error) {
			console.log("Logout failed", error);
		}
	}, []);

	const refreshAuth = useCallback(async () => {
		try {
			if (!refreshToken) {
				throw new Error("No refresh token available");
			}

			await refreshAuthToken?.mutateAsync(refreshToken);
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
