import { type FC, useEffect, useMemo } from "react";
import RoutedTabs from "../../components/RoutedTabs/RoutedTabs";
import { useAuthentication } from "../../hooks/auth";
import routePaths from "../../hooks/routes/routePaths";
import { ADMIN_TAB_LIST } from "./constants/adminTabList";
import type { AdministrationProps } from "./types";

const Administration: FC<AdministrationProps> = () => {
	const { user, isAuthenticated } = useAuthentication();

	useEffect(() => {
		if (!isAuthenticated) {
			window.location.href = routePaths.LOGIN;
		}
	}, [isAuthenticated]);

	const accessibleTabs = useMemo(() => {
		if (!user || user.role_id === 1) {
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
