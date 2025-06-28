import type { FC } from "react";
import type { AdministrationProps } from "./types";
import RoutedTabs from "../../components/RoutedTabs/RoutedTabs";
import { ADMIN_TAB_LIST } from "./constants";

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
