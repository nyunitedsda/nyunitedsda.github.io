import { useQuery } from "@tanstack/react-query";
import { type FC } from "react";
import { getDatabaseList } from "../../api/request/commonQueries";
import RingLoader from "../../components/Loaders/RingLoader";
import RoutedTabs from "../../components/RoutedTabs/RoutedTabs";
import type { RouteTabsItem } from "../../components/RoutedTabs/types";
import type { LegalContentDT } from "../../api/request/databaseTypes";

const UserAgreements: FC = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["legalContent"],
		queryFn: async () => getDatabaseList("legal_content"),
		select: (data) => (data as LegalContentDT[]).map(({title, ...rest}) => ({
			...rest,
			label: title,
		})),
	});

	return (
		<>
			{!isLoading ? (
				<RoutedTabs
					baseUrl="/policy"
					tabsProps={{ "aria-label": "Terms and policies" }}
					tabItems={(data as unknown as RouteTabsItem[]) ?? []}
				/>
			) : (
				<RingLoader />
			)}
		</>
	);
};

export default UserAgreements;
