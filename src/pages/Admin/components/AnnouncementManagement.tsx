import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { getDatabaseList } from "../../../api/request/commonQueries";
import type { AnnouncementType } from "../../../api/request/types";
import DataTable from "../../../components/DataTable/DataTable";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import AnnouncementEditor from "../../../forms/collection/AnnouncementEditor/AnnouncementEditor";
import { initialAnnouncement } from "../../../test/mock_data/announcements";
import { createAuthConfig } from "../../../utils/authUtils";
import announcementColumns from "../constants/announcementColumns";

const SUBHEADER = "Manage church announcements and events";

const AnnouncementManagement: FC = () => {
	const [editorContent, setEditorContent] = useState<AnnouncementType | null>(
		null,
	);
	const [data, setData] = useState<AnnouncementType[]>([]);

	const authConfig = useMemo(() => createAuthConfig(), []);

	useEffect(() => {
		getDatabaseList<AnnouncementType>("announcements", authConfig)
			.then((res) => {
				if (Array.isArray(res?.data)) {
					setData(res.data);
				} else {
					console.error("Unexpected response format:", res);
					setData([]);
				}
			})
			.catch((error) => {
				console.error("Failed to fetch data:", error);
				setData([]);
			});
	}, []);

	const _handleDelete = useCallback((id: number) => {
		// TODO: Implement delete logic
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
				/>
			)}
		</>
	);
};

export default AnnouncementManagement;
