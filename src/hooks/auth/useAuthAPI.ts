import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import {
	getCurrentUser,
	getUserStatus,
	loginUser,
	logoutUser,
	refreshAuthToken,
	registerUser,
} from "../../api/request/commonQueries";
import { AUTH_CONSTANTS } from "../../contexts/AuthenticationContext/constant";
import type {
	LoginCredentials,
	LoginResponse,
	RegisterData,
} from "../../contexts/AuthenticationContext/types";
import { createAuthConfig } from "../../utils";
import useLocalStorage from "../storage/useLocalStorage";
import useToken from "./useToken";
const { USER_KEY } = AUTH_CONSTANTS;

/**
 * Authentication API hooks using React Query
 */

/**
 * Login user hook with credentials
 * @description This hook uses React Query's useMutation to perform the login operation.
 * It handles the login process, stores tokens in localStorage, and caches user data.
 * It returns a mutation function that can be used to trigger the login process.
 * @param {LoginCredentials} credentials - User login credentials
 * @returns {MutationFunction<LoginResponse, LoginCredentials>}
 * @throws {Error} if login fails
 * @example
 * const { mutate: login } = useLogin();
 * login({ username: "user", password: "pass" });
 */
export const useLogin = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const { setTokens, clearTokens } = useToken();

	return useMutation({
		mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
		onSuccess: (data: LoginResponse) => {
			queryClient.setQueryData(["user"], data.user);

			setTokens(data.accessToken, data.refreshToken);
			localStorage.setItem(USER_KEY, data.user.username);

			enqueueSnackbar(data?.message || "Login successful", {
				variant: "success",
			});
		},
		onError: (error) => {
			console.error("Login failed:", error);
			clearTokens();
			queryClient.removeQueries({ queryKey: ["user"] });

			enqueueSnackbar(error.message, { variant: "error" });
		},
	});
};

/**
 * Register user hook
 * @description This hook uses React Query's useMutation to perform the registration operation.
 * It handles user registration, stores tokens in localStorage, and caches user data.
 * It returns a mutation function that can be used to trigger the registration process.
 * @param {RegisterData} data - User registration data
 * @returns {MutationFunction<LoginResponse, RegisterData>}
 * @throws {Error} if registration fails
 * @example
 * const { mutate: register } = useRegister();
 * register({ username: "new_user", password: "new_pass" });
 */
export const useRegister = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { accessToken } = useToken();

	return useMutation({
		mutationFn: (userData: RegisterData) =>
			registerUser(userData, createAuthConfig(accessToken)),
		onSuccess: (data) => {
			enqueueSnackbar(data.message, { variant: "success" });
		},
		onError: (error) => {
			console.error("Registration failed:", error);
			enqueueSnackbar(error.message, { variant: "error" });
		},
	});
};

/**
 * Refresh authentication token hook
 * @description This hook uses React Query's useMutation to perform the token refresh operation.
 * It handles refreshing the access token using the stored refresh token.
 * It returns a mutation function that can be used to trigger the token refresh process.
 * @param {string} refreshToken - The refresh token to use for refreshing the access token
 * @returns {MutationFunction<AuthTokenResponse, string>}
 * @throws {Error} if token refresh fails
 * @example
 * const { mutate: refreshAuth } = useRefreshToken();
 * refreshAuth(refreshToken);
 */
export const useRefreshToken = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { setTokens, clearTokens } = useToken();

	return useMutation({
		mutationFn: (refreshToken: string) => refreshAuthToken(refreshToken),
		onSuccess: (data) => {
			setTokens(data.accessToken, data.refreshToken);

			enqueueSnackbar("Token refreshed successfully", { variant: "success" });
		},
		onError: (error) => {
			console.error("Token refresh failed:", error);
			clearTokens();

			enqueueSnackbar(error.message, { variant: "error" });
		},
	});
};

/**
 * Logout user hook
 * @description This hook uses React Query's useMutation to perform the logout operation.
 * It handles user logout, clears tokens from localStorage, and removes cached user data.
 * It returns a mutation function that can be used to trigger the logout process.
 * @returns {MutationFunction<void, void>}
 * @throws {Error} if logout fails
 * @example
 * const { mutate: logout } = useLogout();
 * logout();
 */
export const useLogout = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const { accessToken, clearTokens } = useToken();
	const [_a, _b, removeUser] = useLocalStorage(USER_KEY, null);
	const { refreshAuthStatus } = useAuthStatus();

	return useMutation({
		mutationFn: () => logoutUser(createAuthConfig(accessToken)),
		onSuccess: () => {
			clearTokens();
			removeUser();

			refreshAuthStatus?.();
			queryClient.removeQueries({ queryKey: ["user"] });
			queryClient.clear(); // Clear all cached data
			enqueueSnackbar("Logged out successfully", { variant: "info" });
		},
		onError: (error) => {
			console.error("Logout failed:", error);
			// Still clear local data even if server request fails
			clearTokens();
			removeUser();
			queryClient.removeQueries({ queryKey: ["user"] });

			enqueueSnackbar(error.message, { variant: "error" });
		},
	});
};

