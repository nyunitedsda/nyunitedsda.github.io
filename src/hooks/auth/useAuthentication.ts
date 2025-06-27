import { useContext } from "react";
import context from "../../contexts/AuthenticationContext/context";
import type { AuthenticationContextProps } from "../../contexts/AuthenticationContext/types";

/**
 * Hook to access the Authentication context
 * @returns Authentication context value
 * @throws Error if used outside of AuthenticationProvider
 */
const useAuthentication = (): AuthenticationContextProps => {
	const contextValue = useContext(context);

	if (!contextValue) {
		throw new Error(
			"useAuthentication must be used within an AuthenticationProvider"
		);
	}

	return contextValue;
};

export default useAuthentication;
