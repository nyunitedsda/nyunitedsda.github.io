import type {
	LoginCredentials,
	LoginResponse,
	RegisterUserDT,
	UserDT,
} from "@/api";
import {
	deleteUser,
	getCurrentUser,
	getUserStatus,
	loginUser,
	logoutUser,
	registerUser,
} from "@/api";
import {
	type UseQueryResult,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

/**
 * Authentication API hooks using React Query
 */

export const useLogin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (credentials: LoginCredentials) =>
			await loginUser(credentials),
		onSuccess: (data: LoginResponse) => {
			queryClient.setQueryData(["user"], data.user);
			return data;
		},
		onError: (error: AxiosError<{ error: string }>) => {
			console.log("login error: ", error);

			console.error("Login failed:", error?.response?.data.error);
			queryClient.removeQueries({ queryKey: ["user"] });
			return Promise.reject({ message: error?.response?.data.error });
		},
	});
};

export const useRegister = () => {
	const { enqueueSnackbar } = useSnackbar();

	return useMutation({
		mutationFn: (userData: RegisterUserDT) => registerUser(userData),
		onSuccess: (data) => {
			enqueueSnackbar("User registered successfully", { variant: "success" });
			return data;
		},
		onError: (error) => {
			console.error("Registration failed:", error);
			enqueueSnackbar(error.message, { variant: "error" });
		},
	});
};

export const useLogout = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	return useMutation({
		mutationFn: () => logoutUser(),
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: ["user"] });
			queryClient.clear(); // Clear all cached data
			enqueueSnackbar("Logged out successfully", { variant: "info" });
			
		},
		onError: (error) => {
			console.error("Logout failed:", error);
			queryClient.removeQueries({ queryKey: ["user"] });
		},
	});
};

export const useCurrentUser = (): UseQueryResult<UserDT, Error> => {
	const queryClient = useQueryClient();
	const [token, _setToken, removeToken] = useLocalStorage<boolean | null>('hasToken', null);

	const enableQuery = useMemo(() => getActiveToken(token),[token]);

	return useQuery({
		queryKey: ["user"],
		queryFn: () => getCurrentUser(),
		staleTime: 5 * 60 * 1000, // 5 minutes
		enabled: enableQuery,
		retry: (failureCount, error: any) => {
			// Don't retry if it's an authentication error
			if (error?.response?.status === 401 || error?.response?.status === 403) {
				console.log("Session expired, please log in again");
				removeToken();
				queryClient.removeQueries({ queryKey: ["user"] });
				return false;
			}
			return failureCount < 3;
		},
	});
};



/**
 * Helper hook to check authentication status
//  */
export const useAuthStatus = () => {
	const queryClient = useQueryClient();
		const [token, _setToken, removeToken] = useLocalStorage<boolean | null>('hasToken', null);


	const enableQuery = useMemo(() => getActiveToken(token),[token]);

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["user-status"],
		queryFn: () => getUserStatus(),
		staleTime: 5 * 60 * 1000, // 5 minutes
		enabled: enableQuery,
		retry: (failureCount, error: any) => {
			if (error?.response?.status === 403) {
			}
			if (error?.response?.status === 401) {
				queryClient.removeQueries({ queryKey: ["user"] });
				removeToken();
				console.log("Session expired, please log in again");

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

export const useDeleteUser = () => {
	const { enqueueSnackbar } = useSnackbar();

	return useMutation({
		mutationFn: (userId: number) => {
			return deleteUser(userId);
		},
		onSuccess: () => {
			enqueueSnackbar("User deleted successfully", { variant: "success" });
		},
		onError: (error: any) => {
			console.error("Delete user failed:", error);
			enqueueSnackbar(error.message || "Delete user failed", {
				variant: "error",
			});
		},
	});
};

export const getActiveToken = (token?: boolean | null) => { 
	if(!token || token === null || token === undefined) return false;
		return token;
}