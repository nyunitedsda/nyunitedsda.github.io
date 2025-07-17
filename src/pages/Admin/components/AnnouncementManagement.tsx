import { useCallback, useState, type FC } from "react";
import type { AnnouncementType } from "../../../api/request/types";
import AnnouncementEditor from "../../../forms/collection/AnnouncementEditor/AnnouncementEditor";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import DataTable from "../../../components/DataTable/DataTable";
import announcementColumns from "../constants/announcementColumns";
import { initialAnnouncement } from "../../../test/mock_data/announcements";

const SUBHEADER = "Manage church announcements and events";



const AnnouncementManagement: FC = () => {
const [editorContent, setEditorContent] = useState<AnnouncementType | null>(null);

const _handleDelete  = useCallback((id: number) => {}, []);

return (
		<>
			<PageTitle
				title=""
				subtitle={SUBHEADER}
				handleClick={() => setEditorContent(initialAnnouncement)}
			/>

			<DataTable
				columns={announcementColumns}
				data={userData}
				onDelete={(d) => _handleDelete(d?.id as number)}
				onEdit={(d) => setEditorContent(d)}
				onView={(d) => setEditorContent(d)}
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
