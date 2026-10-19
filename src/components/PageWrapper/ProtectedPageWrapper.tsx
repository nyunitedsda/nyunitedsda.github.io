import RingLoader from "@components/Loaders";
import { SiteLayout } from "@components/PageWrapper";
import { useAuthentication } from "@hooks/auth";
import { routePaths } from "@hooks/routes";
import type { FC } from "react";
import { Navigate } from "react-router";

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

	return <SiteLayout />;
};

export default ProtectedPageWrapper;
