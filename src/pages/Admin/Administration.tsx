import { useEffect, useMemo, type FC } from "react";
import RoutedTabs from "../../components/RoutedTabs/RoutedTabs";
import { ADMIN_TAB_LIST } from "./constants/adminTabList";
import type { AdministrationProps } from "./types";
import { useAuthentication } from "../../hooks/auth";
import { ROUTE_PATHS } from "../../hooks/routes/reviewedRoutes";

const Administration: FC<AdministrationProps> = () => {
	const { user, isAuthenticated } = useAuthentication();

	useEffect(() => {
		if (!isAuthenticated) {
			window.location.href = ROUTE_PATHS.LOGIN;
		}
	}, [isAuthenticated]);

	const accessibleTabs = useMemo(() => {
		if (!user || user.role !== "admin") {
			return [];
		}
		return ADMIN_TAB_LIST;
	}, [user]);

	return (
		<RoutedTabs
			baseUrl="/admin"
			tabsProps={{ "aria-label": "Media streaming" }}
			tabItems={accessibleTabs}
		/>
	);
};

export default Administration;
