import { useCallback } from "react";
import useLocalStorage from "../storage/useLocalStorage";

/**
 * React hook for managing authentication tokens in localStorage using stateful hooks.
 * Provides access, set, and clear methods for access and refresh tokens.
 *
 * @returns {
 *   accessToken: string | null,
 *   refreshToken: string | null,
 *   setTokens: (accessToken: string, refreshToken: string) => void,
 *   clearTokens: () => void
 * }
 */
const useToken = () => {
	const [accessToken, setAccessToken, clearAccessToken] = useLocalStorage(
		"accessToken",
		null,
	);
	const [refreshToken, setRefreshToken, clearRefreshToken] = useLocalStorage(
		"refreshToken",
		null,
	);

	// Set both tokens
	const setTokens = useCallback(
		(access: string, refresh: string) => {
			setAccessToken(access);
			setRefreshToken(refresh);
		},
		[setAccessToken, setRefreshToken],
	);

	// Clear both tokens
	const clearTokens = useCallback(() => {
		clearAccessToken();
		clearRefreshToken();
	}, [clearAccessToken, clearRefreshToken]);

	return {
		accessToken,
		refreshToken,
		setTokens,
		clearTokens,
	};
};

export default useToken;
