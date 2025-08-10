import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { Navigate } from "react-router";
import type { LegalContentDT } from "../../api/request";
import { getDatabaseList } from "../../api/request/commonQueries";
import RingLoader from "../../components/Loaders/RingLoader";
import RoutedTabs from "../../components/RoutedTabs/RoutedTabs";
import type { RouteTabsItem } from "../../components/RoutedTabs/types";
import routePaths from "../../hooks/routes/routePaths";

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
				<Navigate to={routePaths.NOT_FOUND} replace state={{ error }} />
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