/**
 * Fetch current user profile hook
 * @description This hook uses React Query's useQuery to fetch the current user's profile.
 * It retrieves the current user's data from the server and caches it.
 * It returns a query object that contains the user data, loading state, and error information.
 * @param {boolean} enabled - Whether the query should be enabled (default: true)
 * @returns {QueryResult<UserType, Error>}
 * @throws {Error} if fetching current user fails
 * @example
 * const { data: user, isLoading, error } = useCurrentUser();
 * useCurrentUser(enabled = true)
 * -------------
 * const { data, isLoading, error } = useCurrentUser();
 * if (isLoading) return <Loading />;
 *   if (error) return <Error message={error.message} />;
 *   return <UserProfile user={data} />;
 * }
 */
export const useCurrentUser = (enabled: boolean = true) => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const { accessToken, clearTokens } = useToken(); // Ensure tokens are initialized
	if (!accessToken) {
		return {
			data: null,
			isLoading: false,
			error: new Error("No access token available"),
			refetch: () => Promise.resolve(),
		};
	}

	return useQuery({
		queryKey: ["user"],
		queryFn: () => getCurrentUser(createAuthConfig(accessToken)),
		enabled: enabled && !!accessToken,
		staleTime: 5 * 60 * 1000, // 5 minutes
		retry: (failureCount, error: any) => {
			// Don't retry if it's an authentication error
			if (error?.response?.status === 401) {
				// If unauthorized, clear tokens
				enqueueSnackbar("Session expired, please log in again", {
					variant: "warning",
				});
				clearTokens();
				queryClient.removeQueries({ queryKey: ["user"] });
				return false;
			}
			return failureCount < 3;
		},
	});
};

/**
 * Helper hook to check authentication status
 */
export const useAuthStatus = () => {
	const queryClient = useQueryClient();
	useToken(); // Ensure tokens are initialized
	const { accessToken, clearTokens } = useToken();
	const { enqueueSnackbar } = useSnackbar();

	if (!accessToken)
		return { isLoading: false, isAuthenticated: false, error: null };

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["user-status"],
		queryFn: () => getUserStatus(accessToken),
		enabled: !!accessToken,
		staleTime: 5 * 60 * 1000, // 5 minutes
		retry: (failureCount, error: any) => {
			// Don't retry if it's an authentication error
			if (error?.response?.status === 401) {
				// If unauthorized, clear tokens
				clearTokens();
				queryClient.removeQueries({ queryKey: ["user"] });

				enqueueSnackbar("Session expired, please log in again", {
					variant: "warning",
				});

				return false;
			}
			return failureCount < 3;
		},
	});

	return {
		isLoading,
		hasAuthStatus: !isLoading && Boolean(data?.message),
		error,
		refreshAuthStatus: refetch,
	};
};

// /**
//  * Hook for password reset request
//  */
// export const useRequestPasswordReset = () => {
// 	const { enqueueSnackbar } = useSnackbar();
// 	return useMutation({
// 		mutationFn: (username: string) => requestPasswordReset(username),
// 		onError: (error) => {
// 			console.error("Password reset request failed:", error);
// 			enqueueSnackbar(error.message, { variant: "error" });
// 		},
// 	});
// };

// /**
//  * Hook for password reset
//  */
// export const useResetPassword = () => {
// 	const { enqueueSnackbar } = useSnackbar();

// 	return useMutation({
// 		mutationFn: ({
// 			token,
// 			newPassword,
// 		}: {
// 			token: string;
// 			newPassword: string;
// 		}) => resetPassword(token, newPassword),
// 		onError: (error) => {
// 			console.error("Password reset failed:", error);
// 			enqueueSnackbar(error.message, { variant: "error" });
// 		},
// 	});
// };

// /**
//  * Hook for email verification
//  */
// export const useVerifyEmail = () => {
// 	const queryClient = useQueryClient();
// 	const { enqueueSnackbar } = useSnackbar();

// 	return useMutation({
// 		mutationFn: (token: string) => verifyEmail(token),
// 		onSuccess: () => {
// 			// Invalidate user query to refetch updated verification status
// 			queryClient.invalidateQueries({ queryKey: ["user"] });
// 		},
// 		onError: (error) => {
// 			console.error("Email verification failed:", error);
// 			enqueueSnackbar(error.message, { variant: "error" });
// 		},
// 	});
// };
