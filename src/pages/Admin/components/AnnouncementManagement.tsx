import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { deleteEntity } from "../../../api/request/commonMutations";
import { getDatabaseList } from "../../../api/request/commonQueries";
import type { AnnouncementType } from "../../../api/request/types";
import DataTable from "../../../components/DataTable/DataTable";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import AnnouncementEditor from "../../../forms/collection/AnnouncementEditor/AnnouncementEditor";
import useToken from "../../../hooks/auth/useToken";
import { initialAnnouncement } from "../../../test/mock_data/announcements";
import { createAuthConfig } from "../../../utils/authUtils";
import announcementColumns from "../constants/announcementColumns";

const SUBHEADER = "Manage church announcements and events";

const AnnouncementManagement: FC = () => {
	const { accessToken } = useToken();

	const [editorContent, setEditorContent] = useState<AnnouncementType | null>(
		null,
	);
	const [data, setData] = useState<AnnouncementType[]>([]);

	const { data: queryData, refetch } = useQuery<AnnouncementType[] | undefined>(
		{
			queryKey: ["announcements"],
			queryFn: async () => {
				const res = await getDatabaseList(
					"announcements",
					createAuthConfig(accessToken),
				);
				// Ensure every item has required AnnouncementType fields
				return Array.isArray(res.data)
					? res.data.filter(
							(item): item is AnnouncementType =>
								item &&
								typeof item === "object" &&
								"title" in item &&
								"type" in item &&
								"author_id" in item &&
								"date_format" in item,
						)
					: [];
			},
			staleTime: 5 * 60 * 1000,
			refetchOnWindowFocus: false,
			enabled: !!accessToken,
		},
	);

	useEffect(() => {
		if (queryData && Array.isArray(queryData)) {
			setData(queryData as AnnouncementType[]);
		}
	}, [queryData]);

	const _handleDelete = useCallback((id: number) => {
		const authConfig = createAuthConfig(accessToken);

		deleteEntity("announcements", id, authConfig)
			.then(() => {
				setData((prev) =>
					prev.filter((announcement) => announcement?.id !== id),
				);
			})
			.catch((error) => {
				console.error("Failed to delete announcement:", error);
			});
	}, []);

	return (
		<>
			<PageTitle
				title=""
				subtitle={SUBHEADER}
				handleClick={() => setEditorContent(initialAnnouncement)}
			/>

			<DataTable
				columns={announcementColumns}
				data={data.map((item) => ({
					...item,
					event_date: item.event_date
						? typeof item.event_date === "string"
							? item.event_date
							: item.event_date.toISOString()
						: "",
				}))}
				onDelete={(d) => _handleDelete((d as any)?.id as number)}
				onEdit={(d) => setEditorContent(d as unknown as AnnouncementType)}
				onView={(d) => setEditorContent(d as unknown as AnnouncementType)}
			/>

			{editorContent && (
				<AnnouncementEditor
					open={!!editorContent}
					data={editorContent as AnnouncementType}
					onClose={() => setEditorContent(null)}
					onSuccess={() => {
						refetch();
						setEditorContent(null);
					}}
				/>
			)}
		</>
	);
};

export default AnnouncementManagement;
