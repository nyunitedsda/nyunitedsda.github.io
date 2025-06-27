import { useSnackbar } from "notistack";
import {
	type FC,
	type PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Provider } from "./context";
import type {
	AuthenticationContextProps,
	LoginCredentials,
	RegisterData,
	UserType,
} from "./types";

// Storage keys for persistence
const ACCESS_TOKEN_KEY = "auth_access_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";
const USER_KEY = "auth_user";

const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
	const { enqueueSnackbar } = useSnackbar();

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
			try {
				setIsLoading(true);

				// TODO: Replace with actual API call
				// const response = await authAPI.login(credentials);

				// Mock authentication for now
				const mockUser: UserType = {
					id: 1,
					email: credentials.email,
					firstName: "Admin",
					lastName: "User",
					role: "admin",
					emailVerified: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				};

				const mockTokens = {
					accessToken: "mock_access_token",
					refreshToken: "mock_refresh_token",
					expiresIn: 3600,
				};

				// Store authentication data
				localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
				localStorage.setItem(ACCESS_TOKEN_KEY, mockTokens.accessToken);
				localStorage.setItem(REFRESH_TOKEN_KEY, mockTokens.refreshToken);

				setUser(mockUser);
				enqueueSnackbar("Login successful!", { variant: "success" });
			} catch (error) {
				enqueueSnackbar(
					error instanceof Error ? error.message : "Login failed",
					{ variant: "error" },
				);
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[enqueueSnackbar],
	);

	const register = useCallback(
		async (data: RegisterData) => {
			try {
				setIsLoading(true);

				// TODO: Replace with actual API call
				// const response = await authAPI.register(data);

				// Mock registration for now
				const mockUser: UserType = {
					id: Date.now(), // Mock ID
					email: data.email,
					firstName: data.firstName,
					lastName: data.lastName,
					role: "guest",
					emailVerified: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				};

				const mockTokens = {
					accessToken: "mock_access_token",
					refreshToken: "mock_refresh_token",
					expiresIn: 3600,
				};

				// Store authentication data
				localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
				localStorage.setItem(ACCESS_TOKEN_KEY, mockTokens.accessToken);
				localStorage.setItem(REFRESH_TOKEN_KEY, mockTokens.refreshToken);

				setUser(mockUser);
				enqueueSnackbar("Registration successful!", { variant: "success" });
			} catch (error) {
				enqueueSnackbar(
					error instanceof Error ? error.message : "Registration failed",
					{ variant: "error" },
				);
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[enqueueSnackbar],
	);

	const logout = useCallback(() => {
		try {
			// Clear stored authentication data
			localStorage.removeItem(USER_KEY);
			localStorage.removeItem(ACCESS_TOKEN_KEY);
			localStorage.removeItem(REFRESH_TOKEN_KEY);

			setUser(null);
			enqueueSnackbar("Logged out successfully", { variant: "info" });
		} catch (error) {
			enqueueSnackbar("Logout failed", { variant: "error" });
		}
	}, [enqueueSnackbar]);

	const refreshAuth = useCallback(async () => {
		try {
			const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

			if (!refreshToken) {
				throw new Error("No refresh token available");
			}

			// TODO: Replace with actual API call
			// const response = await authAPI.refreshToken(refreshToken);

			// Mock token refresh for now
			const mockTokens = {
				accessToken: "new_mock_access_token",
				refreshToken: "new_mock_refresh_token",
				expiresIn: 3600,
			};

			localStorage.setItem(ACCESS_TOKEN_KEY, mockTokens.accessToken);
			localStorage.setItem(REFRESH_TOKEN_KEY, mockTokens.refreshToken);

			enqueueSnackbar("Authentication refreshed", { variant: "success" });
		} catch (error) {
			enqueueSnackbar("Failed to refresh authentication", { variant: "error" });
			logout(); // Force logout on refresh failure
			throw error;
		}
	}, [enqueueSnackbar, logout]);

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
