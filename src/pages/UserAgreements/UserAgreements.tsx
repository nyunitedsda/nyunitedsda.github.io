import { type FC, memo } from "react";
import RoutedTabs from "../../components/RoutedTabs/RoutedTabs";
import { LEGAL_TAB_LIST } from "./constants";

const UserAgreements: FC = () => {
	return (
		<RoutedTabs
			baseUrl="/policy"
			tabsProps={{ "aria-label": "Terms and policies" }}
			tabItems={LEGAL_TAB_LIST}
		/>
	);
};

export default memo(UserAgreements);
