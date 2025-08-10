import { type FC, useEffect, useMemo } from "react";
import RoutedTabs from "../../components/RoutedTabs/RoutedTabs";
import { useAuthentication } from "../../hooks/auth";
import routePaths from "../../hooks/routes/routePaths";
import { ADMIN_TAB_LIST } from "./constants/adminTabList";
import type { AdministrationProps } from "./types";



const Administration: FC<AdministrationProps> = () => {
	const { user, isAuthenticated, refreshUser } = useAuthentication();

	useEffect(() => {
		(async () => {
			if (!isAuthenticated || !user) {
				await refreshUser().catch(() => {
					window.location.href = routePaths.LOGIN;
				});
			}
		})();
	}, [isAuthenticated, user, refreshUser]);

	const accessibleTabs = useMemo(() => {
		if (!user || user.role_id === 1) {
			return [];
		}

		const permissions = Array.from(new Set([...(user?.permissions || [])].map((perm) => perm.split("-")[0])));
		const approvedTabs = ADMIN_TAB_LIST.filter((tab) => permissions.includes(tab.tag));

		return approvedTabs;
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
