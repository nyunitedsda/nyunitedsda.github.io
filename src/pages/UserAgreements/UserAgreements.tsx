import type { FC } from "react";
import { memo } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import RoutedTabs from "../../components/RoutedTabs/RoutedTabs";
import type { RouteTabsItem } from "../../components/RoutedTabs/types";
import privacyStatement from "./privacyStatement";
import termsOfUse from "./termsOfUse";

const TAB_LIST: RouteTabsItem[] = [
	{ id: 1, tag: "termsOfUse", label: "Terms Of Use", content: termsOfUse },
	{
		id: 2,
		tag: "privacy",
		label: "Privacy Statement",
		content: privacyStatement,
	},
];

const UserAgreements: FC = () => {
	return (
		<PageWrapper>
			<RoutedTabs
				tabsProps={{ "aria-label": "Terms and policies" }}
				tabItems={TAB_LIST}
			/>
		</PageWrapper>
	);
};

export default memo(UserAgreements);
