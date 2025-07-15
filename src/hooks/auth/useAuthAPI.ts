import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import {
	getCurrentUser,
	loginUser,
	logoutUser,
	refreshAuthToken,
	registerUser,
	requestPasswordReset,
	resetPassword,
	verifyEmail,
} from "../../api/request/commonQueries";
import type {
	LoginCredentials,
	LoginResponse,
	RegisterData,
} from "../../contexts/AuthenticationContext/types";
import { clearTokens, storeTokens } from "../../utils";

/**
 * Authentication API hooks using React Query
 */

/**
 * Hook for user login
 */
export const useLogin = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	return useMutation({
		mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
		onSuccess: (data: LoginResponse) => {
			// Cache user data
			queryClient.setQueryData(["user"], data.user);
			enqueueSnackbar(data?.message || "Login successful", {
				variant: "success",
			});
			// Store tokens in localStorage
			storeTokens(data.accessToken, data.refreshToken);
			console.log("data: ", data);
		},
		onError: (error) => {
			console.error("Login failed:", error);
			enqueueSnackbar(error.message, { variant: "error" });
			// Clear any existing auth data
			clearTokens();
			queryClient.removeQueries({ queryKey: ["user"] });
		},
	});
};

/**
 * Hook for user registration
 */
export const useRegister = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	return useMutation({
		mutationFn: (userData: RegisterData) => registerUser(userData),
		onSuccess: (data) => {
			// Cache user data
			queryClient.setQueryData(["user"], data.user);
			enqueueSnackbar("Registration successful", { variant: "success" });
			// Store tokens in localStorage
			localStorage.setItem("accessToken", data.tokens.accessToken);
			localStorage.setItem("refreshToken", data.tokens.refreshToken);
		},
		onError: (error) => {
			console.error("Registration failed:", error);
			enqueueSnackbar(error.message, { variant: "error" });
		},
	});
};

/**
 * Hook for token refresh
 */
export const useRefreshToken = () => {
	const { enqueueSnackbar } = useSnackbar();

	return useMutation({
		mutationFn: (refreshToken: string) => refreshAuthToken(refreshToken),
		onSuccess: (data) => {
			// Update tokens in localStorage
			enqueueSnackbar("Token refreshed successfully", { variant: "success" });
			localStorage.setItem("accessToken", data.accessToken);
			localStorage.setItem("refreshToken", data.refreshToken);
		},
		onError: (error) => {
			console.error("Token refresh failed:", error);
			enqueueSnackbar(error.message, { variant: "error" });
			// Clear invalid tokens
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
		},
	});
};

/**
 * Hook for user logout
 */
export const useLogout = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	return useMutation({
		mutationFn: () => logoutUser(),
		onSuccess: () => {
			// Clear all auth data
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			queryClient.removeQueries({ queryKey: ["user"] });
			queryClient.clear(); // Clear all cached data
			enqueueSnackbar("Logged out successfully", { variant: "info" });
		},
		onError: (error) => {
			console.error("Logout failed:", error);
			enqueueSnackbar(error.message, { variant: "error" });
			// Still clear local data even if server request fails
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			queryClient.removeQueries({ queryKey: ["user"] });
		},
	});
};

/**
 * Hook to get current user data
 */
export const useCurrentUser = (enabled: boolean = true) => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	return useQuery({
		queryKey: ["user"],
		queryFn: () => getCurrentUser(),
		enabled: enabled && !!localStorage.getItem("accessToken"),
		staleTime: 5 * 60 * 1000, // 5 minutes
		retry: (failureCount, error: any) => {
			// Don't retry if it's an authentication error
			if (error?.response?.status === 401) {
				// If unauthorized, clear tokens
				enqueueSnackbar("Session expired, please log in again", {
					variant: "warning",
				});
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				queryClient.removeQueries({ queryKey: ["user"] });
				return false;
			}
			return failureCount < 3;
		},
	});
};

/**
 * Hook for password reset request
 */
export const useRequestPasswordReset = () => {
	const { enqueueSnackbar } = useSnackbar();
	return useMutation({
		mutationFn: (username: string) => requestPasswordReset(username),
		onError: (error) => {
			console.error("Password reset request failed:", error);
			enqueueSnackbar(error.message, { variant: "error" });
		},
	});
};

/**
 * Hook for password reset
 */
export const useResetPassword = () => {
	const { enqueueSnackbar } = useSnackbar();

	return useMutation({
		mutationFn: ({
			token,
			newPassword,
		}: {
			token: string;
			newPassword: string;
		}) => resetPassword(token, newPassword),
		onError: (error) => {
			console.error("Password reset failed:", error);
			enqueueSnackbar(error.message, { variant: "error" });
		},
	});
};

/**
 * Hook for email verification
 */
export const useVerifyEmail = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	return useMutation({
		mutationFn: (token: string) => verifyEmail(token),
		onSuccess: () => {
			// Invalidate user query to refetch updated verification status
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: (error) => {
			console.error("Email verification failed:", error);
			enqueueSnackbar(error.message, { variant: "error" });
		},
	});
};

/**
 * Helper hook to check authentication status
 */
export const useAuthStatus = () => {
	const { data: user, isLoading, error } = useCurrentUser();
	const hasAccessToken = !!localStorage.getItem("accessToken");

	return {
		user,
		isLoading,
		isAuthenticated: !!user && hasAccessToken,
		error,
	};
};
