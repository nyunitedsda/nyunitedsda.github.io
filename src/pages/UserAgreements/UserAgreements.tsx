import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { Navigate } from "react-router";
import { getDatabaseList } from "../../api/request/commonQueries";
import type { LegalContentDT } from "../../api/request/databaseTypes";
import RingLoader from "../../components/Loaders/RingLoader";
import RoutedTabs from "../../components/RoutedTabs/RoutedTabs";
import type { RouteTabsItem } from "../../components/RoutedTabs/types";
import { ROUTE_PATHS } from "../../hooks/routes/reviewedRoutes";

const UserAgreements: FC = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["legalContent"],
		queryFn: async () => getDatabaseList("legal_content"),
		select: (data) =>
			(data as LegalContentDT[]).map(({ title, ...rest }) => ({
				...rest,
				label: title,
			})),
	});

	return (
		<>
			{error && (
				<Navigate to={ROUTE_PATHS.NOT_FOUND} replace state={{ error }} />
			)}
			{isLoading ? (
				<RingLoader />
			) : (
				<RoutedTabs
					baseUrl="/policy"
					tabsProps={{ "aria-label": "Terms and policies" }}
					tabItems={(data as unknown as RouteTabsItem[]) ?? []}
				/>
			)}
		</>
	);
};

export default UserAgreements;
