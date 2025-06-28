import { type FC } from "react";
import PageWrapper from "./PageWrapper";
import useAuthentication from "../../hooks/auth/useAuthentication";
import { Navigate } from "react-router";
import RingLoader from "../Loaders/RingLoader";

const ProtectedPageWrapper: FC = () => {
	const { isAuthenticated, isLoading } = useAuthentication();

	if (isLoading) {
		return <RingLoader />;
	}
	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <PageWrapper />;
};

export default ProtectedPageWrapper;
