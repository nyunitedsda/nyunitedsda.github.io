import { AppProvider } from "@components/AppProvider";
import RingLoader from "@components/Loaders";
import { SiteLayout } from '@components/PageWrapper'
import { useAuthentication } from "@hooks/auth";
import { routePaths } from "@hooks/routes";
import { type FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

const ProtectedLayout: FC = () => {
	const { isAuthenticated, isLoading } = useAuthentication();
	const navigate = useNavigate();

	const [token, _, _x] = useLocalStorage<boolean | null>("hasToken", null);

	useEffect(() => {
		if (token && !isLoading && !isAuthenticated) {
			navigate(routePaths.UNAUTHORIZED);
		}
	}, [isAuthenticated, isLoading, navigate, token]);

	return (
		<>
			{isLoading && <RingLoader />}
			{!isLoading && isAuthenticated && <SiteLayout />}
		</>
	);
};

const AppLayout: FC<{ restricted?: boolean }> = ({ restricted = false }) => {
	return (
		<AppProvider>
			{restricted ? <ProtectedLayout /> : <SiteLayout />}
		</AppProvider>
	);
};

export default AppLayout;
