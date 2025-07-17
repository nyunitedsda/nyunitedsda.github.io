import type { FC } from "react";
import RoutedTabs from "../../components/RoutedTabs/RoutedTabs";
import { ADMIN_TAB_LIST } from "./constants/adminTabList";
import type { AdministrationProps } from "./types";

const Administration: FC<AdministrationProps> = () => {
	return (
		<RoutedTabs
			baseUrl="/admin"
			tabsProps={{ "aria-label": "Media streaming" }}
			tabItems={ADMIN_TAB_LIST}
		/>
	);
};

export default Administration;
