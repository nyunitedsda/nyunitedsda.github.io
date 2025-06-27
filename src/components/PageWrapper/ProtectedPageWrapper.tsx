import { type FC } from "react";
import PageWrapper from "./PageWrapper";
import useAuthentication from "../../hooks/auth/useAuthentication";

const ProtectedPageWrapper: FC = () => {
	const { isAuthenticated, user, isLoading } = useAuthentication();


if (!isAuthenticated) {
	
}
	
	return (		<PageWrapper/>	);
};

export default ProtectedPageWrapper;
