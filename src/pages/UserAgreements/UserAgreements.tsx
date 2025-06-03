import type { FC } from "react";
import { memo } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import RoutedTabs from "../../components/RoutedTabs/RoutedTabs";
import { LEGAL_TAB_LIST } from "./constants";

const UserAgreements: FC = () => {
	return (
		<PageWrapper>
			<RoutedTabs
				tabsProps={{ "aria-label": "Terms and policies" }}
				tabItems={LEGAL_TAB_LIST}
			/>
		</PageWrapper>
	);
};

export default memo(UserAgreements);
