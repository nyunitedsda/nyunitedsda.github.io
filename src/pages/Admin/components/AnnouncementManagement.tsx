import DataTable from "@components/DataTable";
import { PageTitle } from "@components/PageWrapper";
import { AnnouncementEditor } from "@forms/collection";
import { useEntityList } from "@hooks/api";
import { usePermission } from "@hooks/auth";
import { initialAnnouncement } from "@test/mock_data";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useMemo, useState } from "react";
import type { AnnouncementDT, EventDT } from "@/api";
import { deleteEntity } from "@/api";
import announcementColumns from "../constants/announcementColumns";

const SUBHEADER = "Manage church announcements and events";

const AnnouncementManagement: FC = () => {
	const { canCreate, canEdit, canDelete } = usePermission("announcements");
	const { enqueueSnackbar } = useSnackbar();
	const {
		data: announcements,
		isLoading,
		refetch,
	} = useEntityList<AnnouncementDT>("announcements");
	const { data: events } = useEntityList<EventDT>("events");

	const [editorContent, setEditorContent] =
		useState<Partial<AnnouncementDT> | null>(null);

	const tableColumns = useMemo(() => {
		if (!events) {
			return announcementColumns;
		}

		return announcementColumns.map((column) =>
			column.field === "event_id"
				? {
						...column,
						renderCell(data: Partial<AnnouncementDT>) {
							const event = events.find((e) => e.id === data.event_id);
							return event ? event.name : "N/A";
						},
					}
				: column,
		);
	}, [events]);

	const _handleDelete = useCallback(
		(d: AnnouncementDT & { id: number }) => {
			deleteEntity("announcements", d.id)
				.then(() => {
					refetch();
					enqueueSnackbar("Announcement deleted successfully", {
						variant: "success",
					});
				})
				.catch((error) => {
					console.error("Failed to delete announcement:", error);
					enqueueSnackbar("Failed to delete announcement", {
						variant: "error",
					});
				});
		},
		[enqueueSnackbar, refetch],
	);

	return (
		<>
			<PageTitle
				title=""
				subtitle={SUBHEADER}
				handleClick={
					canCreate
						? () => setEditorContent(initialAnnouncement as AnnouncementDT)
						: undefined
				}
			/>

			<DataTable
				isLoading={isLoading}
				columns={tableColumns}
				data={announcements ?? []}
				onDelete={
					canDelete
						? (d) => _handleDelete(d as unknown as AnnouncementDT)
						: undefined
				}
				onEdit={canEdit ? setEditorContent : undefined}
			/>

			{editorContent && (
				<AnnouncementEditor
					open={!!editorContent}
					data={editorContent as AnnouncementDT}
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
