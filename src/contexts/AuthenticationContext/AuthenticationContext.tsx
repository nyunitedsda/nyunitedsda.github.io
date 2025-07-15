import { useSnackbar } from "notistack";
import {
	type FC,
	type PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	refreshAuthToken,
	registerUser,
} from "../../api/request/commonQueries";
import { useLogin } from "../../hooks/auth";
import { clearTokens, storeTokens } from "../../utils";
import { Provider } from "./context";
import type {
	AuthenticationContextProps,
	LoginCredentials,
	RegisterData,
	UserType,
} from "./types";

// Storage keys for persistence
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "auth_user";

const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
	const { enqueueSnackbar } = useSnackbar();
	const loginUser = useLogin();

	const [user, setUser] = useState<UserType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const isAuthenticated = useMemo(() => user !== null, [user]);

	// Initialize authentication state from localStorage
	useEffect(() => {
		const initializeAuth = () => {
			try {
				const storedUser = localStorage.getItem(USER_KEY);
				const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

				if (storedUser && accessToken) {
					setUser(JSON.parse(storedUser));
				}
			} catch (error) {
				console.error("Failed to initialize authentication:", error);
				// Clear potentially corrupted data
				localStorage.removeItem(USER_KEY);
				localStorage.removeItem(ACCESS_TOKEN_KEY);
				localStorage.removeItem(REFRESH_TOKEN_KEY);
			} finally {
				setIsLoading(false);
			}
		};

		initializeAuth();
	}, []);

	const login = useCallback(
		async (credentials: LoginCredentials) => {
			// try {
			setIsLoading(true);

			// Call the actual login API using useLogin mutation
			const response = await loginUser.mutateAsync(credentials);
			const { user } = response;

			setUser(user);
			// storeTokens(response.accessToken, response.refreshToken);
			// enqueueSnackbar(response?.message || "Login successful", {
			// 	variant: "success",
			// });
			// } catch (error) {
			// 	clearTokens();
			// 	enqueueSnackbar((error as any)?.message || "Login failed", {
			// 		variant: "error",
			// 	});
			// 	throw error;
			// } finally {
			setIsLoading(false);
			// }
		},
		[loginUser, enqueueSnackbar],
	);

	const register = useCallback(async (data: RegisterData) => {
		try {
			setIsLoading(true);

			// Call the actual register API
			const response = await registerUser(data);
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
			const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

			if (!refreshToken) {
				throw new Error("No refresh token available");
			}

			// Call the actual refresh API
			await refreshAuthToken(refreshToken);
		} catch (error) {
			logout(); // Force logout on refresh failure
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
