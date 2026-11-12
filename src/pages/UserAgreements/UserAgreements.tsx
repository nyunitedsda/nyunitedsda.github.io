import RoutedTabs from "@components/RoutedTabs";
import { useEntityList } from "@hooks/api";
import { routePaths } from "@hooks/routes";
import { Typography } from "antd";
import { type FC, type ReactNode, useMemo } from "react";
import { Navigate } from "react-router-dom";
import type { LegalContentDT } from "@/api";

const UserAgreements: FC = () => {
	const { data, error } = useEntityList<LegalContentDT>("legal_content");

	const agreements = useMemo(() => {
		return (data?.map(({ title, content, ...rest }) => ({
			...rest,
			label: title,
			title,
			content: <Typography.Paragraph key={title} ><p dangerouslySetInnerHTML={{__html: content as string}} /></Typography.Paragraph>,
		})) ?? []) as (LegalContentDT & { label: string, content: ReactNode })[];
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
