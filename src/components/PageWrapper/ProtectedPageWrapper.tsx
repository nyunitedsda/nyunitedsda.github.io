import type { FC } from "react";
import { Navigate } from "react-router";
import useAuthentication from "../../hooks/auth/useAuthentication";
import routePaths from "../../hooks/routes/routePaths";
import RingLoader from "../Loaders/RingLoader";
import PageWrapper from "./PageWrapper";

const ProtectedPageWrapper: FC = () => {
	const { isAuthenticated, isLoading } = useAuthentication();

	if (isLoading) {
		return <RingLoader />;
	}
	if (!isAuthenticated) {
		return (
			<Navigate to={routePaths.LOGIN} state={{ from: location }} replace />
		);
	}

	return <PageWrapper />;
};

export default ProtectedPageWrapper;
