import type { FC } from "react";
import { Navigate } from "react-router-dom";
import AppProvider from "./components/AppProvider";
import PageWrapper from "./components/PageWrapper/PageWrapper";
import { useAuthentication } from "./hooks/auth";

const ProtectedLayout: FC = () => {
	const { isAuthenticated } = useAuthentication();

	return isAuthenticated ? (
		<PageWrapper />
	) : (
		<Navigate to="/unauthorized" replace />
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
