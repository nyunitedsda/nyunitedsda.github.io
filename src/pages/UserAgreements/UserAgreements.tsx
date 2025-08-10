import RoutedTabs from "@components/RoutedTabs";
import { useEntityList } from "@hooks/api";
import { routePaths } from "@hooks/routes";
import { type FC, useMemo } from "react";
import { Navigate } from "react-router-dom";
import type { LegalContentDT } from "@/api";

const UserAgreements: FC = () => {
	const { data, error } = useEntityList<LegalContentDT>("legal_content");

	const agreements = useMemo(() => {
		return (data?.map(({ title, ...rest }) => ({
			...rest,
			label: title,
		})) ?? []) as (LegalContentDT & { label: string })[];
	}, [data]);
	return (
		<>
			{error ? (
				<Navigate to={routePaths.NOT_FOUND} replace state={{ error }} />
			) : (
				<RoutedTabs
					baseUrl="/policy"
					tabsProps={{ "aria-label": "Terms and policies" }}
					tabItems={agreements ?? []}
				/>
			)}
		</>
	);
};

export default UserAgreements;
