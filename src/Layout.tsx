import { AppProvider } from "@components/AppProvider";
import RingLoader from "@components/Loaders";
import PageWrapper from "@components/PageWrapper";
import { useAuthentication } from "@hooks/auth";
import { routePaths } from "@hooks/routes";
import { type FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedLayout: FC = () => {
	const { isAuthenticated, isLoading } = useAuthentication();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			navigate(routePaths.UNAUTHORIZED);
		}
	}, [isAuthenticated, isLoading, navigate]);

	return (
		<>
			{isLoading && <RingLoader />}
			{!isLoading && isAuthenticated && <PageWrapper />}
		</>
	);
};

const AppLayout: FC<{ restricted?: boolean }> = ({ restricted = false }) => {
	return (
		<AppProvider>
			{restricted ? <ProtectedLayout /> : <PageWrapper />}
		</AppProvider>
	);
};

export default AppLayout;
