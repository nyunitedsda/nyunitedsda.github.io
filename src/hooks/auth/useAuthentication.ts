import { AuthContext } from "@contexts/AuthenticationContext";
import { useContext } from "react";

/**
 * Hook to access the Authentication context
 * @returns Authentication context value
 * @throws Error if used outside of AuthenticationProvider
 */
const useAuthentication = () => {
	const contextValue = useContext(AuthContext);

	if (!contextValue) {
		throw new Error(
			"useAuthentication must be used within an AuthenticationProvider",
		);
	}

	return contextValue;
};

export default useAuthentication;
